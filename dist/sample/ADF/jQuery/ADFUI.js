/**
 * (C) Copyright IBM Corp. 2011-2012.  All Rights Reserved.
 * 
 * ADF v2.2.1
 */

if ($.jsDate) {
	try {
		document.getElementsByTagName('html')[0].lang = 'x-temLang';
		var t = temui.l10n;
		$.jsDate.regional['x-temLang'] = {
			monthNames: [t.january, t.february, t.march, t.april, t.may, t.june, t.july, t.august, t.september, t.october, t.november, t.december],
			monthNamesShort: t.monthNamesShort.split(" "),
			dayNames: [t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday],
			dayNamesShort: t.dayNamesShort.split(" "),
			dateFormat: '%Y-%m-%d %H:%M:%S'
		}
	} catch (e) {
		// TODO: would be nice if it was possible to use error popup here
		alert("Error localizing jqPlot, make sure resource.js is included.");
	}
}


try {
	tem;
} catch(e) {
	try {
		console.error("ADFUI.js must be loaded after AdfApi.js");
	} catch(e) {
		alert("ADFUI.js must be loaded after AdfApi.js");
	}
}

var temui = temui?temui:{};
temui.chart = {};
temui.grid = {};


$(function(){
	var $topNav = $("*[data-tem-role='topNav']").first().temTopNav();
	
	if($topNav.length == 0) {
		$("body").addClass("temui-body-no-header")
	}
	
	$("*[data-tem-role='header']").first().temHeader();
});



