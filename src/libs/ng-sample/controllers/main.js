/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Sample controller for main application
 */
define(['angular', '../module'], function(angular, module){
	
	module.controller("MainController", function ($scope)
	{
		
		$scope.navButtons = [
			{
				name: l10n.configButton, 
				click: function(){
					alert("Config button clicked");
				}, 
				cssClass: ""
			}
		];

		$scope.onRefresh = function(){
			loadData();
		};

		$scope.onRefresh();

        // sample data
		var GridFixlet = {};

		GridFixlet.NAME = 0;
		GridFixlet.ID = 1;
		GridFixlet.CATEGORY = 2;
		GridFixlet.SOURCE_SEVERITY = 3;
		GridFixlet.SOURCE_RELEASE_DATE = 4;
		GridFixlet.LINK = 5;
		GridFixlet.UNIQUE_ID = 6;
		GridFixlet.COMPLIANCE = 7;

		$scope.ticks = [];

		$scope.chartSeries1 = [
			[27,1],
			[24,2],
			[20,3],
			[3,4],
			[28,5],
			[48,6],
			[11,7],
			[61,8]
		];

		$scope.chartSeries2 = [
			[969,1],
			[964,2],
			[959,3],
			[955,4],
			[953,5],
			[952,6],
			[950,7],
			[939,8]
		];

		// load sample data using session relevance
		function loadData() {
			$scope.pageLoading = true;

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
		}

		/**
		 * Callback function after relevance data is ready.
		 * This function is called outside of angular scope.
		 * If scope data is modified, $scope.$apply() should be called
		 * to trigger digest cycle.
		 */
		function onLoad(results){
			var data = $scope.data = [];

			var dataArr = results.currData.toArray();
			for (var i = 0; i < dataArr.length; i++) {
				var item = {};
				for (var j = 0; j< dataArr[i].length; j++) {
					item[j] = dataArr[i][j];
				}
				item[GridFixlet.COMPLIANCE] = Math.floor(Math.random() * (101));
				data.push(item);
			}

			// $scope.ticks is used in the sample bar chart options
			$scope.ticks.length = 0;

			for(var i=0;i<7;i++) {
				var $link = $('<a class="barChartTick"/>').attr('href', data[i][GridFixlet.LINK]);
				
				var name = data[i][GridFixlet.NAME];
				name = name == null?"":name;
				
				$link.html(name);

				// add "outerHTML" of link		
				$scope.ticks.push($link.wrap('<div/>').parent().html());
			}

			// generate random data for a the bar chart everytime refresh is clicked
			if ($scope.chartSeries2){
				for (var i=0; i < $scope.chartSeries2.length; i++){
					$scope.chartSeries2[i][0] = 800 + Math.random()*200;
				}
			}

			$scope.pageLoading = false;
			$scope.$apply();
		}


	});

});