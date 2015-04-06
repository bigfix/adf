/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Angular directive for button
 * 
 */
define(['angular', 'jquery', '../adf-ng-module', 'adf-ui', '../services/adf'], function(angular, $){

    angular.module('adf-ng')

/**
 * @ngdoc directive
 * @name adf-ng.directive:adfButton
 * @restrict A
 *
 * @description
 * A wrapper of jquery button
 *
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="MainController">
        <button adf-button ng-click="sayHello()">Button</button>
    </div>
  </file>
  <file name="script.js">
    function MainController($scope) {
        $scope.sayHello = function(){
        	alert('Hi there');
        };
    };
  </file>
</example>
 */
    .directive('adfButton', ['adf', function(adfapi){
        return {
            link: function ($scope, elem, attrs) {
                $(elem).button().addClass('btn');
            }
        };
    }])

});