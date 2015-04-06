/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Angular directive for ADF UI chart components
 * 
 */
define(['angular', 'jquery', 'text!./chart-container.html','../adf-ng-module', 'adf-ui', '../services/adf'], function(angular, $, chartContainerTemplate){

    angular.module('adf-ng')

/**
 * @ngdoc directive
 * @name adf-ng.directive:adfChartContainer
 * @restrict A
 *
 * @description
 * Chart container contains a chart item. It adds chart title and resizes its chart component when needed.
 *
 * @param {String} header Chart header
 * @param {Function=} resizeFn Returns a function that can be called to force chart resize
 *
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="ChartController">
        <div adf-chart-container header="Chart Title">
            <div adf-bar-chart 
                chart-data="barCharData" 
                chart-options="barCharOptions"
                chart-click="onBarCharDataClicked(seriesIndex, pointIndex, data)"
                style="height: 250px; width: 100%"
            />
        </div>
    </div>
  </file>
  <file name="script.js">
  function ChartController($scope) {
    var chartSeries1 = [[923,1], [910,2], [969,3], [964,4], [959,5]];
    var chartSeries2 = [[37,1], [50,2], [27,3], [24,4], [20,5]];
    var ticks = ["Other", "Important", "Critical", "Moderate", "Low"];
    $scope.barCharData = [chartSeries1, chartSeries2];
    
    $scope.barCharOptions = {
        highlighter: {
            show: true,
            showTooltip: true,
            tooltipAxes: 'x',
            formatString:'Endpoints: %s'
        },
        series: [{label:"Unpatched", color:"#cd1717"}, {label:"Patched", color:"#A5BC4E"}],
        axes: {
            yaxis: {
                ticks: ticks
            },
            xaxis: {
                label:'# of Patched/Unpatched Endpoints'
            }
        },
        stackSeries: true,
        legend: {
            show: true,
            placement:"inside",
            location:"se"
        }
    };

    $scope.onBarCharDataClicked = function(seriesIndex, pointIndex, data){
        alert('seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);
    };
  }
  </file>
</example>
 */
    .directive('adfChartContainer', ['adf', function(adfapi){
        return {
            template: chartContainerTemplate,
            transclude: true,
            scope: {
                header: '@',
                resizeFn: '='
            },
            controller: function($scope) {
                this.setChart = function(chart){
                    $scope.chart = chart;
                };
            },
            link: function ($scope, elem, attrs) {
                if (attrs.resizeFn){
                    $scope.resizeFn = function(){
                        if ($scope.container)
                            $scope.container.resize();
                    };
                }

                $scope.$watch("chart.plot", function(newValue, oldValue, srcScope){
                    if ($scope.chart){
                        $scope.container = $(elem).chartContainer({plot:$scope.chart.plot});
                    }
                });

                $scope.$on('adfTabSelected', function(event, tabId){
                    if ($scope.container)
                        $scope.container.resize();
                });
            }
        };
    }]);

    var chartScopeDef = 
    {
        chartData: "=",
        chartOptions: '=',
        chartClick: "&",
        chartHighlight: "&",
        chartUnhighlight: "&",
        chartRightClick: "&"
    };

    var chartLinkFun = function ($scope, elem, attrs, chartContainer, adfapi, $timeout, chartConstructor) {

        if (!elem.attr('id'))
            elem.attr('id', adfapi.javascriptUtils.uniqueID());

        function initChart(){
            $scope.plot = chartConstructor(elem.attr('id'), $scope.chartData, $scope.chartOptions);

            // Need to raise links up so that they are clickable
            elem.find('.jqplot-xaxis-tick').parent().css("z-index", 1);
            elem.find('.jqplot-yaxis-tick').parent().css("z-index", 1);

            $scope.dirty = true;

            if (chartContainer) {
                chartContainer.setChart($scope);
            }
        }

        $scope.$watch('chartData', function(newValue, oldValue, srcScope) {
            initChart();
        }, true);

        $scope.$watch('chartOptions', function(newValue, oldValue, srcScope) {
            if (!angular.equals(newValue, oldValue)){
                initChart();
            }
        }, true);
        
        $scope.$watch('chartClick', function(newValue, oldValue, scope) {
            $(elem).unbind('jqplotDataClick');
            if (attrs.chartClick){
                $(elem).bind('jqplotDataClick',
                    function (ev, seriesIndex, pointIndex, data) {
                        $timeout(function(){
                            $scope.chartClick({
                                ev: ev,
                                seriesIndex: seriesIndex,
                                pointIndex: pointIndex,
                                data: data
                            }); 
                        });
                    }
                );
            }
        });
        
        $scope.$watch('chartHighlight', function(newValue, oldValue, scope) {
            $(elem).unbind('jqplotDataHighlight');
            if (attrs.chartHighlight){
                $(elem).bind('jqplotDataHighlight',
                    function (ev, seriesIndex, pointIndex, data) {
                        $timeout(function(){
                            $scope.chartHighlight({
                                ev: ev,
                                seriesIndex: seriesIndex,
                                pointIndex: pointIndex,
                                data: data
                            }); 
                        });
                    }
                );
            }
        });
        
        $scope.$watch('chartUnhighlight', function(newValue, oldValue, scope) {
            $(elem).unbind('jqplotDataUnhighlight');
            if (attrs.chartUnhighlight){
                $(elem).bind('jqplotDataUnhighlight',
                    function (ev) {
                        $timeout(function(){
                            $scope.chartUnhighlight({
                                ev: ev
                            }); 
                        });
                    }
                );
            }
        });
        
        $scope.$watch('chartRightClick', function(newValue, oldValue, scope) {
            $(elem).unbind('jqplotRightClick');
            if (attrs.chartRightClick){
                $(elem).bind('jqplotRightClick',
                    function (ev, seriesIndex, pointIndex, data) {
                        $timeout(function(){
                            $scope.chartRightClick({
                                ev: ev,
                                seriesIndex: seriesIndex,
                                pointIndex: pointIndex,
                                data: data
                            }); 
                        });
                    }
                );
            }
        });

        $scope.$on('adfTabSelected', function(event, tabId){
            if ($scope.dirty){
                // call replot only on the chart that has been modified
                $timeout(function(){
                    $scope.plot.replot();
                    elem.find('.jqplot-xaxis-tick').parent().css("z-index", 1);
                    elem.find('.jqplot-yaxis-tick').parent().css("z-index", 1);
                })
                $scope.dirty = false;
            }
        });

    };

/**
 * @ngdoc directive
 * @name adf-ng.directive:adfBarChart
 * @restrict A
 *
 * @description
 * Bar chart component. This component extends jqPlot bar chart component.
 *
 * See {@link http://www.jqplot.com/docs} for more information on input data format and available options.
 * 
 * See ADF documentation on temui.chart.barChart for more information on the underlying component.
 * 
 * @param {Array} chartData Array, each element is a data array for a series.
 * @param {Object} chartOptions jqPlot chart options
 * @param {Function=} chartClick Callback function triggered when a bar is clicked. Injected parameters: ev, seriesIndex, pointIndex, data.
 * @param {Function=} chartHighlight Callback function triggered when a bar is highlighted. Injected parameters: ev, seriesIndex, pointIndex, data.
 * @param {Function=} chartUnhighlight Callback function triggered when a bar is unhighlighted. Injected parameters: ev.
 * @param {Function=} chartRightClick Callback function triggered when rightclick happens on a bar. Injected parameters: ev, seriesIndex, pointIndex, data.
 *
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="ChartController">
        <div adf-chart-container header="Chart Title">
            <div adf-bar-chart 
                chart-data="barCharData" 
                chart-options="barCharOptions"
                chart-click="onBarCharDataClicked(seriesIndex, pointIndex, data)"
                style="height: 250px; width: 100%"
            />
        </div>
    </div>
  </file>
  <file name="script.js">
  function ChartController($scope) {
    var chartSeries1 = [[923,1], [910,2], [969,3], [964,4], [959,5]];
    var chartSeries2 = [[37,1], [50,2], [27,3], [24,4], [20,5]];
    var ticks = ["Other", "Important", "Critical", "Moderate", "Low"];
    $scope.barCharData = [chartSeries1, chartSeries2];
    
    $scope.barCharOptions = {
        highlighter: {
            show: true,
            showTooltip: true,
            tooltipAxes: 'x',
            formatString:'Endpoints: %s'
        },
        series: [{label:"Unpatched", color:"#cd1717"}, {label:"Patched", color:"#A5BC4E"}],
        axes: {
            yaxis: {
                ticks: ticks
            },
            xaxis: {
                label:'# of Patched/Unpatched Endpoints'
            }
        },
        stackSeries: true,
        legend: {
            show: true,
            placement:"inside",
            location:"se"
        }
    };

    $scope.onBarCharDataClicked = function(seriesIndex, pointIndex, data){
        alert('seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);
    };
  }
  </file>
</example>
 */
    angular.module('adf-ng').directive('adfBarChart', ['adf', '$timeout', function (adfapi, $timeout) {
        return {
            require: '?^adfChartContainer',
            scope: chartScopeDef,
            link: function ($scope, elem, attrs, chartContainer) {
                chartLinkFun($scope, elem, attrs, chartContainer, adfapi, $timeout, temui.chart.barChart);
            }
        };
    }])


/**
 * @ngdoc directive
 * @name adf-ng.directive:adfColumnChart
 * @restrict A
 *
 * @description
 * Column chart component. This component extends jqPlot bar chart component.
 *
 * See {@link http://www.jqplot.com/docs} for more information on input data format and available options.
 * 
 * See ADF documentation on temui.chart.columnChart for more information on the underlying component.
 * 
 * @param {Array} chartData Array, each element is a data array for a series.
 * @param {Object} chartOptions jqPlot chart options
 * @param {Function=} chartClick Callback function triggered when a column is clicked. Injected parameters: ev, seriesIndex, pointIndex, data.
 * @param {Function=} chartHighlight Callback function triggered when a column is highlighted. Injected parameters: ev, seriesIndex, pointIndex, data.
 * @param {Function=} chartUnhighlight Callback function triggered when a column is unhighlighted. Injected parameters: ev.
 * @param {Function=} chartRightClick Callback function triggered when rightclick happens on a column. Injected parameters: ev, seriesIndex, pointIndex, data.
 *
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="ChartController">
        <div adf-chart-container header="Chart Title">
            <div adf-column-chart 
                chart-data="columnChartData" 
                chart-options="columnChartOptions" 
                chart-click="onCharDataClicked(seriesIndex, pointIndex, data)"
                style="height: 350px; width: 100%">
            </div>
        </div>
    </div>
  </file>
  <file name="script.js">
  function ChartController($scope) {

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
        series: [{label: "Patched", color:"#A5BC4E"},{label: "Unpatched", color:"#cd1717"}],
        axes:{
            xaxis: {
                ticks: $scope.columnCharTicks,
                renderer: $.jqplot.CategoryAxisRenderer

            },
            yaxis: {
                label: "Sample Chart",
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer
            }
        },
        legend: {
            show: true,
            placement:"outsideGrid",
            location:"s"
        }
    };

    $scope.onCharDataClicked = function(seriesIndex, pointIndex, data){
        alert('Chart clicked: seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);
    };
  }
  </file>
</example>
 */
    .directive('adfColumnChart', ['adf', '$timeout', function (adfapi, $timeout) {
        return {
            require: '?^adfChartContainer',
            scope: chartScopeDef,
            link: function ($scope, elem, attrs, chartContainer) {
                chartLinkFun($scope, elem, attrs, chartContainer, adfapi, $timeout, temui.chart.columnChart);
            }
        };
    }])


/**
 * @ngdoc directive
 * @name adf-ng.directive:adfPieChart
 * @restrict A
 *
 * @description
 * Pie chart component. This component extends jqPlot pie chart.
 *
 * See {@link http://www.jqplot.com/docs} for more information on input data format and available options.
 * 
 * See ADF documentation on temui.chart.pieChart for more information on the underlying component.
 * 
 * @param {Array} chartData Array, each element is a data array for a series.
 * @param {Object} chartOptions jqPlot chart options
 * @param {Function=} chartClick Callback function triggered when a column is clicked. Injected parameters: ev, seriesIndex, pointIndex, data.
 * @param {Function=} chartHighlight Callback function triggered when a column is highlighted. Injected parameters: ev, seriesIndex, pointIndex, data.
 * @param {Function=} chartUnhighlight Callback function triggered when a column is unhighlighted. Injected parameters: ev.
 * @param {Function=} chartRightClick Callback function triggered when rightclick happens on a column. Injected parameters: ev, seriesIndex, pointIndex, data.
 *
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="ChartController">
        <div adf-chart-container header="Chart Title">
            <div adf-pie-chart 
                chart-data="pieChartData" 
                chart-options="pieChartOptions" 
                chart-click="onCharDataClicked(seriesIndex, pointIndex, data)"
                style="height: 350px; width: 100%">
            </div>
        </div>
    </div>
  </file>
  <file name="script.js">
  function ChartController($scope) {

    $scope.pieChartData = [[["Patched", 966909], ["Unpatched", 725551]]];

    $scope.pieChartOptions = {
        seriesColors: ["#A5BC4E", "#cd1717"],
        seriesDefaults: {
            rendererOptions: {highlightMouseOver: false}
        },
        legend: {
            labels: ["Patched" + ': 966909', "Unpatched" + ': 725551'],
            show:true
        }
    };

    $scope.onCharDataClicked = function(seriesIndex, pointIndex, data){
        alert('Chart clicked: seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);
    };
  }
  </file>
</example>
 */
    .directive('adfPieChart', ['adf', '$timeout', function (adfapi, $timeout) {
        return {
            require: '?^adfChartContainer',
            scope: chartScopeDef,
            link: function ($scope, elem, attrs, chartContainer) {
                chartLinkFun($scope, elem, attrs, chartContainer, adfapi, $timeout, temui.chart.pieChart);
            }
        };
    }]);

});