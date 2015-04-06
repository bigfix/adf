/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 */

var colPlot2;
var colPlot1;
var barPlot;
var piePlot;
var dataView;
var relData;
var data;
var grid;
var validator;


require([
    "jquery",
    "adf",
    "adf-ui",
    "slick.grid",
    "slick.dataview",
    "slick.checkboxselectcolumn",
    "slick.rowselectionmodel",
    "slick.pager",
    "slick.columnpicker",
    'css!style/sample.css',
    'domReady!'
], function(){

	$('#pageContent').fadeIn();

	$("#information").hide().message({type:'information'});

	$('#warningDialog').popupMessage({
		type:'warning',
		autoOpen: false,
		buttons: {
			Proceed: function() {
				alert('Proceed button clicked');
			},
			Cancel: function() {
				$(this).popupMessage("close");
			}
		}
	});

	dataView = new Slick.Data.DataView();
	loadData();
	
	$("#tabs-1 button").button();

	$("#expandablePanel").click(function() {
		$("#expandableContent").toggle('blind', {}, 500);
		$("#expandablePanel .ui-icon").toggle();
	});

	$("*[data-tem-role='refreshButton']").click(function() {
		loadData();
	});

	$("#createAction").click(function() {
		createAction();
	});
	
	$("#createActionNoUI").click(function() {
		createActionNoUI();
	});
	
	$("#createActionNoDoc").click(function() {
		createActionNoDoc();
	});

	$("#openComputerGroup").click(function() {
		openComputers();
	});

	var generalInfo = [
		["<?jxlat Version?>", tem.context.getVersion()],
		["<?jxlat Running in Console?>", tem.context.isInConsole()],
		["<?jxlat User Locale?>", tem.context.getUserLocale()],
		["<?jxlat Preferred Language?>", tem.context.getPreferredLanguage()],
		["<?jxlat Server URL?>", tem.context.getServerURL()],
		["<?jxlat Base Directory?>", tem.context.getBaseDirectory()],
		["<?jxlat Window Height?>", tem.context.getWindowHeight()]
	];

	if (tem.context.isInConsole()) {
		generalInfo = generalInfo.concat([
			["<?jxlat Current DSN?>", tem.context.getCurrentDSN()],
			["<?jxlat Current User?>", tem.context.getCurrentUser()]
		]);
	}

	$.each(generalInfo, function(key, value) {
		$("#contextInfo").append("<li>" + value[0] + ": "+ value[1] + "</li>");
	})

	$("<li></li>").append(tem.l10n.format('<?rxlat The time {0} is: {1} ?>', '"now"', 'now')).appendTo("#localizationExample");

	// was hiding components until they were styled properly
	// need to do before tabs() or charts won't retain width set via css in html		
	$("*[data-tem-role='topNav'],*[data-tem-role='header'],#tabs").css("display", "block");
	// force "reflow" of dom here
	document.body.clientHeight;
			
	$("#tabs").tabs();


	$('#validationSubmit').button();
	validator = $('#validationForm').temValidate();

});

function showValidationErrors() {
	if(validator.form()){
		$.temui.popupMessage.createPopup('<?jxlat All form inputs are valid.?>', 'success');
	}else{
		var detailedMessage = "<strong>Error Messages: </strong><br/><ul>";
		for(var name in validator.invalid) {
		  detailedMessage += "<li><strong>"+name+"</strong>: "+ validator.invalid[name] + "</li>";
		}
		detailedMessage += "</ul>";
		$.temui.popupMessage.createPopup('<?jxlat Some form inputs are invalid.?>', 'error', detailedMessage);
	}
}

function resetForm(){
	validator.resetForm();
}

function getTestAction(){
	var testAction = new tem.model.SingleAction("<?jxlat Test Action?>", "test relevance", "// do nothing");
	var testActionSettings = new tem.model.ActionSettings();
	testActionSettings.HasMessage = true;
	testActionSettings.ActionUITitle = "actionUI";
	testAction.Settings = testActionSettings;
	return testAction;
}

