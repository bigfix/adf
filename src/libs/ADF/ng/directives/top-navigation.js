/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Top navigation component
 *
 * Sample Use:
 * <div top-navigation title="Sample Dashboard" 
 *          show-refresh="true"
 *          show-print="true"
 *          on-refresh="alert('refresh')"
 *          extra-buttons="navButtons"
 *  />
 *
 * $scope.navButtons = [
 *     {name: "Config", click: function(){alert("Config button clicked")}, cssClass: ""}
 * ];
 * 
 */
define(['angular', 'text!./top-navigation.html', '../adf-ng-module'], function(angular, template){

    angular.module('adf-ng')

/**
 * @ngdoc directive
 * @name adf-ng.directive:adfTopNavigation
 * @restrict A
 *
 * @description
 * Top navigation bar which conains dashboard title and navigation buttons.
 *
 * @param {String} title Dashboard/webreport title
 * @param {Boolean=} showRefresh Whether or not the refresh is displayed
 * @param {Boolean=} showPrint Whether or not the print is displayed
 * @param {Array=} extraButtons Array of other button definitions to be included in the top right corner. Each button definition can define the following properties: name (String), cssClass (String), and click (Function callback on click event).
 * @param {expression=} refresh Callback function triggered when refresh button is clicked
 * 
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="MainController">
        <div adf-top-navigation 
                title="Dashboard Title"
                show-refresh="true"
                show-print="true"
                refresh="onRefresh()"
                extra-buttons="navButtons"
        />
    </div>
  </file>
  <file name="script.js">
    function MainController($scope){
        $scope.navButtons = [
            {
                name: "config", 
                click: function(){
                    alert("Sample button clicked");
                }
            }
        ];

        $scope.onRefresh = function(){
            alert('Refresh button clicked');
        };
    }
  </file>
</example>
 */
    .directive('adfTopNavigation',function(){
        return {
            template: template,
            replace: true,
            transclude: true,
            scope: {
                title: '@',
                showRefresh: '=',
                showPrint: '=',
                extraButtons: '=',
                onRefresh: '&refresh'       /* refresh callback */
            },
            link: function ($scope, element, attr) {
                $scope.lastUpdate = new Date();
                $scope.refreshClicked = function(){
                    $scope.onRefresh();
                    $scope.lastUpdate = new Date();
                };
                $scope.printClicked = function(){
                    temui.print();
                };
            }
        };
     });

});