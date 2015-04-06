/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * ADF Angular components
 * 
 */

define([
	'angular',
	'angular-setlocale',
	'./adf-ng-module',
	'./directives/app',
	'./directives/top-navigation',
	'./directives/chart',
	'./directives/tabs',
	'./directives/button',
	'./services/adf'
], function(angular, setLocale){
	
	// set angular user locale based on console 
	// language preference
	setLocale(tem.context.getUserLocale());
});