function createAction(){
	tem.content.createContent(getTestAction(), false, false);
}

function createActionNoUI(){
	tem.content.createContent(getTestAction(), true, false);
}
	
function createActionNoDoc(){
	tem.content.createContent(getTestAction(), false, true);
}

function createAnalysis(){
	var testAnalysis = new tem.model.Analysis();
	testAnalysis.Title = "<?jxlat Test Analysis?>";
	testAnalysis.Description = "<?jxlat Test Description?>";
	testAnalysis.Relevance = "Test Relevance";
	
	var prop = new tem.model.AnalysisProperty(3,"rrr", "now");
	prop.EvaluationPeriod = "PT0S"
	testAnalysis.Property = prop;
	
	tem.content.createContent(testAnalysis, false, false);				
}	
		
function openComputers(){
	tem.evalRel('ids of bes computers', {
		success: openComputersCallback
	});
}

function openComputersCallback(computerIds) {	
	tem.content.openComputerGroup(computerIds, "<?jxlat Sample Ad Hoc Computer Group?>");
}

function showWarningPopup(){
	$('#warningDialog').popupMessage('open');
}

function showInformationPopup(){
	var popup = $.temui.popupMessage.createPopup('Sample information message to users', 'success');
}

function showInformationMessage() {
	$("#information").show();
}


function loadData() {
	temui.showPageLoading();

	var rel = '(name of it' 
		+ ', id of it as string'
		+ ', (if (exists category of it) then (if (category of it as lowercase contains "<unspecified>") then (category of it as string) else ("Unspecified") ) else ("Unknown")) '
		+ ', (if (exists source severity of it) then  (if (source severity of it as lowercase contains "<unspecified>" or source severity of it as lowercase contains "<n/a>") then ("Unspecified") else (source severity of it) ) else ("Unspecified")) '
		+ ', (if (exists source release date of it) then ((year of it as string & "/" & month of it as two digits & "/" & day_of_month of it as two digits & " (" & day_of_week of it as three letters & ")") of source release date of it) else ("--")) '
		+ ', (link href of it) '
		+ ', (concatenation of (id of it as string) & name of site of it) '
		+ ') of bes fixlets';


	var relData = new tem.relevance.RelevanceData();
	relData.onChange = onLoad;
	relData.load(rel);

	return false;
}

function onLoad(results){
	$("#lastUpdate").html("" + new Date());
	
	// Can't directly use RelevanceResult custom JS type
	// returned by relevance call, as SlickGrid expects 
	// to be able to call concat on it, need to copy into 
	// regular JS array.
	data = [];

	var dataArr = results.currData.toArray();
	for (var i = 0; i < dataArr.length; i++) {
		var item = {};
		for (var j = 0; j < dataArr[i].length; j++) {
			item[j] = dataArr[i][j];
		}
		item[GridFixlet.COMPLIANCE] = Math.floor(Math.random() * (101));
		data.push(item);
	}
	
	$('#tabs').bind('tabsshow', function(event, ui) {
		if (ui.tab.id === "chartTab") {
			if(colPlot1 == null){
				createBarChart();					
				createPieChart();
				createColumnCharts();
			} else {
				piePlot.replot();
				barPlot.replot();
				colPlot1.replot();
				colPlot2.replot();
			}

			// Need to raise links up so that they are clickable
			$('.chartLinks').parent().css("z-index", 1);
			$('.chartLinks').parent().parent().css("z-index", 1);
		} else if(ui.tab.id === "dataGridTab") {
			if(grid == null) {
				createDataGrid();
			}
			grid.resizeCanvas();
			grid.autosizeColumns();
		}
	 });
	
	dataView.beginUpdate();
	
	// second arg is index for unique identifier, in this case fixlet id w/ site name
	dataView.setItems(data, GridFixlet.UNIQUE_ID);
	
	dataView.endUpdate();				
	temui.hidePageLoading();
}


