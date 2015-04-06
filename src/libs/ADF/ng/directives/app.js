/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * AngularJS directive for the main content page.
 * 
 */
define(['angular', 'jquery', '../adf-ng-module', 'adf-ui', '../services/adf'], function(angular, $){

    angular.module('adf-ng')


/**
 * @ngdoc directive
 * @name adf-ng.directive:adfApp
 * @restrict A
 *
 * @description
 * adf-app is the top level element for the app.
 *
 * @param {boolean=} loading Whether or not to show the loading screen.
 * @property {String} $scope.consoleVersion Console version
 * @property {Boolean} $scope.inConsole Whether or not the content is opened in console
 * @property {String} $scope.locale User locale
 * @property {String} $scope.perferredLanguage Console preferred language
 * @property {String} $scope.serverURL Server URL
 * @property {String} $scope.baseDirectory Base directory of dashboard content
 * @property {String} $scope.currentDSN Current DSN (not available in webreports)
 * @property {String} $scope.currentUser Current user (not available in webreports)
 * @property {String} $scope.windowHeight Height of the viewport
 *
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="MainController">
        <div adf-app loading="pageLoading">
            Page Content <br/>
            Console version: {{consoleVersion}}.
        </div>
    </div>
  </file>
  <file name="script.js">
    function MainController($scope) {
        $scope.pageLoading = false;
    };
  </file>
</example>
 */
    .directive('adfApp', ['adf', '$parse', '$timeout', function(tem, $parse, $timeout){
        return {
            restrict: 'EA',
            link: function ($scope, elem, attrs) {

                // context information
                $scope.consoleVersion = tem.context.getVersion();
                $scope.inConsole = tem.context.isInConsole();
                $scope.locale = tem.context.getUserLocale();
                $scope.perferredLanguage = tem.context.getPreferredLanguage();
                $scope.serverURL = tem.context.getServerURL();
                $scope.baseDirectory = tem.context.getBaseDirectory();
                
                if ($scope.inConsole) {
                    $scope.currentDSN = tem.context.getCurrentDSN();
                    $scope.currentUser = tem.context.getCurrentUser();
                }

                $scope.$watch($parse(attrs.loading), function(newValue, oldValue, scope) {
                	if (newValue) {
                		temui.showPageLoading();
                	}else{
                		temui.hidePageLoading();
                	}
                });

                $(window).resize(function(){
                    $scope.windowHeight = $(window).height();
                });
                $timeout(function(){
                    $(window).resize();
                });
            }
        };
    }])

});