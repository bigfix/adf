/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Sample controller for content creation tab
 */
define(['angular', '../module'], function(angular, module){
	
	module.controller("ContentCreationController", ["$scope", "$timeout", function ($scope, $timeout) {

		$scope.getTestAction = function(){
			var testAction = new tem.model.SingleAction("Test Action", "test relevance", "// do nothing");
			var testActionSettings = new tem.model.ActionSettings();
			testActionSettings.HasMessage = true;
			testActionSettings.ActionUITitle = "actionUI";
			testAction.Settings = testActionSettings;
			return testAction;
		}

		$scope.createAction = function(){
			$timeout(function(){
				tem.content.createContent($scope.getTestAction(), false, false);
			});
		}

		$scope.createActionNoUI = function(){
			tem.content.createContent($scope.getTestAction(), true, false);
		}
			
		$scope.createActionNoDoc = function(){
			tem.content.createContent($scope.getTestAction(), false, true);
		}

		$scope.createAnalysis = function(){
			var testAnalysis = new tem.model.Analysis();
			testAnalysis.Title = "Test Analysis";
			testAnalysis.Description = "Test Description";
			testAnalysis.Relevance = "Test Relevance";
			
			var prop = new tem.model.AnalysisProperty(3,"rrr", "now");
			prop.EvaluationPeriod = "PT0S"
			testAnalysis.Property = prop;
			
			tem.content.createContent(testAnalysis, false, false);
		}	
				
		$scope.openComputers = function(){
			tem.evalRel('ids of bes computers', {
				success: $scope.openComputersCallback
			});
		}

		$scope.openComputersCallback = function(computerIds) {	
			tem.content.openComputerGroup(computerIds, "Sample Ad Hoc Computer Group");
		}

	}]);

});