(function($) {

/** 
 * @namespace temui 
 * @name temui
 * 
 */

/** 
 * @namespace $.fn
 * @name $.fn
 * 
 * @description Custom jQuery plugins defined for application UI.
 * 
 */

	/**
	 * jQuery plugin that applies the application's top nav styles.  Typically this does not need to be
	 * explicitly called, it gets called automatically on the first element with a data-tem-role
	 * of "topNav".  It will also stylize any refresh button defined in the topNav. 
	 * 
	 * @function
	 * @name temTopNav
	 * @memberOf $.fn
	 * 
	 * @example
	 * $("*[data-tem-role='topNav']").first().temTopNav();
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div data-tem-role="topNav"&gt;
	 * 	&lt;button data-tem-role="refreshButton"&gt;&lt;/button&gt;
	 * 	&lt;button&gt;Custom Button&lt;/button&gt;
	 * &lt;/div&gt;
	 */
	$.fn.temTopNav = function() {
		this.addClass("temui-top-nav");

		var $refreshButton = this.find("*[data-tem-role='refreshButton']");
		
		$refreshButton.append('<img src="ADF/images/view-refresh.png"/>');
		$refreshButton.addClass("temui-refresh-button");
	
		/*
		var $printButton = this.find("*[data-tem-role='print-button']");
		$printButton.append('<img style="margin-top:-1px;" src="ADF/images/document-print.png"/>');
		$printButton.addClass("temui-print-button");
		*/
		
		this.after('<br clear="all"/>');

		return this;
	}



	/**
	 * jQuery plugin that applies the application's header style.  Typically this does not need to be
	 * explicitly called, it gets called automatically on the first element with a data-tem-role
	 * of "tem-header". It will also stylize any "last update" text defined in the header via 
	 * the lastUpdate data-tem-role.
	 * 
	 * @function
	 * @name temHeader
	 * @memberOf $.fn
	 * 
	 * @example
	 * $("*[data-tem-role='header']").first().temHeader();
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div data-tem-role="header"&gt;
	 * 	ADF 2.2- Sample Dashboard
	 * 	&lt;div id="lastUpdate" data-tem-role="lastUpdate"&gt;&lt;/div&gt;	
	 * &lt;/div&gt;
	 */
	$.fn.temHeader = function(){
		this.addClass("temui-header");
		
		$lastUpdate = this.find("*[data-tem-role='lastUpdate']")
			.addClass("temui-last-update");
		
		this.after($lastUpdate);	
	}



	/** 
	 * @class
	 * @memberOf temui
	 * @name chartContainer 
	 * 
	 * @description chartContainer is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).chartContainer()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).chartContainer()</code> function takes one argument, 
	 * an object literal with properties used in the creation of the chartContainer. 
	 * For the chartContainer, the properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">plot:</span> A jqPlot object that is a descendant of the container</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component:</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">header</span></li>
	 * </ul>
	 * 
	 * 
	 * @example
	 * var plot = temui.chart.barChart('chart', [chartSeries1, chartSeries2]);
	 * $("#testChartContainer").chartContainer({plot:plot});
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="testChartContainer"&gt;
	 *   &lt;h3 data-tem-role="header"&gt;Top 8 Patch Fixlets with Most Unpatched Endpoints&lt;/h3&gt;
	 *   &lt;div id="chart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * &lt;/div&gt;
	 * 
	 */ 
	$.widget("temui.chartContainer", {
		options: {
			plot: null
		},
		
		_create: function() {
			this.element.addClass('temui-dashboard-item');

			this.element.find("*[data-tem-role='header']")
				.addClass("ui-widget-header")
				.addClass("ui-corner-all")
				.addClass("temui-dashboard-item-header");
			
			this._initializeResizing();

		},

		_initializeResizing: function() {
			var lastWidth = 0;
			var lastHeight = 0;

			var self = this;

			var onResize = function (){
				if (lastWidth === self.element.width() && lastHeight === self.element.height()) {
					return;
				}
				lastWidth  = self.element.width();
				lastHeight = self.element.height();
	
				if (self.options.plot && self.element.width() > 0 && self.element.height() > 0) {
					$.each(self.options.plot.series, function(index, series){
						if(series.barWidth != undefined) {
							series.barWidth = undefined;
						}
					});
					self.options.plot.replot({resetAxes:true});
				}
			}

			var timer;
			$(window).on('resize.temui',(function () {
				   timer && clearTimeout(timer);
				   timer = setTimeout(onResize, 100);
	      		})
			);
		},

		/**
		 * Cleans up any modifications made to the DOM
		 * 
		 * @function
		 * @memberOf temui.chartContainer#
		 * @name destroy
		 */
		destroy: function() {
			
			$(window).off('resize.temui');
			
			this.element.removeClass('tem-dashboard-item');

			this.element.find("*[data-tem-role='header']")
				.removeClass("ui-widget-header")
				.removeClass("ui-corner-all")
				.removeClass("tem-dashboard-item-header");			
			
			return $.Widget.prototype.destroy.call(this);
		}
	});
  
  
	/** 
	 * @class
	 * @memberOf temui
	 * @name filterInput 
	 * 
	 * @description filterInput is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).filterInput()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).filterInput()</code> function takes one argument, 
	 * an object literal with properties used in the creation of the filterInput. 
	 * The properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">data</span>: A Slick.Data.DataView object</li>
	 * 	<li><span style="font-weight:bold">filterPrompt</span>: A String that will be used as the initial prompt text in the in text input <b>(optional)</b></li>
	 * 	<li><span style="font-weight:bold">filterFunction</span>: A Function with the following signature:
	 * <code>function testFilter(item, args)</code> Where item is a "row" object in the dataView and 
	 * args is an object literal that has a "searchString" property and can be overloaded to have additional
	 * properties.
	 * <p>The filter function would look something like this:</p>
	 * <pre>
	 * function testFilter(item, args) {
	 * 	var filterString = args.searchString;
	 * 	if(filterString == null || filterString == "") {
	 * 		return true;
	 * 	}
	 * 	return (item[GridFixlet.NAME].toLowerCase().indexOf(filterString.toLowerCase()) != -1); 
	 * }
	 * </pre>
	 * </li>
	 * </ul>
	 * 
	 */ 
	$.widget("temui.filterInput", {
		options: {
			data: null,
			filterPrompt: temui.l10n.filter,
			filterFunction:null
		},
		
		_create: function(){
			if(this.options.data == null) {
				tem.logging.error("No data specified for filterInput");
				return;
			} else if(this.options.data.setFilterArgs == null) {
				// TODO: add support for other types
				tem.logging.error("Filter only works for Slick.Data.DataView");
				return;
			}		

			this._initializeFilter();
		},
		
		_initializeFilter: function() {
			var timer;
			var self = this;			
			this.element.on('keyup.temui', function(e) {
					timer && clearTimeout(timer);
					timer = setTimeout(function(){
					self._applyFilter(e)
				}, 100);				
			});

			this._setFilterPrompt();
		},
		
		/** 		
		 * @event applied 
		 * @memberOf temui.filterInput
		 * @description To create a listener for this event, you need to follow the standard guidelines for listening to a 
		 * jquery widget event.
		 * @example 	
		 * $('#filterInput').bind('filterinputapplied', function(event, data){alert('filter applied!')});
		 */					
		_applyFilter: function(e){
			if (e.which == 27) {
				// esc
				this.element.val("");	
			}		
				
			var data = this.options.data;
			var filterFunction = this.options.filterFunction;
			var filterString = this.element.val();
			var args = {};
			args.searchString = filterString;
			args.filterFunction = filterFunction;
			data.setFilterArgs(args);
			data.setFilter(filterFunction);
			data.refresh();
			this._trigger("applied");
		},		
		
		
		_setFilterPrompt: function() {
			var prompt = this.options.filterPrompt;
			
			this.element.val(prompt);
			this.element.addClass("temui-filter-inactive");	

			this.element.on('focus.temui', function(){
				var $input = $(this)
					.removeClass("temui-filter-inactive")
					.addClass("temui-filter-active");
				if(prompt == $.trim($input.val())) {
					$input.val('');
				}
			});	


			this.element.on('blur.temui',function(){
				var $input = $(this);
				if($.trim($input.val()) == '') {
					$input.val(prompt);
					$input
						.removeClass("temui-filter-active")
						.addClass("temui-filter-inactive");
				} else {
					$input
						.removeClass("temui-filter-inactive")
						.addClass("temui-filter-active");
				}
			});	
		},
		
		
		_setOption: function(key, value) {
			if(key == "filterPrompt"){
				this.element.val(value);
			}
			
			$.Widget.prototype._setOption.apply(this, arguments);
    	},
		
		destroy: function() {
			this.element.removeClass('temui-filter-active temui-filter-inactive');
			this.element.off('focus.temui');
			this.element.off('blur.temui');
			this.element.off('keyup.temui');
			$.Widget.prototype.destroy.call(this);
		}

	});

	
	/**
	 * @class 
	 * 
	 * @description gridContainer is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).gridContainer()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).gridContainer()</code> function takes one argument, an object literal 
	 * with properties used in the creation of the gridContainer.  Its properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * <li><span style="font-weight:bold">grid:</span> a temui.grid.DataGrid object.</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component:</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">header</span></li>
	 * 	<li><span style="font-weight:bold">toolbar</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">buttonContainer</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">bulkButton</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">filterContainer</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">filter</span> (optional)</li>
	 * </ul>
	 * 
	 * @example
	 * var grid = new temui.grid.DataGrid("#sampleGrid", dataView, columns});	
	 * $('#dataGridContainer').gridContainer({grid:grid});									
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="dataGridContainer" style="padding:0px; margin-top:5px;" class=""&gt;
	 * 	&lt;h3 data-tem-role="header"&gt;&lt;?hxlat Fixlets?&gt;&lt;/h3&gt;
	 * 	&lt;div data-tem-role="toolbar"&gt;
	 * 		&lt;div data-tem-role="buttonContainer"&gt;
	 * 			&lt;button&gt;&lt;?hxlat Regular Button?&gt;&lt;/button&gt;
	 * 			&lt;button data-tem-role="bulkButton"&gt;&lt;?hxlat Bulk Button?&gt;&lt;/button&gt;
	 * 			&lt;button id="bulkButton" data-tem-role="bulkButton"&gt;
	 * 				&lt;span style="vertical-align: middle;"&gt;&lt;?hxlat Actions?&gt;&lt;/span&gt;
	 * 				&lt;span class="ui-icon ui-icon-triangle-1-s" style="display:inline-block; vertical-align: middle;"&gt;&lt;/span&gt;
	 * 			&lt;/button&gt;
	 * 		&lt;/div&gt;
	 * 		&lt;div data-tem-role="filterContainer"&gt;
	 * 			&lt;input data-tem-role="filter" type="text"/&gt;
	 * 		&lt;/div&gt;
	 * 		&lt;br clear="all"&gt;
	 * 	&lt;/div&gt;
	 * 	&lt;div id="sampleGrid" style="height:500px;"&gt;&lt;/div&gt;
	 * 	&lt;div id="pager"&gt;&lt;/div&gt;
	 * &lt;/div&gt;
	 * 
	 * @memberOf temui
	 * @name gridContainer
	 */	 
	$.widget("temui.gridContainer", {
		// TODO: assumption is that these options won't change after initial init
		// need to account for changes in _setOption
		options: {
			grid:null,
			filterOptions:null
		},
				
		_create: function() {
			if(this.options.grid == null) {	
				tem.logging.error("No datagrid specified for gridContainer");
				return;
			}
			
			this.element.addClass('temui-datagrid-container');
			
			this.element.find("*[data-tem-role='header']")
				.addClass("temui-datagrid-header")
				.addClass("ui-widget-header")
				.addClass("ui-corner-all");

			this.element.find("div[data-tem-role='toolbar']")
				.addClass("temui-toolbar");

			this._initializeButtons();
			this._initializeFilter();
		},

		_initializeButtons: function() {
			this.element.find("div[data-tem-role='buttonContainer']")	
				.addClass("temui-toolbar-button");

			this.element.find('button').button();
			var $bulkButtons = this.element.find("button[data-tem-role='bulkButton']")
			if($bulkButtons.length) {
				this._bulkButton($bulkButtons);
			}
		},

		_initializeFilter: function() {
			var $filterContainer = this.element.find("div[data-tem-role='filterContainer']")
			if(!$filterContainer.length) {
				return;
			}

 			this.element.find("div[data-tem-role='buttonContainer']")	
				.addClass("yui3-u");

			$filterContainer =this.element.find("div[data-tem-role='filterContainer']")
				.addClass("yui3-u")
				.addClass("temui-datagrid-filter-container");
				
			// TODO: externalize this				
			$filterContainer.parent()
				.css("position","relative")	
				
			if(this.options.grid 
					&& this.options.filterOptions 
					&& this.options.grid.getData() 
					&& this.options.filterOptions
					&& this.options.filterOptions.filterFunction) {		
				$filterContainer.find("input[data-tem-role='filter']")
					.filterInput({
							data:this.options.grid.getData(), 
							filterPrompt:this.options.filterOptions.filterPrompt, 
							filterFunction:this.options.filterOptions.filterFunction
						});
			} else {
				tem.logging.error("Filter requires that options for grid, filterPrompt and filterFunction are set.");
			}		
		},

		_bulkButton: function(buttons){
			var grid = this.options.grid;			
			buttons.button("option", "disabled", true);
			grid.onSelectedRowsChanged.subscribe(function() {
				if (grid.getSelectedRows().length == 0) {
					buttons.button( "option", "disabled", true );
				} else {
					buttons.button( "option", "disabled", false );
				}
			});
			
			return buttons;
		}
		
	});
  
  
	 
	/**
	 * @class
	 * 
	 * @description <span style="font-weight:bold;">dataGrid</span> is the standard UI data grid component. It
	 * extends the Slick.Grid component from the <a href="https://github.com/mleibman/SlickGrid">SlickGrid</a> 
	 * jQuery library.  Included with the ADF under libs is the version of the SlickGrid library used by the
	 * ADF along with its sample code. Please refer to its online/included documentation for details about the 
	 * Slick.Grid component on which dataGrid based.
	 * @augments Slick.Grid
	 * 
	 * @param {Slick.Data.DataView|Array} data 
	 * @param {Object[]} columns An array of object literals, that define the columns of the dataGrid.
	 * <code>var columns = [{id:"name", name:"Name", field:GridFixlet.LINK, sortable: true}]</code>
	 * 
	 * The "columns" object can have the following properties (refer to SlickGrid documentation for more details):
	 * <ul>
	 * <li>id</li>
	 * <li>name</li>
	 * <li>field</li>
	 * <li>toolTip</li>
	 * <li>width</li>
	 * <li>minWidth</li>
	 * <li>maxWidth</li>
	 * <li>cssClass</li>
	 * <li>focusable</li>
	 * <li>resizable</li>
	 * <li>sortable</li>
	 * <li>selectable</li>
	 * <li>formatter</li>
	 * <li>editor</li>
	 * <li>validator</li>
	 * <li>groupTotalsFormatter</li>
	 * <li>asyncPostRender</li>
	 * <li>rerenderOnResize</li>
	 * <li>cannotTriggerInsert</li>
	 * </ul>
	 *
	 * @param {Object} gridOptions Options used in configuration of the data grid (refer to SlickGrid documentation for more details):
	 * <ul>      
	 * <li>explicitInitialization: false</li>
	 * <li>rowHeight: 25</li>
	 * <li>defaultColumnWidth: 80</li>
	 * <li>enableAddRow: false</li>
	 * <li>leaveSpaceForNewRows: false</li>
	 * <li>editable: false</li>
	 * <li>autoEdit: true</li>
	 * <li>enableCellNavigation: true</li>
	 * <li>enableColumnReorder: true</li>
	 * <li>asyncEditorLoading: false</li>
	 * <li>asyncEditorLoadDelay: 100</li>
	 * <li>forceFitColumns: false</li>
	 * <li>enableAsyncPostRender: false</li>
	 * <li>asyncPostRenderDelay: 60</li>
	 * <li>autoHeight: false</li>
	 * <li>editorLock: Slick.GlobalEditorLock</li>
	 * <li>showHeaderRow: false</li>
	 * <li>headerRowHeight: 25</li>
	 * <li>showTopPanel: false</li>
	 * <li>topPanelHeight: 25</li>
	 * <li>formatterFactory: null</li>
	 * <li>editorFactory: null</li>
	 * <li>cellFlashingCssClass: "flashing"</li>
	 * <li>selectedCellCssClass: "selected"</li>
	 * <li>multiSelect: true</li>
	 * <li>enableTextSelectionOnCells: false</li>
	 * <li>dataItemColumnValueExtractor: null</li>
	 * <li>fullWidthRows: false</li>
	 * </ul>
	 * </li>
	 * @example
	 * var grid = new temui.grid.DataGrid("#sampleGrid", dataView, columns});	
	 * 
	 * @memberOf temui
	 * @name dataGrid
	 */	  
	temui.grid.DataGrid = function(gridElementId, data, columns, options) {
		try{
			Slick.Grid;
		} catch(e){
			tem.logging.error("temui.grid.DataGrid requires Slick.Grid libraries to be loaded");			
			throw new Error(temui.l10n.adfapi.errorInternal);
		}
		Slick.Grid.call(this, gridElementId, data, columns, options);
	  	this.$gridEl = $(gridElementId);
		this._init();	
	};

	function tmp() {}
	try {
		tmp.prototype = Slick.Grid.prototype;
	} catch(e) {}
	temui.grid.DataGrid.prototype = new tmp(); 
	 
	temui.grid.DataGrid.prototype._init = function(){
		var prevWidth  = this.$gridEl.width();
		var prevHeight = this.$gridEl.height();
				
		var self = this;
		
		this.autosizeColumns();
		this.render();	
		
		$(window).resize(function () {
			if (prevWidth === self.$gridEl.width() && prevHeight === self.$gridEl.height()) {
				return;
			}
			prevWidth  = self.$gridEl.width();
			prevHeight = self.$gridEl.height();
			self.$gridEl.trigger('resize');
		});
	
	  	$(this.$gridEl).resize(function () {
	    	self.resizeCanvas();
	    	self.autosizeColumns();
	  	});
		
	
		if(self.getData() && self.getData().onRowsChanged) {
			// make sure sorting changes show up
			self.getData().onRowsChanged.subscribe(function(e,args) {
				self.invalidateRows(args.rows);
				self.render();
			});	
			// make sure filter changes show up	
			this.getData().onRowCountChanged.subscribe(function(args) {
				self.updateRowCount();
				self.render();
			});		
		}
	}

    temui.grid.HTMLFormatter = function(row, cell, value, columnDef, dataContext) {
        return value;
    }


	if($ && $.jqplot && $.jqplot.config){
		$.jqplot.config.defaultColors= ["#E47801", "#A5BC4E", "#c5b47f", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", 
			"#d8b83f", "#ff5800", "#0085cc", "#c747a3", "#cddf54", "#FBD178", "#26B4E3", "#bd70c7"];	
	}
		
	/**
	 * @function
	 * @description Function used to create a horizontal bar chart. The ADF uses the 
	 * <a href="http://www.jqplot.com/">jgplot</a> jQuery library to generate its chart 
	 * components.  This function is a wrapper of the $.jqplot function. Included with the 
	 * ADF under libs is the version of the jqPlot library used by the ADF along with its 
	 * sample code. Please refer to its online/included documentation for details about the 
	 * $.jqplot function on which barChart() is based. 
	 * 
	 * @param {String} target Id of target element to render plot into
	 * @param {Array} Array of data series, the structure of these series depends on the type of plot
	 * @param {Object} options User defined options object. (refer to jqPlot documentation for more details)
	 * @returns {jqPlot}
	 * 
	 * @memberOf temui
	 * @name barChart
	 * 
	 * @example
	 * var chartSeries1 = [[27,1],[24,2],[20,3],[3,4],[28,5],[48,6],[11,7],[61,8]];
	 * var chartSeries2 = [[969,1],[964,2],[959,3],[955,4],[953,5],[952,6],[950,7],[939,8]];
	 * 
	 * barPlot = temui.chart.barChart('barChart', 
	 * 	[chartSeries2, chartSeries1],
	 * 	{	
	 * 		highlighter: {
	 * 			show: true,
	 * 			showTooltip: true,
	 * 			tooltipAxes: 'x',
	 * 			formatString:'&lt;table class="jqplot-highlighter"&gt;&lt;tr&gt;&lt;td&gt;&lt;?jxlat Endpoints:?&gt;&lt;/td&gt;&lt;td&gt;%s&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'
	 * 		},
	 * 		series: [{label:"&lt;?jxlat Unpatched?&gt;", color:"#cd1717"}, {label:"&lt;?jxlat Patched?&gt;", color:"#A5BC4E"}],				
	 * 			axes: {
	 * 				yaxis: {
	 * 					ticks: ticks
	 * 				},
	 * 				xaxis: {
	 * 					label:'&lt;?jxlat # of Patched/Unpatched Endpoints?&gt;'
	 * 				}
	 * 			},
	 * 			stackSeries: true,
	 * 			legend: {
	 * 				show: true,
	 * 				placement:"outside",
	 * 				location:"sw"
	 * 			}
	 * 		}
	 * 	);
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="barChart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * 
	 */
	temui.chart.barChart = function(target, data, options) {
		$("#" + target).empty();
	
		var mergedOptions = {};
		$.extend(true, mergedOptions, getBarChartDefaults(), options);
		var plot = $.jqplot(target, data, mergedOptions);
	
		return plot;
	}


	/**
	 * @function
	 * @description Function used to create a column chart. The ADF uses the 
	 * <a href="http://www.jqplot.com/">jgplot</a> jQuery library to generate its chart 
	 * components.  This function is a wrapper of the $.jqplot function. Included with the 
	 * ADF under libs is the version of the jqPlot library used by the ADF along with its 
	 * sample code. Please refer to its online/included documentation for details about the 
	 * $.jqplot function on which columnChart() is based. 
	 * 
	 * @param {String} target Id of target element to render plot into
	 * @param {Array} Array of data series, the structure of these series depends on the type of plot
	 * @param {Object} options User defined options object. (refer to jqPlot documentation for more details)
	 * @returns {jqPlot}
	 * 
	 * 
	 * @example
	 * var chartSeries1 = [[1,189029],[2,360279],[3,303117],[4,64213],[5,15229]];
	 * var chartSeries2 = [[1,183840],[2,380156],[3,301518],[4,62200],[5,17151]];
	 * 
	 * var ticks = ["Other","Important","Critical","Moderate","Low"];
	 * 
	 * colPlot1 = temui.chart.columnChart('columnChart', 
	 * 	[chartSeries1, chartSeries2], 
	 * 	{
	 * 		series: [{label:"<?jxlat Patched?>", color:"#A5BC4E"},{label:"<?jxlat Unpatched?>", color:"#cd1717"}],
	 * 		seriesDefaults: {
	 * 			rendererOptions: {highlightMouseOver: false}
	 * 		},
	 * 		axes:{
	 * 			xaxis: {
	 *				ticks: ticks,
	 *				renderer: $.jqplot.CategoryAxisRenderer
	 *			},
	 *			yaxis: {
	 *				label:'# of Patched/Unpatched Endpoints',
	 *				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
	 *			}
	 *		},
	 *		legend: {
	 *			show: true,
	 *			placement:"outsideGrid",
	 *			location:"s"
	 *		}
	 * });
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="columnChart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * 
	 * @memberOf temui 
	 * @name columnChart
	 */
	temui.chart.columnChart = function(target, data, options) {
		$("#" + target).empty();
		var mergedOptions = {};
		$.extend(true, mergedOptions, getColumnChartDefaults(), options);
		var plot = $.jqplot(target, data, mergedOptions);
	
		return plot;
	}
	
	
	/**
	 * @function
	 * @description Function used to create a pie chart. The ADF uses the 
	 * <a href="http://www.jqplot.com/">jgplot</a> jQuery library to generate its chart 
	 * components.  This function is a wrapper of the $.jqplot function. Included with the 
	 * ADF under libs is the version of the jqPlot library used by the ADF along with its 
	 * sample code. Please refer to its online/included documentation for details about the 
	 * $.jqplot function on which pieChart() is based. 
	 * 
	 * @param {String} target Id of target element to render plot into
	 * @param {Array} Array of data series, the structure of these series depends on the type of plot
	 * @param {Object} options User defined options object. (refer to jqPlot documentation for more details)
	 * @returns {jqPlot}
	 * 
	 * 
	 * @example
	 * var patchedComputers = 966909;
	 * var unpatchedComputers = 925551;
	 * var totalCriticalPatches = 1193;
	 * var totalPatches = 3717;
	 * 
	 * var data = [ ['Patched', patchedComputers],['Unpatched', unpatchedComputers] ];
	 * var labels = ['<?jxlat Patched:?> ' + patchedComputers, '<?jxlat Unpatched:?> ' + unpatchedComputers]
	 * 
	 * var options = {
	 * 	seriesColors: ["#A5BC4E", "#cd1717"],
	 * 	legend: {
	 * 		labels:labels,
	 * 		show:true
	 * 	}
	 * }
	 * piePlot = temui.chart.pieChart('pieChart', [data],options);
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="pieChart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * 
	 * @function
	 * @memberOf temui 
	 * @name pieChart
	 */
	temui.chart.pieChart = function(target, data, options) {
		$("#" + target).empty();
		var mergedOptions = {};
		$.extend(true, mergedOptions, getPieChartDefaults(), options);
		
		var plot = $.jqplot(target, data, mergedOptions);
	
		return plot;
	}

	function getPieChartDefaults(){
	    var pieChartOptions = {
			grid: {
				drawGridLines: false, 
				borderWidth: 0,
				shadow: false
			},
	        legend: {
	            placement: 'insideGrid',
	            location: 's',
	            show: true
	        },
	        seriesDefaults: {
	            renderer: $.jqplot.PieRenderer
	        }
	    };
	    
	    return $.extend(true, getChartDefaults(), pieChartOptions);
	}


	function getChartDefaults() {
		return {
			grid: {
				drawGridLines: true, 
				gridLineColor: '#eeeeee', 
				background: '#ffffff', 
				borderColor: '#CCCCCC',
				borderWidth: 0.5, 
				shadow: true, 
				shadowAngle: 45, //Clockwise from x axis.
				shadowOffset: 1.5,
				shadowWidth: 3, 
				shadowDepth: 3, 
				shadowAlpha: 0.03 
			},
			
			noDataIndicator: {
				show: true,
				indicator: "",
				
				axes: {
					xaxis: {
						min: 0,
						max: 5,
						tickInterval: 1,
						showTicks: false
					},
					yaxis: {
						min: 0,
						max: 8,
						tickInterval: 2,
						showTicks: false
					}
				}
			},
			legend: {
				show: true,
				placement:"outsideGrid",
				location:"ne"
			}
		}	
	}

	
	function getBarChartDefaults() {
		var barChartOptions = {
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer,
				rendererOptions: {
					barDirection: 'horizontal'
				}
			},
			axes: {
				yaxis: {
					renderer: $.jqplot.CategoryAxisRenderer
				}
			}
		};
		
		return $.extend(true, getChartDefaults(), barChartOptions);
	}


	function getColumnChartDefaults(options) {
	    var columnChartOptions = {
	        xaxis: {
	            renderer: $.jqplot.CategoryAxisRenderer
	        },
	        seriesDefaults: {
	            renderer: $.jqplot.BarRenderer
	        }
	    };
		
		return $.extend(true, getChartDefaults(), columnChartOptions);
	}

	/*********************************************
	 * Custom logging functions.
	 * 
	 */
	var GLOBAL_LOG = [];

	function getLogContents() {
		var logContents = [];
		
		for (var i=0; i<GLOBAL_LOG.length; i++) {
			var date = new Date(GLOBAL_LOG[i][0]);
			logContents.push(getDateString(date) + '[' + GLOBAL_LOG[i][2] + ']  ' +  GLOBAL_LOG[i][1]);
		};
	
		return  logContents.join('\n\r');
	}

	function getDateString(date) {
		var month = date.getMonth()+1;
		var dayOfMonth = padDate(date.getDate());
		var year = date.getFullYear();
		var hours = padDate(date.getHours());
		var minutes = padDate(date.getMinutes());
		var seconds = padDate(date.getSeconds());
		var milliseconds = padDate(date.getMilliseconds(), 3);
		var dateString = month + "/" + dayOfMonth + "/" + year;	
		var timeString = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
		return dateString + " " + timeString;
	}	
	
	
	function padDate(number, totalLength) {
		if(totalLength == null) {
			totalLength = 2;
		}
		var paddedString = "" + number;
		while(paddedString.length < totalLength) {
			paddedString = "0" + paddedString;
		}
		
		return paddedString;
	};


	function getLogTextAttributes(textAreaId) {
		return {id: textAreaId, value: getLogContents(),  rows: '30',  style: {width: '100%', fontSize: '11px'}};
	}
	
	function logJSTarget(message, logLevel) {
		// only log debug statements if level is set to debug
		if(logLevel < tem.config.logLevel) {
			return;
		}	
	
		try {
			if(GLOBAL_LOG.length > 1500) {
				GLOBAL_LOG = GLOBAL_LOG.slice(-1000);
			}
		
			var levelDisplayName;		
			switch(logLevel) {
				case tem.config.DEBUG:
					levelDisplayName = "DEBUG";
				break;
				default:
					levelDisplayName = "ERROR";
			}
		
			GLOBAL_LOG.push([new Date().getTime(), message, levelDisplayName]);
		} catch(e) {
			// TODO: what should be the fallback here?
			// fail silently...
		}
	}

	var $dialog;
	var $logText;

	function onLogSettingsChange(event) {
		var id = $dialog.find("input[@name=logLevel]:checked").attr('id');
		if(id=="debugLevel") {
			tem.config.logLevel = tem.config.DEBUG;
		} else {
			tem.config.logLevel = tem.config.ERROR;
		}
		
		tem.dataStore.storeVariable(tem.config.loggingLevelPreference, tem.config.logLevel, true);
	}
	
	
	/**
	 * Utility function to trigger log popup dialog.
	 */
	temui.showLogDialog = function() {
		if($dialog == null) {
			$logText = $('<textarea></textarea>');
			
			var $refreshButton = $("<button>" + temui.l10n.refresh + "</button>")
				.click(function(){
					$logText.text(getLogContents());	
				});

			$dialog = $('<div></div>')
				.append('<div><span>' + temui.l10n.logLevel + '</span>'
					+ '<input id="debugLevel" type="radio" name="logLevel"></input><label for="debugLevel">Debug</label>' 
					+ '<input id="errorLevel" type="radio" name="logLevel"></input><label for="errorLevel">Error</label></div>')
				.append($logText)
				.append($refreshButton);
			$dialog.dialog({
				title: temui.l10n.logTitle, 
				height: 400,
				width: 500
			});	

			// TODO: calculate these based on padding, margins rather than hard coded
			$logText.height($dialog.height() - 50);
			$logText.width($dialog.width() - 20);	

			// TODO: debounce this
			$dialog.bind("dialogresize", function(event, ui) {
				$logText.height($dialog.height() - 50);
				$logText.width($dialog.width() - 20);
			});
			$dialog.find('input[name=logLevel]')
				.change(onLogSettingsChange)
				.attr("checked", function(i,val) {
					if(this.id == "debugLevel" && tem.config.logLevel == tem.config.DEBUG){
						return "checked"
					}
					if(this.id == "errorLevel" && tem.config.logLevel == tem.config.ERROR){
						return "checked"
					}
				
					return;
				});
		} else {
			$dialog.dialog("open")
		}	
		
		$logText.text(getLogContents());	
	}	

	// add ctrl-shft-d listener
	$(document).keyup(function(e) {		
		if (e.keyCode == 68 && e.ctrlKey && e.shiftKey) {
			temui.showLogDialog();
		}
	});
		
	var $errorLog;
	/**
	 * Utility function to trigger error dialog. This is the default error handler, set up automatically
	 * as window.onerror handler on application startup.
	 * 
	 * @param {String} message
	 * @param {String} uri
	 * @param {String} line
	 * 
	 */	
	temui.showErrorDialog = function(message, uri, line) {
		$errorLog = $('<textarea style="height:150px;">' + getLogContents() + '</textarea>');

		var $errorLink = $('<a href="">'+ temui.l10n.showLogContents + '</a>')
			.click(function(){
				$errorLink.hide();
				$errorHideLink.show();
				$errorPopUp.append($errorLog);
				return false;
			});
			
		var $errorHideLink = $('<a style="display:none;" href="">'+ temui.l10n.hideLogContents + '</a>')
			.click(function(){
				$errorLink.show();
				$errorHideLink.hide();
				$errorLog.remove();
				return false;
			});				
			
		var $errorDiv = $('<div></div>');
		
		var $errorMessage = $("<p></p>")
			.css("word-wrap", "break-word")
			.html(tem.l10n.format(temui.l10n.errorMessage, 
				'"' + message.replace(/"/gi, '%22').replace("<", "&lt;").replace(">", "&gt;") + '<br/><br/>"', 
				'"' + uri + '<br/>"', 
				'"' + line + '"'));
		
		$errorDiv.append('<img src="ADF/images/i_message_critical.png" style="float:left; margin:5px;"/>')
			.append($errorMessage)
			.append($errorLink)
			.append($errorHideLink)

		var $errorPopUp = $errorDiv.dialog({
		 	title:temui.l10n.errorTitle,
			width:400
			});	
			
		//$errorLog.height($errorPopUp.height() - ($errorMessage.height() + 40));
		$errorLog.width($errorDiv.width() - 10);	

		// TODO: debounce this
		$errorPopUp.bind("dialogresize", function(event, ui) {
			$errorLog.height($errorDiv.height() - ($errorMessage.height()+ 40));
			$errorLog.width($errorDiv.width() - 10);
		});					
	}

   $(function() {
		tem.logging.debug = function(message) {
			logJSTarget(message, tem.config.DEBUG);
			if (typeof console !== "undefined" && console.debug) {
				console.debug(message);
			}
		};
		tem.logging.error = function(message) {
			logJSTarget(message, tem.config.ERROR); 
			if (typeof console !== "undefined" && console.error) {
				console.error(message);
			}
		};

		var oldOnError = window.onerror;

		window.onerror = function(message, uri, line) {
			if(oldOnError) {
				oldOnError(message, uri, line);
			}
			temui.showErrorDialog(message, uri, line);			
		}

	});	

}(jQuery));
