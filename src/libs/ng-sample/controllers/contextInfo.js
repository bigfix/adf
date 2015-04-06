/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Sample controller for context information tab
 */
define(['angular', '../module'], function(angular, module){
	
	module.controller("ContextInfoController", ["$scope", "$timeout", function ($scope, $timeout) {

		function updateCurrentTime(){
			$scope.currentTime = new Date();
			$timeout(function(){
				updateCurrentTime();
			}, 1000);
		};
		updateCurrentTime();

	}]);

});