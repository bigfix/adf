/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * ADFAPI wrapped in an Angular service
 * 
 */
define(['angular', 'adf', '../adf-ng-module'], function(angular){

    angular.module('adf-ng')

/**
 * @ngdoc service
 * @name adf-ng.service:adf
 *
 * @description
 * A wrapper of ADFAPI's tem namespace
 *
 */
    .factory('adf',function(){
        return tem;
     });

});