var GridFixlet = {};

GridFixlet.NAME = 0;
GridFixlet.ID = 1;
GridFixlet.CATEGORY = 2;
GridFixlet.SOURCE_SEVERITY = 3;
GridFixlet.SOURCE_RELEASE_DATE = 4;
GridFixlet.LINK = 5;
GridFixlet.UNIQUE_ID = 6;
GridFixlet.COMPLIANCE = 7;

var exportColumns = [
	{id:"name", name:"<?jxlat Name?>", field:GridFixlet.NAME, sortable: true},
	{id:"sourceSeverity", name:"<?jxlat Source Severity?>", field:GridFixlet.SOURCE_SEVERITY, sortable: true},
	{id:"sourceReleaseDate", name:"<?jxlat Source Release Date?>", field:GridFixlet.SOURCE_RELEASE_DATE, sortable: true},
	{id:"category", name:"<?jxlat Category?>", field:GridFixlet.CATEGORY, sortable: true},
	{id:"percentCompliant", name:"<?jxlat % Compliance?>", field:GridFixlet.COMPLIANCE, sortable: true, formatter: percentageTextFormatter}
];

function createDataGrid() {
		
	var columns = [
		{id:"name", name:"<?jxlat Name?>", field:GridFixlet.NAME, sortable: true, formatter:fixletNameFormatter},
		{id:"sourceSeverity", name:"<?jxlat Source Severity?>", field:GridFixlet.SOURCE_SEVERITY, sortable: true},
		{id:"sourceReleaseDate", name:"<?jxlat Source Release Date?>", field:GridFixlet.SOURCE_RELEASE_DATE, sortable: true},
		{id:"category", name:"<?jxlat Category?>", field:GridFixlet.CATEGORY, sortable: true},
		{id:"percentCompliant", name:"<?jxlat % Compliance?>", field:GridFixlet.COMPLIANCE, sortable: true, formatter: percentageBarFormatter}
	];

	var checkboxSelector = new Slick.CheckboxSelectColumn({
		cssClass: "slick-cell-checkboxsel"
	});
	columns.unshift(checkboxSelector.getColumnDefinition())


	grid = new temui.grid.DataGrid("#sampleGrid", dataView, columns, {enableCellNavigation: false});		
	grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:false}));
	grid.registerPlugin(checkboxSelector);
	dataView.syncGridSelection(grid, true);

	grid.onSort.subscribe(function(e, args){
		var sortCol = args.sortCol;
		var sortAsc = args.sortAsc;

		if($.inArray(sortCol.field, [GridFixlet.COMPLIANCE]) != -1) {
			dataView.sort(function(a,b){return a[sortCol.field]-b[sortCol.field];},sortAsc);
		} else {
			
			try {
				dataView.fastSort(sortCol.field, sortAsc);
			} catch(e) {
				throw new Error("<?jxlat Error performing grid sort.?> " + e.message);
			}
		}
	});
	
	$('#dataGridContainer').gridContainer({
		grid:grid,
		filterOptions:{
			filterFunction:testFilter
		}
	});

	var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
	var columnpicker = new Slick.Controls.ColumnPicker(columns, grid);
	createMenuButton();
}

function createMenuButton() {
	$("#menuButton").click(function(e) {
		var $actionLink1 = $('<div id="action1" class="ui-widget-content" style="padding:5px;"><?hxlat Action 1?></div>');
		var $actionLink2 = $('<div class="ui-widget-content" style="padding:5px;"><?hxlat Action 2?></div>');

		$.each([$actionLink1, $actionLink2], function(key, value) {
			value.hover(

			function() {
				$(this).addClass("ui-state-hover");
			}, function() {
				$(this).removeClass("ui-state-hover");
			});

			value.mouseup(

			function() {
				$(this).parent().hide();
			});
		});

		$actionLink1.click(function(e) {
			alert("action 1");
		});

		$actionLink2.click(function(e) {
			alert("action2");
		});

		var $menu = $('<div style="display:block; position:absolute; z-index:30;"></div>').append($actionLink1).append($actionLink2);
		$(document.body).append($menu);

		$menu.position({
			my: "left top",
			at: "left bottom",
			of: this
		});


		$(document.body).on('click.sample', function() {
			$menu.remove();
			$(document.body).off('click.sample');
		});

		// dont trigger a document.body click event
		e.stopPropagation();
	});

}

