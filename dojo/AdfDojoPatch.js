/**
 * (C) Copyright IBM Corp. 2011-2013  All Rights Reserved.
 * 
 * ADF v2.2.3
 */

/**
 * Contains some necessary patching of Dojo source code in order for it to work by default in
 * the TEM Console.
 */

// dojo defaults to this is if location protocol is file:
dojo.config.ieForceActiveXXhr = true;

// need to specify Msxml2.XMLHTTP.6.0 first, Msxml2.XMLHTTP.6.0 is installed with 8.0+ Console
dojo._XMLHTTP_PROGIDS = ['Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];


// need to account for "about:" here
dojo._isDocumentOk = function(http){
	var stat = http.status || 0,
		lp = location.protocol;
	return (stat >= 200 && stat < 300) || 	// Boolean
		stat == 304 || 						// allow any 2XX response code
		stat == 1223 || 						// get it out of the cache
		// Internet Explorer mangled the status code OR we're Titanium/browser chrome/chrome extension requesting a local file
		(!stat && (lp == "file:" || lp == "chrome:" || lp == "chrome-extension:" || lp == "app:"|| lp == "about:") );
}


// calling window.open with no param (as occurs in dojo) results in error
var windowOpenOld = window.open;
window.open = function() {return windowOpenOld('about:blank')};