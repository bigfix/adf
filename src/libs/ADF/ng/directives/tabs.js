/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Angular directive for tab components
 * 
 */
define(['angular', 'jquery', 'text!./tab-set.html', '../adf-ng-module', 'adf-ui', '../services/adf'], function(angular, $, tabSetTemplate){

    angular.module('adf-ng')

/**
 * @ngdoc directive
 * @name adf-ng.directive:adfTabSet
 * @restrict A
 *
 * @description
 * The parent component of a collection of tab components.
 *
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div adf-tab-set>
        <div adf-tab heading="Tab 1">
            Tab 1 content
        </div>
        <div adf-tab heading="Tab 2">
            Tab 2 content
        </div>
    </div>
  </file>
</example>
 */
    .directive('adfTabSet', ['adf', '$timeout', function(adfapi, $timeout){
        return {
            template: tabSetTemplate,
            transclude: true,
            controller: function($scope) {
                var ctrl = this;
                var tabs = $scope.tabs = [];

                ctrl.select = function(tab) {
                    angular.forEach(tabs, function(tab) {
                        tab.setActive(false);
                    });
                    tab.setActive(true);
                };

                ctrl.addTab = function(tab) {
                    tabs.push(tab);
                };

                ctrl.removeTab = function(tab){
                    var index = tabs.indexOf(tab);
                    if (tab.active && tabs.length > 1) {
                      var newActiveIndex = (index == tabs.length - 1) ? (index - 1) : (index + 1);
                      ctrl.select(tabs[newActiveIndex]);
                    }
                    tabs.splice(index, 1);
                };
            },
            link: function ($scope, elem, attrs) {
                // This needs to be called in setTimeout to be executed
                // after the digest cycle because the link href hasn't 
                // been set to its real value at this time.
                $timeout(function(){
                    // fix for IE7
                    $(elem).find('a.temui-tab-heading').each(function(){
                        if ($(this).attr('href').split('#').length > 1){
                           $(this).attr('href', '#' + $(this).attr('href').split('#')[1]); 
                        }
                    });
                    $(elem).tabs();
                    $(elem).bind('tabsshow', function(event, ui) {
                        for (var i = 0; i < $scope.tabs.length; i++) {
                            if ('#' + $scope.tabs[i].id == $(ui.tab).attr('href')) {
                                $scope.tabs[i].setActive(true);
                            }else{
                                $scope.tabs[i].setActive(false);
                            }
                        };
                    });
                });

                $scope.$watch('tabs.length', function(newValue, oldValue, scope) {
                    $timeout(function(){
                        $(elem).tabs('refresh');
                    });
                });
            }
        };
    }])

/**
 * @ngdoc directive
 * @name adf-ng.directive:adfTab
 * @restrict A
 *
 * @description
 * Tab component. This is a wrapper of jquery tab. It must be nested under {@link adf-ng.directive:adfTabSet adfTabSet} component.
 *
 * @param {String} heading Tab heading
 * @param {Boolean=} active Whether or not this tab content is visible
 * @param {Function=} select Callback function triggered when the tab is selected
 * 
 * @example
<example module="adf-ng">
  <file name="content.html">
    <div ng-controller="MainController">
        Tab 1 is selected: {{tab1Active}}
        <div adf-tab-set>
            <div adf-tab heading="Tab 1" active="$parent.tab1Active">
                Tab 1 content
            </div>
            <div adf-tab heading="Tab 2" select="tab2Selected()">
                Tab 2 content
            </div>
        </div>
    </div>
  </file>
  <file name="script.js">
    function MainController($scope){
        $scope.tab2Selected = function(){
            alert("Tab 2 selected!");
        }
    }
  </file>
</example>
 */
    .directive('adfTab', ['adf', function (adfapi) {
        return {
            require: '^adfTabSet',
            scope: {
                heading: "@",
                active: "=",
                onSelect: "&select"
            },
            transclude: true,
            replace: true,
            template: '<div ng-transclude />',
            link: function ($scope, elem, attrs, tabSetContainer) {
                $scope.setActive = function(active){
                    if (attrs.active){
                        $scope.$apply(function(){
                            $scope.active = active;
                        });
                    }
                    if (active){
                        $scope.onSelect();
                        $scope.$$nextSibling.$broadcast('adfTabSelected', $scope.id);
                        $(window).trigger('resize');
                    }
                };

                if (!elem.attr('id'))
                    elem.attr('id', adfapi.javascriptUtils.uniqueID());

                $scope.id = elem.attr('id');

                tabSetContainer.addTab($scope);

                $scope.$on('$destroy', function() {
                    tabSetContainer.removeTab($scope);
                });
            }
        };
    }]);

});