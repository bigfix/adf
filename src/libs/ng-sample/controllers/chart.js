/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Sample controller for chart tab
 */
define(['angular', '../module'], function(angular, module){
	
	module.controller("ChartController", ["$scope", function ($scope) {

		$scope.initCharts = function(){
			
			// sample tooltip functions
			$scope.showToolTip = function(current, series, index, plot) {
				var kv = plot.data[series][index];
				var tooltip = l10n.unpatched + ': <a onclick="openChartComputers(' + "'" + kv[2] + "'" + ')">' + kv[1] + '</a>';
				return tooltip;
			};
			
			window.openChartComputers = function(chartItem){
				alert('this is dummy data, you could opt to open computers here using tem.content.openComputerGroup(): ' + chartItem);
			};


			// sample data for the top bar chart
			$scope.barCharData = [$scope.chartSeries2, $scope.chartSeries1];
			
			$scope.barCharOptions = {
				highlighter: {
					show: true,
					showTooltip: true,
					tooltipAxes: 'x',
					formatString: l10n.barChartFormatString
				},
				series: [{label: l10n.unpatched, color:"#cd1717"}, {label: l10n.patched, color:"#A5BC4E"}],
				axes: {
					xaxis: {
						label: l10n.barChartXAxisLabel
					},
					yaxis: {
						ticks: $scope.ticks
					}
				},
				stackSeries: true,
				legend: {
					show: true,
					placement:"outside",
					location:"sw"
				}
			};

			// sample event handlers on the bar chart
			$scope.onBarCharDataClicked = function(seriesIndex, pointIndex, data){
				alert('seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);
				// scope data can also be modified here
				// $scope.barCharData[seriesIndex][pointIndex][0] += 50;
			};

			$scope.onBarChartHighlight = function(seriesIndex, pointIndex, data){
				// triggered when a plot bar is mouseovered
			};

			$scope.onBarChartUnhighlight = function(){
				// triggered when mouseout
			};


			// sample data for the column chart
			$scope.columnCharSeries1 = [
				[1,189029],
				[2,360279],
				[3,303117],
				[4,64213],
				[5,15229]
			];

			$scope.columnCharSeries2 = [
				[1,183840, "item1"],
				[2,380156, "item2"],
				[3,301518, "item3"],
				[4,62200, "item4"],
				[5,17151, "item5"]
			];

			$scope.columnCharTicks = [
				"Other",
				"Important",
				"Critical",
				"Moderate",
				"Low"
			];

			$scope.columnChartData = [$scope.columnCharSeries1, $scope.columnCharSeries2];

			$scope.columnChartOptions = {
				highlighter: {
					tooltipLocation :'n',
					tooltipFadeSpeed:"slow",
					tooltipOffset :-8,
					show: true,
					tooltipContentEditor: $scope.showToolTip,
					showTooltip: true,
					tooltipAxes: 'x'
				},
				series: [{label: l10n.patched, color:"#A5BC4E"},{label: l10n.unpatched, color:"#cd1717"}],
				axes:{
					xaxis: {
						ticks: $scope.columnCharTicks,
						renderer: $.jqplot.CategoryAxisRenderer

					},
					yaxis: {
						label: l10n.barChartXAxisLabel,
						labelRenderer: $.jqplot.CanvasAxisLabelRenderer
					}
				},
				legend: {
					show: true,
					placement:"outsideGrid",
					location:"s"
				}
			};


			// sample data for the pie chart
			$scope.pieChartData = [[[l10n.patched, 966909], [l10n.unpatched, 725551]]];

			$scope.pieChartOptions = {
				seriesColors: ["#A5BC4E", "#cd1717"],
				seriesDefaults: {
					rendererOptions: {highlightMouseOver: false}
				},					 
				legend: {
					labels: [l10n.patched + ': 966909', l10n.unpatched + ': 725551'],
					show:true
				}
			};

		};

		$scope.initCharts();

	}]);

});