function createBarChart(fixletInfo) {
	var ticks = [];

	for(var i=0;i<7;i++) {
		var $link = $('<a/>').attr('href', data[i][GridFixlet.LINK]);
		
		var name = data[i][GridFixlet.NAME];
		name = name == null?"":name;
		name = name.length > 50? name.substring(0,50) + "...":name;
		
		$link.html(name);
		$link.addClass("chartLinks");

		// add "outerHTML" of link		
		ticks.push($link.wrap('<div></div>').parent().html());
	}

	var chartSeries1 = [
		[27,1],
		[24,2],
		[20,3],
		[3,4],
		[28,5],
		[48,6],
		[11,7],
		[61,8]
	];

	var chartSeries2 = [
		[969,1],
		[964,2],
		[959,3],
		[955,4],
		[953,5],
		[952,6],
		[950,7],
		[939,8]
	];

	barPlot = temui.chart.barChart('barChart', 
		[chartSeries2, chartSeries1],
		{	
			highlighter: {
				show: true,
				showTooltip: true,
				tooltipAxes: 'x',
				formatString:'<?jxlat Endpoints:?> %s'
			},
			series: [{label:"<?jxlat Unpatched?>", color:"#cd1717"}, {label:"<?jxlat Patched?>", color:"#A5BC4E"}],				
			axes: {
				yaxis: {
					ticks: ticks
				},
				xaxis: {
					label:'<?jxlat # of Patched/Unpatched Endpoints?>'
				}
			},
			stackSeries: true,
			legend: {
				show: true,
				placement:"outside",
				location:"sw"
			}
		}
	);

	$("#barChartContainer").chartContainer({plot:barPlot});

	$('#barChart').bind('jqplotDataClick', 
		function (ev, seriesIndex, pointIndex, data) {
			alert('<?jxlat Series Index:?> ' + seriesIndex + "\r<?jxlat Point Index:?> " + pointIndex + "\r<?jxlat Data:?> " + data);
		}
	);
}	



function createPieChart(fixletInfo) {
	var patchedComputers = 966909;
	var unpatchedComputers = 925551;
	var totalCriticalPatches = 1193;
	var totalPatches = 3717;
	
	var data = [ ['Patched', patchedComputers],['Unpatched', unpatchedComputers] ];
	var labels = ['<?jxlat Patched:?> ' + patchedComputers, '<?jxlat Unpatched:?> ' + unpatchedComputers]
	
	$("#totalPatched").html(totalPatches);
	$("#totalCriticalPatches").html(totalCriticalPatches);

	var options = {
		seriesColors: ["#A5BC4E", "#cd1717"],
		seriesDefaults: {
			rendererOptions: {highlightMouseOver: false}
		},					 
		legend: {
			labels:labels,
			 show:true
		}
	}

	piePlot = temui.chart.pieChart('pieChart', [data],options);
	$("#pieChartContainer").chartContainer({plot:piePlot});
}	

function showToolTip(current, series, index, plot) {
	var kv = plot.data[series][index];
	return 'Unpatched: <a onclick="openChartComputers(' + "'" + kv[2] + "'" + ');">' + kv[1] + '</a>';
};

function openChartComputers(chartItem){
	alert('this is dummy data, you could opt to open computers here using tem.content.openComputerGroup(): ' + chartItem);
};

