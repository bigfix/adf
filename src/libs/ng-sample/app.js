/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * Sample application bootstrap
 */

define([
	'text!ng-sample/content.html',
	'jquery', 
	'./module', 
	'css!ng-sample/style.css', 
	'sample-resources',
	'./controllers/main', 
	'./controllers/contextInfo', 
	'./controllers/contentCreation', 
	'./controllers/chart'
], function(content, $, module)
{
	$('#ng-app').css('visibility', 'hidden').html(content);
	angular.bootstrap(document.getElementById('ng-app'), ['sampleApp']);
    setTimeout(function(){
        $('#ng-app').css('visibility', 'visible');
    });
});