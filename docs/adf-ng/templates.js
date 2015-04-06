angular.module('docsApp').run(['$templateCache', function($templateCache) {

  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfApp.html',
    "<h1><code ng:non-bindable=\"\">adfApp</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>adf-app is the top level element for the app.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-app\n" +
    "     [loading=\"{boolean}\"]&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "<h3 id=\"Parameters\">Parameters</h3>\n" +
    "<ul class=\"parameters\"><li><code ng:non-bindable=\"\">loading<i>(optional)</i> – {boolean=} – </code>\n" +
    "<p>Whether or not to show the loading screen.</p></li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<div class=\"member property\"><h2 id=\"Properties\">Properties</h2>\n" +
    "<ul class=\"properties\"><li><h3 id=\"$scope.consoleVersion\">$scope.consoleVersion</h3>\n" +
    "<div class=\"$scope-consoleversion\"><p>Console version</p></div>\n" +
    "</li>\n" +
    "<li><h3 id=\"$scope.inConsole\">$scope.inConsole</h3>\n" +
    "<div class=\"$scope-inconsole\"><p>Whether or not the content is opened in console</p></div>\n" +
    "</li>\n" +
    "<li><h3 id=\"$scope.locale\">$scope.locale</h3>\n" +
    "<div class=\"$scope-locale\"><p>User locale</p></div>\n" +
    "</li>\n" +
    "<li><h3 id=\"$scope.perferredLanguage\">$scope.perferredLanguage</h3>\n" +
    "<div class=\"$scope-perferredlanguage\"><p>Console preferred language</p></div>\n" +
    "</li>\n" +
    "<li><h3 id=\"$scope.serverURL\">$scope.serverURL</h3>\n" +
    "<div class=\"$scope-serverurl\"><p>Server URL</p></div>\n" +
    "</li>\n" +
    "<li><h3 id=\"$scope.baseDirectory\">$scope.baseDirectory</h3>\n" +
    "<div class=\"$scope-basedirectory\"><p>Base directory of dashboard content</p></div>\n" +
    "</li>\n" +
    "<li><h3 id=\"$scope.currentDSN\">$scope.currentDSN</h3>\n" +
    "<div class=\"$scope-currentdsn\"><p>Current DSN (not available in webreports)</p></div>\n" +
    "</li>\n" +
    "<li><h3 id=\"$scope.currentUser\">$scope.currentUser</h3>\n" +
    "<div class=\"$scope-currentuser\"><p>Current user (not available in webreports)</p></div>\n" +
    "</li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\r" +
    "\n" +
    "  <div ng-controller=\"MainController\">\r" +
    "\n" +
    "      <div adf-app loading=\"pageLoading\">\r" +
    "\n" +
    "          Page Content <br/>\r" +
    "\n" +
    "          Console version: {{consoleVersion}}.\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js\">\r" +
    "\n" +
    "  function MainController($scope) {\r" +
    "\n" +
    "      $scope.pageLoading = false;\r" +
    "\n" +
    "  };\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfBarChart.html',
    "<h1><code ng:non-bindable=\"\">adfBarChart</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>Bar chart component. This component extends jqPlot bar chart component.</p>\n" +
    "\n" +
    "<p>See <a href=\"http://www.jqplot.com/docs\">http://www.jqplot.com/docs</a> for more information on input data format and available options.</p>\n" +
    "\n" +
    "<p>See ADF documentation on temui.chart.barChart for more information on the underlying component.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-bar-chart\n" +
    "     chartData=\"{Array}\"\n" +
    "     chartOptions=\"{Object}\"\n" +
    "     [chartClick=\"{Function}\"]\n" +
    "     [chartHighlight=\"{Function}\"]\n" +
    "     [chartUnhighlight=\"{Function}\"]\n" +
    "     [chartRightClick=\"{Function}\"]&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "<h3 id=\"Parameters\">Parameters</h3>\n" +
    "<ul class=\"parameters\"><li><code ng:non-bindable=\"\">chartData – {Array} – </code>\n" +
    "<p>Array, each element is a data array for a series.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartOptions – {Object} – </code>\n" +
    "<p>jqPlot chart options</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartClick<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a bar is clicked. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartHighlight<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a bar is highlighted. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartUnhighlight<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a bar is unhighlighted. Injected parameters: ev.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartRightClick<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when rightclick happens on a bar. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js-2\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\n" +
    "  <div ng-controller=\"ChartController\">\n" +
    "      <div adf-chart-container header=\"Chart Title\">\n" +
    "          <div adf-bar-chart \n" +
    "              chart-data=\"barCharData\" \n" +
    "              chart-options=\"barCharOptions\"\n" +
    "              chart-click=\"onBarCharDataClicked(seriesIndex, pointIndex, data)\"\n" +
    "              style=\"height: 250px; width: 100%\"\n" +
    "          />\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js-2\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js-2\">\n" +
    "function ChartController($scope) {\n" +
    "  var chartSeries1 = [[923,1], [910,2], [969,3], [964,4], [959,5]];\n" +
    "  var chartSeries2 = [[37,1], [50,2], [27,3], [24,4], [20,5]];\n" +
    "  var ticks = [\"Other\", \"Important\", \"Critical\", \"Moderate\", \"Low\"];\n" +
    "  $scope.barCharData = [chartSeries1, chartSeries2];\n" +
    "  \n" +
    "  $scope.barCharOptions = {\n" +
    "      highlighter: {\n" +
    "          show: true,\n" +
    "          showTooltip: true,\n" +
    "          tooltipAxes: 'x',\n" +
    "          formatString:'Endpoints: %s'\n" +
    "      },\n" +
    "      series: [{label:\"Unpatched\", color:\"#cd1717\"}, {label:\"Patched\", color:\"#A5BC4E\"}],\n" +
    "      axes: {\n" +
    "          yaxis: {\n" +
    "              ticks: ticks\n" +
    "          },\n" +
    "          xaxis: {\n" +
    "              label:'# of Patched/Unpatched Endpoints'\n" +
    "          }\n" +
    "      },\n" +
    "      stackSeries: true,\n" +
    "      legend: {\n" +
    "          show: true,\n" +
    "          placement:\"inside\",\n" +
    "          location:\"se\"\n" +
    "      }\n" +
    "  };\n" +
    "\n" +
    "  $scope.onBarCharDataClicked = function(seriesIndex, pointIndex, data){\n" +
    "      alert('seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);\n" +
    "  };\n" +
    "}\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js-2\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfButton.html',
    "<h1><code ng:non-bindable=\"\">adfButton</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>A wrapper of jquery button</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-button&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js-0\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\r" +
    "\n" +
    "  <div ng-controller=\"MainController\">\r" +
    "\n" +
    "      <button adf-button ng-click=\"sayHello()\">Button</button>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js-0\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js-0\">\r" +
    "\n" +
    "  function MainController($scope) {\r" +
    "\n" +
    "      $scope.sayHello = function(){\r" +
    "\n" +
    "      \talert('Hi there');\r" +
    "\n" +
    "      };\r" +
    "\n" +
    "  };\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js-0\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfChartContainer.html',
    "<h1><code ng:non-bindable=\"\">adfChartContainer</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>Chart container contains a chart item. It adds chart title and resizes its chart component when needed.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-chart-container\n" +
    "     header=\"{String}\"\n" +
    "     [resizeFn=\"{Function}\"]&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "<h3 id=\"Parameters\">Parameters</h3>\n" +
    "<ul class=\"parameters\"><li><code ng:non-bindable=\"\">header – {String} – </code>\n" +
    "<p>Chart header</p></li>\n" +
    "<li><code ng:non-bindable=\"\">resizeFn<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Returns a function that can be called to force chart resize</p></li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js-1\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\n" +
    "  <div ng-controller=\"ChartController\">\n" +
    "      <div adf-chart-container header=\"Chart Title\">\n" +
    "          <div adf-bar-chart \n" +
    "              chart-data=\"barCharData\" \n" +
    "              chart-options=\"barCharOptions\"\n" +
    "              chart-click=\"onBarCharDataClicked(seriesIndex, pointIndex, data)\"\n" +
    "              style=\"height: 250px; width: 100%\"\n" +
    "          />\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js-1\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js-1\">\n" +
    "function ChartController($scope) {\n" +
    "  var chartSeries1 = [[923,1], [910,2], [969,3], [964,4], [959,5]];\n" +
    "  var chartSeries2 = [[37,1], [50,2], [27,3], [24,4], [20,5]];\n" +
    "  var ticks = [\"Other\", \"Important\", \"Critical\", \"Moderate\", \"Low\"];\n" +
    "  $scope.barCharData = [chartSeries1, chartSeries2];\n" +
    "  \n" +
    "  $scope.barCharOptions = {\n" +
    "      highlighter: {\n" +
    "          show: true,\n" +
    "          showTooltip: true,\n" +
    "          tooltipAxes: 'x',\n" +
    "          formatString:'Endpoints: %s'\n" +
    "      },\n" +
    "      series: [{label:\"Unpatched\", color:\"#cd1717\"}, {label:\"Patched\", color:\"#A5BC4E\"}],\n" +
    "      axes: {\n" +
    "          yaxis: {\n" +
    "              ticks: ticks\n" +
    "          },\n" +
    "          xaxis: {\n" +
    "              label:'# of Patched/Unpatched Endpoints'\n" +
    "          }\n" +
    "      },\n" +
    "      stackSeries: true,\n" +
    "      legend: {\n" +
    "          show: true,\n" +
    "          placement:\"inside\",\n" +
    "          location:\"se\"\n" +
    "      }\n" +
    "  };\n" +
    "\n" +
    "  $scope.onBarCharDataClicked = function(seriesIndex, pointIndex, data){\n" +
    "      alert('seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);\n" +
    "  };\n" +
    "}\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js-1\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfColumnChart.html',
    "<h1><code ng:non-bindable=\"\">adfColumnChart</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>Column chart component. This component extends jqPlot bar chart component.</p>\n" +
    "\n" +
    "<p>See <a href=\"http://www.jqplot.com/docs\">http://www.jqplot.com/docs</a> for more information on input data format and available options.</p>\n" +
    "\n" +
    "<p>See ADF documentation on temui.chart.columnChart for more information on the underlying component.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-column-chart\n" +
    "     chartData=\"{Array}\"\n" +
    "     chartOptions=\"{Object}\"\n" +
    "     [chartClick=\"{Function}\"]\n" +
    "     [chartHighlight=\"{Function}\"]\n" +
    "     [chartUnhighlight=\"{Function}\"]\n" +
    "     [chartRightClick=\"{Function}\"]&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "<h3 id=\"Parameters\">Parameters</h3>\n" +
    "<ul class=\"parameters\"><li><code ng:non-bindable=\"\">chartData – {Array} – </code>\n" +
    "<p>Array, each element is a data array for a series.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartOptions – {Object} – </code>\n" +
    "<p>jqPlot chart options</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartClick<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a column is clicked. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartHighlight<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a column is highlighted. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartUnhighlight<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a column is unhighlighted. Injected parameters: ev.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartRightClick<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when rightclick happens on a column. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js-3\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\n" +
    "  <div ng-controller=\"ChartController\">\n" +
    "      <div adf-chart-container header=\"Chart Title\">\n" +
    "          <div adf-column-chart \n" +
    "              chart-data=\"columnChartData\" \n" +
    "              chart-options=\"columnChartOptions\" \n" +
    "              chart-click=\"onCharDataClicked(seriesIndex, pointIndex, data)\"\n" +
    "              style=\"height: 350px; width: 100%\">\n" +
    "          </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js-3\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js-3\">\n" +
    "function ChartController($scope) {\n" +
    "\n" +
    "  $scope.columnCharSeries1 = [\n" +
    "      [1,189029],\n" +
    "      [2,360279],\n" +
    "      [3,303117],\n" +
    "      [4,64213],\n" +
    "      [5,15229]\n" +
    "  ];\n" +
    "\n" +
    "  $scope.columnCharSeries2 = [\n" +
    "      [1,183840, \"item1\"],\n" +
    "      [2,380156, \"item2\"],\n" +
    "      [3,301518, \"item3\"],\n" +
    "      [4,62200, \"item4\"],\n" +
    "      [5,17151, \"item5\"]\n" +
    "  ];\n" +
    "\n" +
    "  $scope.columnCharTicks = [\n" +
    "      \"Other\",\n" +
    "      \"Important\",\n" +
    "      \"Critical\",\n" +
    "      \"Moderate\",\n" +
    "      \"Low\"\n" +
    "  ];\n" +
    "\n" +
    "  $scope.columnChartData = [$scope.columnCharSeries1, $scope.columnCharSeries2];\n" +
    "\n" +
    "  $scope.columnChartOptions = {\n" +
    "      series: [{label: \"Patched\", color:\"#A5BC4E\"},{label: \"Unpatched\", color:\"#cd1717\"}],\n" +
    "      axes:{\n" +
    "          xaxis: {\n" +
    "              ticks: $scope.columnCharTicks,\n" +
    "              renderer: $.jqplot.CategoryAxisRenderer\n" +
    "\n" +
    "          },\n" +
    "          yaxis: {\n" +
    "              label: \"Sample Chart\",\n" +
    "              labelRenderer: $.jqplot.CanvasAxisLabelRenderer\n" +
    "          }\n" +
    "      },\n" +
    "      legend: {\n" +
    "          show: true,\n" +
    "          placement:\"outsideGrid\",\n" +
    "          location:\"s\"\n" +
    "      }\n" +
    "  };\n" +
    "\n" +
    "  $scope.onCharDataClicked = function(seriesIndex, pointIndex, data){\n" +
    "      alert('Chart clicked: seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);\n" +
    "  };\n" +
    "}\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js-3\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfPieChart.html',
    "<h1><code ng:non-bindable=\"\">adfPieChart</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>Pie chart component. This component extends jqPlot pie chart.</p>\n" +
    "\n" +
    "<p>See <a href=\"http://www.jqplot.com/docs\">http://www.jqplot.com/docs</a> for more information on input data format and available options.</p>\n" +
    "\n" +
    "<p>See ADF documentation on temui.chart.pieChart for more information on the underlying component.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-pie-chart\n" +
    "     chartData=\"{Array}\"\n" +
    "     chartOptions=\"{Object}\"\n" +
    "     [chartClick=\"{Function}\"]\n" +
    "     [chartHighlight=\"{Function}\"]\n" +
    "     [chartUnhighlight=\"{Function}\"]\n" +
    "     [chartRightClick=\"{Function}\"]&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "<h3 id=\"Parameters\">Parameters</h3>\n" +
    "<ul class=\"parameters\"><li><code ng:non-bindable=\"\">chartData – {Array} – </code>\n" +
    "<p>Array, each element is a data array for a series.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartOptions – {Object} – </code>\n" +
    "<p>jqPlot chart options</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartClick<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a column is clicked. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartHighlight<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a column is highlighted. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartUnhighlight<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when a column is unhighlighted. Injected parameters: ev.</p></li>\n" +
    "<li><code ng:non-bindable=\"\">chartRightClick<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when rightclick happens on a column. Injected parameters: ev, seriesIndex, pointIndex, data.</p></li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js-4\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\n" +
    "  <div ng-controller=\"ChartController\">\n" +
    "      <div adf-chart-container header=\"Chart Title\">\n" +
    "          <div adf-pie-chart \n" +
    "              chart-data=\"pieChartData\" \n" +
    "              chart-options=\"pieChartOptions\" \n" +
    "              chart-click=\"onCharDataClicked(seriesIndex, pointIndex, data)\"\n" +
    "              style=\"height: 350px; width: 100%\">\n" +
    "          </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js-4\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js-4\">\n" +
    "function ChartController($scope) {\n" +
    "\n" +
    "  $scope.pieChartData = [[[\"Patched\", 966909], [\"Unpatched\", 725551]]];\n" +
    "\n" +
    "  $scope.pieChartOptions = {\n" +
    "      seriesColors: [\"#A5BC4E\", \"#cd1717\"],\n" +
    "      seriesDefaults: {\n" +
    "          rendererOptions: {highlightMouseOver: false}\n" +
    "      },\n" +
    "      legend: {\n" +
    "          labels: [\"Patched\" + ': 966909', \"Unpatched\" + ': 725551'],\n" +
    "          show:true\n" +
    "      }\n" +
    "  };\n" +
    "\n" +
    "  $scope.onCharDataClicked = function(seriesIndex, pointIndex, data){\n" +
    "      alert('Chart clicked: seriesIndex: ' + seriesIndex + ', pointIndex:' + pointIndex + ', data: '+data);\n" +
    "  };\n" +
    "}\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js-4\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfTab.html',
    "<h1><code ng:non-bindable=\"\">adfTab</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>Tab component. This is a wrapper of jquery tab. It must be nested under <a mock-link href=\"#/api_adf_ng/adf-ng.directive:adfTabSet\">adfTabSet</a> component.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-tab\n" +
    "     heading=\"{String}\"\n" +
    "     [active=\"{Boolean}\"]\n" +
    "     [select=\"{Function}\"]&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "<h3 id=\"Parameters\">Parameters</h3>\n" +
    "<ul class=\"parameters\"><li><code ng:non-bindable=\"\">heading – {String} – </code>\n" +
    "<p>Tab heading</p></li>\n" +
    "<li><code ng:non-bindable=\"\">active<i>(optional)</i> – {Boolean=} – </code>\n" +
    "<p>Whether or not this tab content is visible</p></li>\n" +
    "<li><code ng:non-bindable=\"\">select<i>(optional)</i> – {Function=} – </code>\n" +
    "<p>Callback function triggered when the tab is selected</p></li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js-5\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\r" +
    "\n" +
    "  <div ng-controller=\"MainController\">\r" +
    "\n" +
    "      Tab 1 is selected: {{tab1Active}}\r" +
    "\n" +
    "      <div adf-tab-set>\r" +
    "\n" +
    "          <div adf-tab heading=\"Tab 1\" active=\"$parent.tab1Active\">\r" +
    "\n" +
    "              Tab 1 content\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div adf-tab heading=\"Tab 2\" select=\"tab2Selected()\">\r" +
    "\n" +
    "              Tab 2 content\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js-5\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js-5\">\r" +
    "\n" +
    "  function MainController($scope){\r" +
    "\n" +
    "      $scope.tab2Selected = function(){\r" +
    "\n" +
    "          alert(\"Tab 2 selected!\");\r" +
    "\n" +
    "      }\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js-5\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfTabSet.html',
    "<h1><code ng:non-bindable=\"\">adfTabSet</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>The parent component of a collection of tab components.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-tab-set&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\r" +
    "\n" +
    "  <div adf-tab-set>\r" +
    "\n" +
    "      <div adf-tab heading=\"Tab 1\">\r" +
    "\n" +
    "          Tab 1 content\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div adf-tab heading=\"Tab 2\">\r" +
    "\n" +
    "          Tab 2 content\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.directive.adfTopNavigation.html',
    "<h1><code ng:non-bindable=\"\">adfTopNavigation</code>\n" +
    "<span class=\"hint\">(directive in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>Top navigation bar which conains dashboard title and navigation buttons.</p></div>\n" +
    "<h2 id=\"Usage\">Usage</h2>\n" +
    "<div class=\"usage\">as attribute<pre class=\"prettyprint linenums\">&lt;ANY adf-top-navigation\n" +
    "     title=\"{String}\"\n" +
    "     [showRefresh=\"{Boolean}\"]\n" +
    "     [showPrint=\"{Boolean}\"]\n" +
    "     [extraButtons=\"{Array}\"]\n" +
    "     [refresh=\"{expression}\"]&gt;\n" +
    "   ...\n" +
    "&lt;/ANY&gt;</pre>\n" +
    "<h3 id=\"Parameters\">Parameters</h3>\n" +
    "<ul class=\"parameters\"><li><code ng:non-bindable=\"\">title – {String} – </code>\n" +
    "<p>Dashboard/webreport title</p></li>\n" +
    "<li><code ng:non-bindable=\"\">showRefresh<i>(optional)</i> – {Boolean=} – </code>\n" +
    "<p>Whether or not the refresh is displayed</p></li>\n" +
    "<li><code ng:non-bindable=\"\">showPrint<i>(optional)</i> – {Boolean=} – </code>\n" +
    "<p>Whether or not the print is displayed</p></li>\n" +
    "<li><code ng:non-bindable=\"\">extraButtons<i>(optional)</i> – {Array=} – </code>\n" +
    "<p>Array of other button definitions to be included in the top right corner. Each button definition can define the following properties: name (String), cssClass (String), and click (Function callback on click event).</p></li>\n" +
    "<li><code ng:non-bindable=\"\">refresh<i>(optional)</i> – {expression=} – </code>\n" +
    "<p>Callback function triggered when refresh button is clicked</p></li>\n" +
    "</ul>\n" +
    "</div>\n" +
    "<h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><h4>Source</h4>\n" +
    "<div source-edit=\"adf-ng\" source-edit-deps=\"angular.js script.js\" source-edit-html=\"content.html\" source-edit-css=\"\" source-edit-js=\"script.js-6\" source-edit-unit=\"\" source-edit-scenario=\"\"></div>\n" +
    "<div class=\"tabbable\"><div class=\"tab-pane\" title=\"content.html\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"content.html\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"content.html\">\r" +
    "\n" +
    "  <div ng-controller=\"MainController\">\r" +
    "\n" +
    "      <div adf-top-navigation \r" +
    "\n" +
    "              title=\"Dashboard Title\"\r" +
    "\n" +
    "              show-refresh=\"true\"\r" +
    "\n" +
    "              show-print=\"true\"\r" +
    "\n" +
    "              refresh=\"onRefresh()\"\r" +
    "\n" +
    "              extra-buttons=\"navButtons\"\r" +
    "\n" +
    "      />\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "<div class=\"tab-pane\" title=\"script.js\">\n" +
    "<pre class=\"prettyprint linenums\" ng-set-text=\"script.js-6\"></pre>\n" +
    "<script type=\"text/ng-template\" id=\"script.js-6\">\r" +
    "\n" +
    "  function MainController($scope){\r" +
    "\n" +
    "      $scope.navButtons = [\r" +
    "\n" +
    "          {\r" +
    "\n" +
    "              name: \"config\", \r" +
    "\n" +
    "              click: function(){\r" +
    "\n" +
    "                  alert(\"Sample button clicked\");\r" +
    "\n" +
    "              }\r" +
    "\n" +
    "          }\r" +
    "\n" +
    "      ];\r" +
    "\n" +
    "\n" +
    "      $scope.onRefresh = function(){\r" +
    "\n" +
    "          alert('Refresh button clicked');\r" +
    "\n" +
    "      };\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "</script>\n" +
    "</div>\n" +
    "</div><h4>Demo</h4>\n" +
    "<div class=\"well doc-example-live animator-container\" ng-embed-app=\"adf-ng\" ng-set-html=\"content.html\" ng-eval-javascript=\"script.js-6\"></div></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.html',
    "<h1><code ng:non-bindable=\"\"></code>\n" +
    "<span class=\"hint\"></span>\n" +
    "</h1>\n" +
    "<div><p>ADF angularJS module</p><h2 id=\"Example\">Example</h2>\n" +
    "<div class=\"example\"><pre class=\"prettyprint linenums\">var module = angular.module('sampleApp', ['adf-ng']);</pre></div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/api_adf_ng/adf-ng.service.adf.html',
    "<h1><code ng:non-bindable=\"\">adf</code>\n" +
    "<span class=\"hint\">(service in module <code ng:non-bindable=\"\">adf-ng</code>\n" +
    ")</span>\n" +
    "</h1>\n" +
    "<div><h2 id=\"Description\">Description</h2>\n" +
    "<div class=\"description\"><p>A wrapper of ADFAPI's tem namespace</p></div>\n" +
    "</div>\n"
  );

}]);