function createColumnCharts(field) {
	var chartSeries1 = [
			[1,189029],
			[2,360279],
			[3,303117],
			[4,64213],
			[5,15229]
		];

	var chartSeries2 = [
			[1,183840, "item1"],
			[2,380156, "item2"],
			[3,301518, "item3"],
			[4,62200, "item4"],
			[5,17151, "item5"]
		];

	var ticks = ["Other",
		"Important",
		"Critical",
		"Moderate",
		"Low"];

		
	colPlot1 = temui.chart.columnChart('columnChart1', [chartSeries1, chartSeries2], {
		series: [{label:"<?jxlat Patched?>", color:"#A5BC4E"},{label:"<?jxlat Unpatched?>", color:"#cd1717"}],
		highlighter: {
			tooltipLocation :'n',
			tooltipFadeSpeed:"slow",
			tooltipOffset :-8,
			show: true,
			tooltipContentEditor: showToolTip,
			showTooltip: true,
			tooltipAxes: 'x'
		},					
		axes:{
			xaxis: {
				ticks: ticks,
				renderer: $.jqplot.CategoryAxisRenderer

			},
			yaxis: {
				label:'# of Patched/Unpatched Endpoints',
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
			}
		},
		legend: {
			show: true,
			placement:"outsideGrid",
			location:"s"
		}}				
	);

	chartSeries1 = [
			[1,31394],
			[2,10054],
			[3,18549]
		];

	chartSeries2 = [
			[1,30385],
			[2,8307],
			[3,21041]
		];

	ticks = [
			"5/08/2012-6/11/2012",
			"3/13/2012-4/09/2012",
			"4/10/2012-5/07/2012"
		];
	
	colPlot2 = temui.chart.columnChart('columnChart2', [chartSeries1, chartSeries2], {
		series: [{label:"<?jxlat Patched?>", color:"#A5BC4E"},{label:"<?jxlat Unpatched?>", color:"#cd1717"}],
		seriesDefaults: {
			rendererOptions: {highlightMouseOver: false}
		},
		legend: {
			show: true,
			placement:"outsideGrid",
			location:"s"
		},
		axes:{
			xaxis: {
				ticks: ticks,
				renderer: $.jqplot.CategoryAxisRenderer

			},
			yaxis: {
				label:'<?jxlat # of Patched/Unpatched Endpoints?>',
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
			}
		}}				
		
	);

	$("#columnChartContainer1").chartContainer({plot:colPlot1});
	$("#columnChartContainer2").chartContainer({plot:colPlot2});	
}


function testFilter(item, args) {
	var filterString = args.searchString;
	
	if(filterString == null || filterString == "") {
		return true;
	}
	
	return (item[GridFixlet.NAME].toLowerCase().indexOf(filterString.toLowerCase()) != -1);

}

function fixletNameFormatter (row, cell, value, columnDef, dataContext) {
	return '<a href="' + dataContext[GridFixlet.LINK] + '">' + value + '</a>';
}

function percentageTextFormatter (row, cell, value, columnDef, dataContext){
	if (value == null || value === "") {
		return "";
	}
	return value + "%";
}

function percentageBarFormatter (row, cell, value, columnDef, dataContext){
	if (value == null || value === "") {
		return "";
	}
	var color;
	if (value >= 90) {
		color = "#33cc14";
	} else if (value >= 70) {
		color = "#ffff1a";
	} else if (value >= 20){
		color = "#ffb31a";
	} else {
		color = "#e51717"
	} 

	var valuePercentage = dataContext[GridFixlet.COMPLIANCE] + "%";
	
	if(valuePercentage.length == 2){
		valuePercentage = "&nbsp;&nbsp;&nbsp;" + valuePercentage;
	}	
	if(valuePercentage.length == 3){
		valuePercentage = "&nbsp;" + valuePercentage;
	}	

	return '<table><tr>'
			+ '<td>' + valuePercentage + '</td>'
			+ '<td style="width:100%"><div style="display: inline-block;height: 6px;width:' + value + '%;background-color:' + color + ';"></div></td>'
			+ '</tr></table>';
}