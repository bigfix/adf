/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Define the main app module that can be included in other
 * files using requirejs.
 */
define(['adf-ng'], function(){
	var module = angular.module('sampleApp', ['adf-ng']);
	return module;
});