/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * ADF v2.3.0
 */

try {
	Relevance;
} catch(e) {
	try {
		console.error('ADF JavaScript API can only be used with 8.0+ consoles. Error: ' + e.message);
	}catch(e2) {}
	throw new Error(temui.l10n.adfapi.consoleVersion8Required + "  " + e.message);
}


/**
 * @namespace
 */
var tem = {};


(function() {

var inConsoleContextCheck = Relevance('if exists current wizard then dashboard id of current wizard else "false"')==="false"?false:true;


// referencing then nulling non-namespaced hooks in wizards.js
var relevanceHook = Relevance;
Relevance = null;
var openComputerGroupHook = OpenComputerGroup;
OpenComputerGroup = null;
var registerRefreshHandlerHook = RegisterRefreshHandler;
RegisterRefreshHandler = null;


if(inConsoleContextCheck) {
	var colorizeRelevanceHook = ColorizeRelevance;
	ColorizeRelevance = null;
	var browseForFileHook = BrowseForFile;
	var doBrowseDialogWithFlagsHook = DoBrowseDialogWithFlags;
	var makeArchiveHook = MakeArchive;
	MakeArchive = null;
	var uploadFileHook = UploadFile;
	UploadFile = null;
	var archiveAndUploadFileHook = ArchiveAndUploadFile;
	ArchiveAndUploadFile = null;
	var downloadFileHook = DownloadFile;
	DownloadFile = null;
	var downloadFileWithSHA1Hook = DownloadFileWithSHA1;
	DownloadFileWithSHA1 = null;
	var getFileSHA1Hook = GetFileSHA1;
	GetFileSHA1 = null;
	var getFileSizeHook = GetFileSize;
	GetFileSize = null;
	var copyFileHook = CopyFile;
	CopyFile = null;
	var copyFolderHook = CopyFolder;
	CopyFolder = null;
	var deleteAllFilesHook = DeleteAllFiles;
	DeleteAllFiles = null;
	var deleteFileHook = DeleteFile;
	DeleteFile = null;
	var deleteFolderHook = DeleteFolder;
	DeleteFolder = null;
	var deleteTreeHook = DeleteTree;
	DeleteTree = null;
	var makeFolderHook = MakeFolder;
	MakeFolder = null;
	var moveFileHook = MoveFile;
	MoveFile = null;
	var writeFileHook = WriteFile;
	WriteFile = null;
	var importXMLHook = ImportXML;
	//ImportXML = null;
	var importXMLToSiteHook = ImportXMLToSite;
	//ImportXMLToSite = null;
	var editFixletHook = EditFixlet;
	//EditFixlet = null;
	var deleteFixletHook = DeleteFixlet;
	//DeleteFixlet = null;
	var deleteFixletsHook = DeleteFixlets;
	//DeleteFixlets = null;
	var deletePropertiesHook = DeleteProperties;
	DeleteProperties = null;
	var deletePropertyHook = DeleteProperty;
	DeleteProperty = null;
	var activateAnalysesHook = ActivateAnalyses;
	//ActivateAnalyses = null;
	var activateAnalysisHook = ActivateAnalysis;
	ActivateAnalysis = null;
	var deactivateAnalysesHook = DeactivateAnalyses;
	//DeactivateAnalyses = null;
	var deactivateAnalysisHook = DeactivateAnalysis;
	DeactivateAnalysis = null;
	var reactivateAnalysesHook = ReactivateAnalyses;
	//ReactivateAnalyses = null;
	var reactivateAnalysisHook = ReactivateAnalysis;
	ReactivateAnalysis = null;
	var stopActionsHook = StopActions;
	//StopActions = null;
	var stopActionHook = StopAction;
	StopAction = null;
	var takeFixletActionHook = TakeFixletAction;
	TakeFixletAction = null;
	var createCustomSiteHook = CreateCustomSite;
	CreateCustomSite = null;
	var storeVariableHook = StoreVariable;
	StoreVariable = null;
	var deleteVariableHook = DeleteVariable;
	DeleteVariable = null;
	var addGlobalFilterHook = AddGlobalFilter;
	AddGlobalFilter = null;
	var clearAllGlobalFiltersHook = ClearAllGlobalFilters;
	ClearAllGlobalFilters = null;
	var clearGlobalFilterOfTypeHook = ClearGlobalFilterOfType;
	ClearGlobalFilterOfType = null;
	var getCurrentDSNHook = GetCurrentDSN;
	GetCurrentDSN = null;
	var getCurrentUserHook = GetCurrentUser;
	GetCurrentUser = null;
	var sendWakeOnLANRequestHook = SendWakeOnLANRequest;
	SendWakeOnLANRequest = null;
	var enableWakeOnLANHook = EnableWakeOnLAN;
	EnableWakeOnLAN = null;
	var loadPresentationHook = LoadPresentation;
	LoadPresentation = null;

	var takeSecureFixletActionHook;
	var registerRelevanceHook;
	var addFileToSiteHook;
	var addFileToMailboxHook;
	
	try {
		// since Gilman
		takeSecureFixletActionHook = TakeSecureFixletAction;
		// TakeSecureFixletAction = null;
		registerRelevanceHook = RegisterRelevance;
		RegisterRelevance = null;	
		addFileToSiteHook = AddFileToSite;
		AddFileToSite = null;
		addFileToMailboxHook = AddFileToMailbox;
		AddFileToMailbox = null;
	} catch(e) {}
}



/**
 * @namespace 
 * @name tem.config
 * @description This namespace contains fields and methods related to the configuration of an individual dashboard/wizard 
 * application. For example there are methods related to setting the logging level for an application as well 
 * as defining the set of sites that will be referenced across content and relevance functions.
 */
tem.config = {};


/** 
 * Defines the array of SiteIdentifier's associated with the dashboard.
 * These SiteIdentifiers provide a way to define in a single array the group
 * of sites that a dashboard works with.  Various content related functions use tem.config.getSite
 * to access the SiteIdentifiers specified.  
 * 
 * <p><b>The first site in the array is considered the "default".</b></p>
 * 
 * <pre>
 * tem.config.sites = [new tem.model.SiteIdentifier('BES_SPRT','BES Support')];
 * </pre>	
 * 
 */
tem.config.sites = [];


/**
 * @namespace 
 * @name tem.logging
 * @description This namespace contains utility functions used for logging.
 */
tem.logging = {};

/**
 * By default this function is a noop.  Specify a custom logger for logging debug level information
 * in the API itself.  Care should be taken to make sure this function only gets executed when
 * {@link tem.config.logLevel} is set to tem.config.DEBUG.
 * 
 * @static
 * 
 * @param {String} errorString
 */
tem.logging.debug = function(errorString) {};


/**
 * By default this function is a noop.  Specify a custom logger for logging error level information
 * in the API itself.
 * 
 * @static
 * 
 * @param {String} errorString
 */
tem.logging.error = function(errorString) {};

var tab = "--- ";




(function() {

	var sitesMap = {};		
			
	var getSiteFromKey = function(siteKey) {

		var i;

		if(sitesMap[siteKey] !== null && sitesMap[siteKey] != undefined) {
			return sitesMap[siteKey];
		}
	
		for(i=0; i< tem.config.sites.length; i++) {
			sitesMap[tem.config.sites[0].key] = tem.config.sites[i].siteKey;
	
			if(tem.config.sites[i].key === siteKey) {
				return tem.config.sites[i];
			}
		}
		
		tem.logging.error('No matching SiteIdentifier was found in tem.config.sites, siteKey: ' + siteKey );
		throw new Error(temui.l10n.adfapi.errorDetermineSiteInformation);
	};
	
	var getDefaultSite = function() {
		return tem.config.sites[0];
	};
	
	/**
	 * Used to get site information from the sites defined in tem.config.sites.
	 * 
	 * 
	 * @param {String} [siteKey] If specified, will use this key to determine what SiteIdentifier to return, if no 
	 * key is specified it will return the default SiteIdentifier
	 * 
	 * @return {tem.model.SiteIdentifier}
	 */
	tem.config.getSite = function(siteKey) {
		if(tem.config.sites.length <= 0) {
			tem.logging.error('No SiteIdentifiers have been specified for tem.config.sites.');
			throw new Error(temui.l10n.adfapi.errorDetermineSiteInformation);
		}
		
		if(siteKey) {
			return getSiteFromKey(siteKey);
		}
		
		return getDefaultSite();
	};

})();

/**
 * Constant representing error logging level.
 * 
 * @constant
 */
tem.config.ERROR = 8;

/**
 * Constant representing debug logging level.
 * 
 * @constant
 */
tem.config.DEBUG = 2;

/**
 * Constant representing name of user's logging level preference.
 * 
 * @constant
 */
tem.config.loggingLevelPreference = 'tem.loggingLevelPref';


if (inConsoleContextCheck) {
	/** 
	 * Defines the log level for the dashboard.
	 */
	var dashboardID = relevanceHook('dashboard id of current wizard');

	try {
		tem.config.logLevel = relevanceHook('concatenation of unique values of private variables "' + tem.config.loggingLevelPreference + '" of bes wizards whose(dashboard id of it = "' + dashboardID + '")');
		if(tem.config.logLevel == "") {
			tem.config.logLevel = tem.config.ERROR;
		}
	} catch(e) {
		tem.config.logLevel = tem.config.ERROR;
	}
}else{
	tem.config.logLevel = tem.config.ERROR;
}


/** 
 * Used to determine whether the logging level
 * is set to DEBUG or lower.
 * 
 * @return {Boolean}
 */
tem.config.isDebug = function () {
	return tem.config.logLevel <= tem.config.DEBUG;
};


/** 
 * Used to determine whether the logging level
 * is set to ERROR or lower.
 * 
 * @return {Boolean}
 */
tem.config.isError = function() {
	return tem.config.logLevel <= tem.config.ERROR;
};



/**
 * @namespace 
 * @name tem.javascriptUtils
 * @description General JavaScript utility functions available for any dashboard development.
 *
 */
tem.javascriptUtils = {};


	/**
	 * Returns a new class instance based on class name. <b>Assumes a no args constructor</b>.
	 *
	 * @param constructorClassName {String} The name of the JavaScript class you want to create an instance of.
	 * @return {Object} Returns a new class instance.
	 */
	tem.javascriptUtils.classFactory = function(constructorClassName) {
		if(constructorClassName.indexOf('.') != -1) {
			var namespaces = constructorClassName.split(".");
			var windowItem = window;	
			for(var i=0; i< namespaces.length; i++) {
				windowItem = windowItem[namespaces[i]]
			}
				
			return new windowItem;			
		}
		
		return new window[constructorClassName]();
	};

	/**
	 * Convenience function for determining if a JavaScript object is of type Array.
	 *
	 * @param JSObject {Object} The object you want to check the type of.
	 * @return {Boolean} True if JSObject is of type Array.
	 */
	tem.javascriptUtils.isArray = function(JSObject) {
		return Object.prototype.toString.call(JSObject) === '[object Array]';
	};



	/**
	 * Similar to dojo's <a href="http://docs.dojocampus.org/dojo/hitch">hitch</a> function.
	 *
	 * @param objToBindTo {Object} The object that defines the calling scope.
	 * @param functionToBind {Function}
	 * @return {Function} Function that appropriately wraps functionToBind in the scope of
	 * objToBindTo.
	 */
	tem.javascriptUtils.bind = function(objToBindTo, functionToBind) {
		var boundFunction = function() {functionToBind.apply(objToBindTo,arguments);};
		return(boundFunction);
	};


	var __uuid = 0;

	/**
	 * Generates a unique ID
	 *
	 * @return {String}
	 */
	tem.javascriptUtils.uniqueID = function() {
		var time = new Date().getTime();
		return "uuid-"+time+(__uuid++);
	};


	/**
	 * Removes an element from an array
	 *
	 * @return {Boolean} Return false if the searching element is not found in the array.
	 */
	tem.javascriptUtils.arrayRemoveElement = function(elm, array) {
		var i = array.length;
		while(i--){
			if(array[i] === elm){
				array.splice(i, 1);
				return true;
			}
		}
		return false;
	};


	
/**
 * @namespace 
 * @name tem.relevance
 * @description Utility functions for making/working with Relevance calls.
 */
tem.relevance = {};



/**
 * <p>Used to evaluate session relevance.</p>
 * 
 * <p>Aliased as {@link tem.evalRel}</p>
 * 
 * <p><b>Note: Asynchronous relevance calls do not work in pre 8.1 Web Reports.</b></p>
 * 
 * <p>Sample Usage:</p>
 * 
 * <pre>
 * //Callback (asynchronous) and use tem.relevance.defaultErrorHandler
 * var onSuccessHandler = function(results) {
 *   alert(results);
 * }
 * tem.evalRel('now', {success:onSuccessHandler});	
 * </pre>
 * 
 * <pre>
 * //Callback (asynchronous) with a custom error handler
 * var onSuccessHandler = function(results) {
 *   alert(results);
 * }
 * var onErrorHandler = function (relevance, error) {
 *   alert('Error: ' + error.message + '    Relevance string: ' + relevance);
 * }
 * var results = tem.evalRel('nowa', {success:onSuccessHandler, failure:onErrorHandler});
 * </pre>
 *
 * <pre>
 * //No callback (synchronous call) and use tem.relevance.defaultErrorHandler
 * var results = tem.evalRel('now');
 * </pre>
 *
 * <pre>
 * //No callback (synchronous) with a custom error handler
 * 
 * var onErrorHandler = function (relevance, error) {
 *   alert('Error: ' + error.message + '    Relevance string: ' + relevance);
 * }
 * var results = tem.evalRel('nowa', null, onErrorHandler);
 * </pre>
 * 
 * 
 * <p>It is <b>recommended that you generally call this function with asynchronous callbacks</b> as if run 
 * asynchronously it will execute the relevance call in a separate thread than the UI runs in.</p>
 * 
 * <p>For plural properties this function returns a custom JavaScript type (RelevanceResult) that offers significant
 * performance benefits, in particular with regards to sorting.  RelevanceResult supports the
 * following properties/methods:</p>
 * 
 * <ul>
 * <li>length: Same as Array.length</li>
 * <li>[]: Index operation, like array, but read only (assignment to elements is not 
 * supported). The result is the appropriate native JS type, or for tuples, a 
 * native array.</li>
 * <li>sort(): Like Array.sort(). Tuples are compared lexicographically.</li>
 * <li>sort(fn): where fn is a function: Like Array.sort(fn). The arguments passed to 
 * fn will be appropriate native JS types.</li>
 * <li>sort(i): Sort by the i'th tuple item. If that item is itself a tuple, a 
 * lexicographical comparison is used.</li>
 * <li>sort(i, fn): Sort by the i'th tuple item using the given comparison function, 
 * which will be passed two arguments of the appropriate native JS types.</li>
 * <li>toArray(): copy the result to a native JS array.</li>
 * </ul>
 * 
 * @param {String} relevance  Relevance to execute
 * @param {Object} callbackObj If specified the call is made asynchronously. An object with a "success" 
 * property that defines a success callback which gets passed results when called and an optional "failure" 
 * property for a failure callback which gets passed the relevance string and error when called.
 * If no failure property is defined, then tem.relevance.defaultErrorHandler will get called.
 * @param {Boolean} [customSynchronousErrorHandler=null] For synchronous calls this handler will be used instead
 * of tem.relevance.defaultErrorHandler.
 * @return {null|Object} If asynchronous, it returns null, otherwise it returns RelevanceResult for 
 * plural results or a typed result (i.e. String, Number) for singular results.
 */
tem.relevance.evaluate = function(relevance, callbackObj, customSynchronousErrorHandler) {

	if(callbackObj !== undefined && callbackObj !== null) {

		// wrapp error handlers so the can show relevance string in error
		if(callbackObj.failure !== undefined && callbackObj.failure !== null) {
			callbackObj.failure = tem.relevance.errorWrapper(relevance, callbackObj.failure);
		} else {
			callbackObj.failure = tem.relevance.errorWrapper(relevance, tem.relevance.defaultErrorHandler);
		}

		if(tem.config.isDebug()) {
			var onErrorHandler = callbackObj.failure;
			var onSuccess = callbackObj.success;
			
			var errorHandlerInfo = onErrorHandler===undefined || onErrorHandler===null?"":onErrorHandler.toString().substring(0,35) + "...";
			var onSuccessInfo = onSuccess===undefined || onSuccess===null?"":onSuccess.toString().substring(0,35) + "...";

			tem.logging.debug('Relevance call (START): ' + relevance);
			tem.logging.debug('     callbackObj (success): ' + onSuccessInfo);		
			tem.logging.debug('     callbackObj (failure): ' + errorHandlerInfo);			
		}
		
		relevanceHook(relevance, callbackObj);

		return;
		
	} else {
		var results;
		
		if (tem.config.isDebug()) {
			tem.logging.debug('Relevance call (START): ' + relevance);
		}

		var errorHandler;	
		if(customSynchronousErrorHandler) {
			errorHandler = customSynchronousErrorHandler;
		} else {
			errorHandler = tem.relevance.defaultErrorHandler;
		}
		
		try {
			results = relevanceHook(relevance);
		} catch (e2) {
			if(errorHandler !== undefined && errorHandler !== null) {
				errorHandler(relevance, e2);
			}
		}	
		
		return results;
	} 

};



/**
 * Alias of {@link tem.relevance.evaluate}
 * @function
 * @static
 */
tem.evalRel = tem.relevance.evaluate;


/**
 * Used to make sure the relevance error handler gets called with relevance var in its scope.
 * (to keep reference to original relevance string).
 *
 * @ignore
 */
tem.relevance.errorWrapper = function(relevance, customErrorHandler) {
	if(customErrorHandler !== undefined && customErrorHandler != null) {
		return function(errorMessage){
			customErrorHandler(relevance, new Error(errorMessage));
		};
	}
	
	return function(errorMessage){
		tem.relevance.defaultErrorHandler(relevance, new Error(errorMessage));
	};
};


/**
 * Default error handler for all relevance calls, unless overridden/disabled in the relevance
 * call itself. It gets passed a relevance string and an Error object.
 * 
 * <p>It can be customized, by default it logs an error if tem.config.isError is true
 * and rethrows the error:</p>
 * 
 * <pre>
 * tem.relevance.defaultErrorHandler = function(relevance, error){
 *	if (tem.config.isError) {
 *		tem.logging.error('Error evaluating relevance: ' + error.message);
 *		tem.logging.error('     relevance: ' + relevance);
 *	}
 *	
 *	// rethrow error
 *	throw error;
 * }
 * </pre>
 * 
 * @field
 */
tem.relevance.defaultErrorHandler = function(relevance, error){
	if (tem.config.isError()) {
		tem.logging.error('Error evaluating relevance: ' + error.message);
		tem.logging.error('     relevance: ' + relevance);
	}
	
	// rethrow error
	throw error;
};



/**
 * <b>Not available in Web Reports</b>  
 * Returns an HTML formatted colorized version of a relevance string. When initially called, it 
 * dynamically adds necessary CSS.
 * 
 * @param {String} relevance String of relevance (session or client) that you want to have formatted
 * @param {Boolean} indent Flag that indicates whether you want to include indent formatting.
 * @return {String} HTML formatted string 
 */
tem.relevance.colorizeRelevance = function(relevance, indent) {
	return colorizeRelevanceHook(relevance, indent);
};


/**
 * @namespace 
 * @name tem.relevance.queries
 * @description Contains wrappers for generic Relevance queries.
 */
tem.relevance.queries = {};


/**
 * @namespace 
 * @name tem.relevance.queries.computers
 * @description Generic relevance queries related to computers
 */

tem.relevance.queries.computers = {};
	/**
	 * Returns relevance query to return a set of ids for all computers that belong to 
	 * a specific computer group.
	 * 
	 * @param groupId {Number}
	 * @returns {String} 
	 */
	tem.relevance.queries.computers.getComputersByComputerGroupId = function(groupId){
		var rel = 'ids of elements of member set of bes computer groups whose(id of it = ' + groupId+ ' )';

		return rel;
	};


	/**
 	 * <b>Recommended for 8.2+ dashboards.</b> This class makes extensive use of the sort() method of the 
 	 * RelevanceResult type returned by tem.evalRel() which has a memory leak which was fixed in 8.2. Consequently
 	 * the class will work in pre 8.2 but can run into significant memory issues with large data sets. 
	 * 
	 * <p>A wrapper for working with RelevanceResult custom JS type returned by tem.evalRel(), in particular
	 * used for working with its sort in a performant manner.</p>
	 * 
	 * @class tem.relevance.RelevanceData
	 */ 
	tem.relevance.RelevanceData = function(relevance) {
	
		var data = null;
		var dataCopy = null;
		this.sortIndex;	
		this.currData = null;
		
		/**
		 * Initiates the loading of data.
		 * 
		 * @memberOf tem.relevance.RelevanceData
		 * @param {String} relevance  The full relevance query used to get the results for datastore, i.e.
		 * 				var relevanceStr = '(id of it,name of it,name of site of it) of bes fixlets';
		 */ 	
		this.load = function(relevance) {
			tem.evalRel(relevance, {success:tem.javascriptUtils.bind(this, this.finishLoad)});
		};
 	
	
		/**
		 * @memberOf tem.relevance.RelevanceData
		 */
		this.finishLoad = function(results) {
			data = results;
			this.currData = data;
			this.onChange(this);
		}
	
		/**
		 * Does single index sorting on flat RelevanceResults tuples.
		 * 
		 * @memberOf tem.relevance.RelevanceData
		 * @param {Number} selectedSortIndex  
		 * @param {Boolean} isAsc
		 * 
		 */ 
		this.sort = function(selectedSortIndex, isAsc) {	
			
			// This function takes into account the following issues related to the RelevanceResult type
			// that comes back from tem.evalRel:
			// 
			// 1) Indexed sorts are extremely fast, even faster than sorting on the RelevanceResult type with a function
			// 2) There is no way to do a reverse indexed sort and no way to reverse the RelevanceResult type, 
			// however calling.reverse() on a plain JS array is extremely fast. 
			
	  		if(selectedSortIndex == null) {
				return;
			}

			var isSortingNewOrDifferentCol = this.sortIndex != selectedSortIndex;
	
			if(isSortingNewOrDifferentCol){
				this.sortIndex = selectedSortIndex;
				dataCopy = null;
				
				if(isAsc == false) {
					data.sort(this.sortIndex );
					dataCopy = data.toArray();
					dataCopy.reverse();
				}
				
			} else {
				var isFirstDescSort = isAsc == false && dataCopy == null;
				if(isFirstDescSort) {
					dataCopy = data.toArray();
					dataCopy.reverse();
				}
			}
	
			if(isAsc == true) {
				data.sort(this.sortIndex);
				this.currData = data;
			} else {
				this.currData = dataCopy;	
			}	
		}
		
		/**
		 * Callback that gets called whenever data is changed via a load.  The callback gets
		 * passed the RelevanceData object
		 * @memberOf tem.relevance.RelevanceData
		 */ 		
		this.onChange = function(dataObject) {}
	}


	/**
	 * <b>Added in IEM 9.0 (Gilman)</b><br/>
	 * <b>Not available in Web Reports</b>
	 * <p>Registers a relevance query and a callback object (which contains a success function and a failure function)
	 * and a unique id such that the query and appropriate callback will run whenever the Dashboard Datastore
	 * (and other stores noted below) change. All subsequent calls to tem.relevance.registerRelevance using
	 * the same value for id will overwrite the original callback and relevance query.</p>
	 *
	 * <p>Currently, the only way to un-register the callback is to call tem.relevance.registerRelevance with the
	 * same id and a relevance query of 'false'.<p>
	 * <p>Sample Usage:</p>
	 * 
	 * <pre>
	 * tem.relevance.registerRelevance('private variables test of current wizard',
	 * 	{	success:function(results){alert(results.length)},
	 * 		failure:function(errorStr){alert(errorStr)}
	 * 	},
	 * 	"uniqueID1"
	 *	);
	 * </pre>
	 * 
	 *	<p><span style="font-weight:bold;">Note:</span>The registered relevance query and callback get fired
	 *	when ANY of the following gets updated:
	 *	<ul>
	 *		<li>ActionStore</li>
	 *		<li>ActionResultStore</li>
	 *		<li>AnalysisStore</li>
	 *		<li>CommentsStore</li>
	 *		<li>ComputerDataStore</li>
	 *		<li>ComputerGroupStore</li>
	 *		<li>DashboardDataStore</li>
	 *		<li>EffectivePermissionStore</li>
	 *		<li>FixletStore</li>
	 *		<li>FixletResultStore</li>
	 *		<li>FixletVisibilityStore</li>
	 *		<li>NamedFilterStore</li>
	 *		<li>RetrievedPropertyStore</li>
	 *		<li>PropertyResultStore</li>
	 *		<li>SiteStore</li>
	 *		<li>UnmanagedAssetStore</li>
	 *		<li>UserStore</li>
	 *		<li>UserRoleStore</li>
	 *		<li>LDAPDirectoryStore</li>
	 *	</ul>
	 *	</p>
	 *	
	 * @param {String} relevance Relevance query you want to register.
	 * @param {Object} callbackObj Defines a "success" and "failure" callback.  Success gets passed results, failure
	 * gets passed an error string.
	 * @param {String} id Unique identifier with which to register you query and callbacs.  <span style="font-weight:bold;">This
	 * parameter is likely to be removed in future version.</span>
	 */
	tem.relevance.registerRelevance = function(relevance, callbackObj, id) {
		if (parseInt((tem.context.getVersion().split("."))[0]) < 9) {
			throw new Error(temui.l10n.adfapi.consoleVersion9Required);
			tem.logging.error("tem.relevance.registerRelevance() requires BES 9+");
			return;
		}
		
		registerRelevanceHook(relevance, callbackObj, id);
	}



/**
 * @namespace 
 * @name tem.shell
 * @description Contains utility functions for executing Windows shell scripts from a dashboard or wizard.
 * 
 */
tem.shell = {};


/**
 * @class <b>Not available in Web Reports</b> Wrapper for the ActiveX 
 * <a href="http://msdn.microsoft.com/en-us/library/aew9yb99%28v=vs.85%29.aspx" target="_blank">WScript.shell</a>
 * object, used to run Windows shell scripts.
 * 
 * <p>There are two main methods used for running external programs: <b>Run</b> and <b>Exec</b>.  Run provides a simpler
 * interface and takes a parameter that will hide the shell window.  Exec allows for access to StdIn/StdOut and StdErr
 * and a more sophisticated means to monitor the running process, but doesn't allow a straightforward way to hide the 
 * shell window outside of using a .bat script.</p>
 * 
 *
 * 
 */
tem.shell.ShellWrapper = function() {
	var	wshShell = new ActiveXObject('WScript.shell');
	return wshShell;
};

/**
 * @class <b>Not available in Web Reports</b> Convenience wrapper class for calling exec on an ActiveX  
 * <a href="http://msdn.microsoft.com/en-us/library/aew9yb99%28v=vs.85%29.aspx" target="_blank">WScript.shell</a>
 * object.
 * 
 * @param {String} path
 * @param {Function} stdOutCallback Gets called and passed each individual line of StdOut
 * @param {Function} stdErrCallback Gets called and passed each individual line of StdErr
 */
tem.shell.SimpleExec = function(path, stdOutCallback, stdErrCallback) {
	var	wshShell = new ActiveXObject('WScript.shell');

	this.exec = null;

	this.init = function() {
		this.exec	= wshShell.exec(path);
		while(this.exec.Status === 0) {
			this.exec.Terminate();
			 while(!this.exec.StdOut.AtEndOfStream) {
				  stdOutCallback(this.exec.StdOut.ReadLine());
			 }
			 while(!this.exec.StdErr.AtEndOfStream) {
				  stdErrCallback(this.exec.StdErr.ReadLine());
			 }
		}
	};
	
			
	/**
	* From MS Docs:
	*
	* <p>The Terminate method does not return a value. 
	* Use the Terminate method only as a last resort since some applications do not clean up properly. 
	* As a general rule, let the process run its course and end on its own. 
	* The Terminate method attempts to end a process using the WM_CLOSE message. 
	* If that does not work, it kills the process immediately without going through the normal shutdown procedure.
	* </p>
	*
	*/
	this.terminate = function () {
		this.exec.Terminate();
	};
};
	


/**
 * @namespace 
 * @name library
 * @memberOf tem
 * @description Module containing classes that provide ways to install library files (in particular library files with
 * a nested folder file structure as nested folders in sites are not supported).
 */
tem.library = {};

var currentSite;

	/**
	 * @class <b>Not available in Web Reports</b> General class used to to install library files. 
	 * By default it installs into the folder defined by the user's
	 * environment variable 'TEMP'.  The files are placed in the TEMP folder under:
	 * 
	 * <p>(site name with spaces replace by underscores when propagated as part of site)(dashboard id with '.ojo' stripped off)/libraryName/libraryVersion</p>
	 * 
	 * <p>It requires a zip of the library files and an executable for unzipping the files.</p>
	 * 
	 * <p>If an existing library exists with the same name and version, then it aborts the install.  If any files are located
	 * under the same libraryName but a different libraryVersion (basically a different version of the same library exists),
	 * then <b>those files are deleted</b>.</p>
	 * 
	 * @param {String} libraryName Used to uniquely create and locate the library file in the common temp folder.
	 * @param {String} libraryVersion Used to uniquely create and locate the library file within a specific library in the common temp folder.
	 * @param {String} libraryZipName Name of zip file included in site that contains library files.
	 * @param {String} [zipExecutableName=BFArchive.exe] Name of zip executable included in site used to unzip the contents.
	 * 
	 */
	tem.library.Library= function(libraryName, libraryVersion, libraryZipName, zipExecutableName) {
	
		if(zipExecutableName === undefined) {
			zipExecutableName = 'BFArchive.exe';
		}
	
		var shellWrapper;
		
		
		this.getShellWrapper = function() {
			if(shellWrapper == undefined) {
				shellWrapper = new tem.shell.ShellWrapper();
			}
			return shellWrapper;
		}
	
		/**
		 * Returns full line of command that gets passed to shell.
		 * 
		 * @return {String}
		 */
		this.getShellCommand = function() {
			var libraryPath = this.getLibraryPath();
			return '"' + tem.context.getBaseDirectory() + '/' + zipExecutableName 
				+ '" -x "' + tem.context.getBaseDirectory() + '/' + libraryZipName + '" "' 
				+ libraryPath + '"';
		};
	
		/**
		 * Returns full path to library files.
		 * 
		 * @return {String}
		 */
		this.getLibraryPath = function() {
			var tempPath = this.getShellWrapper().ExpandEnvironmentStrings("%TEMP%");
			
			if(currentSite === undefined) {
				try{
					currentSite = tem.evalRel('name of current bes site');
					currentSite = currentSite.replace(/\s+/g, "_");
					currentSite += "_";
				}catch(e) {
					currentSite = '';
				}
			}
	
			var dashId = tem.evalRel('dashboard id of current wizard');
			var dashOjoName = currentSite + (dashId.split('.')[0]);
		
			var libraryPath = tempPath + '\\tem\\' + dashOjoName + '\\' + libraryName + '\\' + libraryVersion;
	
			return libraryPath;
		};
	
	
		/**
		 * Execute the unzip command to install the library files. This gets called internally 
		 * by the install method.
		 * 
		 * @return {Boolean} true if successful
		 */
		this.executeInstallCommand = function() {
			var shellCommand = this.getShellCommand();
			
			var status;
			
			try {
				status = this.getShellWrapper().Run(shellCommand, 0, true);
			} catch (e) {
				throw new Error('Error in executeInstallCommand : ' + e.message + '   command: ' + shellCommand );
			}
			
			if (status !== 0) {
				throw new Error('Error in executeInstallCommand, command: ' + shellCommand );
			}
			
			return true;
		};
	
		/**
		 * Initiate installation of the library files.
		 * 
		 * <p>If an existing library exists with the same name and version, then it aborts the install.  If any files are located
		 * under the same libraryName but a different libraryVersion (basically a different version of the same library exists),
		 * then <b>those files are deleted</b>.</p> 
		 * 
		 * @return {Boolean} true if successful
		 */
		this.install = function(){
			var i;
			var libraryPath = this.getLibraryPath();
			var fso = tem.file.FileSystem;
	
			var isAlreadyInstalled = false;
			
			if(fso.getActiveXObject().FolderExists(libraryPath)){
				var libFolder = fso.getActiveXObject().GetFolder(libraryPath);
				isAlreadyInstalled = libFolder.Size > 0;
			}
			
			if(isAlreadyInstalled) {
				return;
			}
				
			// delete previously installed versions	
			var paths = libraryPath.split('\\');
			// start at level of library name
			paths.pop();
			var libRootFolderPath = paths.join('\\');
			
			if (fso.getActiveXObject().FolderExists(libRootFolderPath)) {
				var rootFolder = fso.getActiveXObject().GetFolder(libRootFolderPath);
				var olderVersions = new Enumerator(rootFolder.SubFolders);
				
				for (; !olderVersions.atEnd(); olderVersions.moveNext()) {
					olderVersions.item().Delete(true);
				}
			}
			
			// make sure all folders on path exist
			paths = libraryPath.split('\\');
			libraryPath = paths[0];
			for (i = 1; i < paths.length; i++) {
				libraryPath += "\\" + paths[i];
				
				if (!fso.getActiveXObject().FolderExists(libraryPath)) {
					fso.getActiveXObject().CreateFolder(libraryPath);
				}
			}
			if(tem.config.isDebug()) {
				tem.logging.debug('About to install library: ' + libraryPath);
			}
			
			if(this.executeInstallCommand()) {
				return true;
			}
			return false;
		};
	};

	/**
	 * @class <b>Not available in Web Reports</b> Provides additional functionality beyond {@link tem.library.Library} 
	 * for working with JS libraries (i.e. Dojo).
	 * 
	 * @augments tem.library.Library
	 */
	tem.library.JavaScriptLibrary = function(libraryName, libraryVersion, libraryZipName, zipExecutableName){
		tem.library.Library.call(this, libraryName, libraryVersion, libraryZipName, zipExecutableName);
	};
	
	tem.library.JavaScriptLibrary.prototype = new tem.library.Library();

	/**
	 * Used to load a library's JavaScript file into a dashboard via dynamically 
	 * adding a script tag.
	 * 
	 * <pre>
	 * var dojoLibrary= new tem.library.JavaScriptLibrary('dojoWTED', 'dojo1.5_TED1.1', 'dojoWTED.besarchive');
	 * dojoLibrary.loadJavaScript("dojo/dojo.js.uncompressed.js");
	 * </pre>
	 * 
	 * @param {String} filePath
	 */
	tem.library.JavaScriptLibrary.prototype.loadJavaScript = function(filePath) {	
		var scriptObj = document.createElement('script');
		scriptObj.setAttribute("type","text/javascript");
		var libraryPath = this.getLibraryPath();
		scriptObj.setAttribute("src", libraryPath + "/" + filePath);
		document.getElementsByTagName('HEAD').item(0).appendChild(scriptObj);	
	};


	/**
	 * Used to load a library's CSS file into a dashboard via dynamically 
	 * adding a link tag.
	 * 
	 * <pre>
	 * var dojoLibrary= new tem.library.JavaScriptLibrary('dojoWTED', 'dojo1.5_TED1.1', 'dojoWTED.besarchive');
	 * dojoLibrary.loadCSS("dojo/resources/dojo.css");
	 * </pre>
	 * 
	 * @param {String} filePath
	 */
	tem.library.JavaScriptLibrary.prototype.loadCSS = function(filePath){
		var linkObj = document.createElement('link');
		var libraryPath = this.getLibraryPath();
		linkObj.type = "text/css";
    	linkObj.rel = "stylesheet";
		linkObj.href = libraryPath + "/" + filePath;
		
		document.getElementsByTagName('HEAD').item(0).appendChild(linkObj);
	};



/**
 * @namespace 
 * @name tem.file
 * @description Contains functions that provide interaction with the file system.
 */
tem.file =  {};


	/**
	 * <b>Not available in Web Reports</b> Pops up a "Browse" dialog that allows the user to select a file.
	 * 
	 * <p><b>NOTE:</b> For more information about this function, refer to the documentation for the
	 * Microsoft class, <a href="http://msdn.microsoft.com/en-us/library/wh5hz49d%28vs.71%29.aspx">CFileDialog.</a></p>
	 * 
	 * @param {String} extension (optional, defaults to "*.*")
	 * @param {String} filters (optional, defaults to  "All Files (*.*)||")
	 * @param {String} initialPath 
	 * @return {String} Upon selection of a file, the function returns its path. If empty, the user clicked the cancel button.
	 */
	tem.file.browseForFile = function(extension, filters, initialPath)  {
		return browseForFileHook(extension, filters, initialPath);
	};

	/**
	 * <b>Not available in Web Reports</b> Pops up a "Browse" dialog that allows the user to select a folder.
	 * 
	 * @return {String} Upon selection of a folder, the function returns its path. If empty, the user clicked the cancel button.
	 */
	tem.file.browseForFolder = function () {
		return BrowseForFolder();
	};
	
	/**
	 * <b>Not available in Web Reports</b> This function allows specification of many of the flags which can be used to customize the behavior of the CFileDialog class. 
	 * For details on these flags refer to the Microsoft documentation: 
	 * <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/vclib/html/_mfc_cfiledialog.3a3a.cfiledialog.asp">CFileDialog</a> 
	 * and <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/winui/winui/windowsuserinterface/userinput/commondialogboxlibrary/commondialogboxreference/commondialogboxstructures/openfilename.asp">OpenFileName Structure</a> 
	 * 
	 * @param {String} extension
	 * @param {String} filters
	 * @param {Boolean} forFolderFlag
	 * @param {String} initialPath
	 * @param {Boolean} fileMustExistFlag
	 * @param {Boolean} pathMustExistFlag
	 * @param {Boolean} noValidateFlag
	 * @param {Boolean} hideReadOnlyFlag
	 * @param {Boolean} overwritePromptFlag
	 * @param {Boolean} createPromptFlag
	 * @param {Boolean} noReadOnlyReturnFlag
	 * @param {Boolean} noTestFileCreateFlag
	 * @param {Boolean} allowMultiSelectFlag
	 */
	tem.file.doBrowseDialogWithFlags = function( extension, filters, forFolderFlag, initialPath, fileMustExistFlag, pathMustExistFlag, noValidateFlag, hideReadOnlyFlag, overwritePromptFlag, createPromptFlag, noReadOnlyReturnFlag, noTestFileCreateFlag, allowMultiSelectFlag) {
		return doBrowseDialogWithFlagsHook( extension, filters, forFolderFlag, initialPath, fileMustExistFlag, pathMustExistFlag, noValidateFlag, hideReadOnlyFlag, overwritePromptFlag, createPromptFlag, noReadOnlyReturnFlag, noTestFileCreateFlag, allowMultiSelectFlag);
	};




/**
 * @namespace 
 */
tem.file.upload = {};



	/**
	 * <b>Not available in Web Reports</b> This function creates a BES Archive file which contains the files in 
	 * the directory given by the inputPath. 
	 * If the recurseFlag is true then it includes all of the subdirectories of the inputPath as well as the files. 
	 * The archive file is created at the given sub-path of the ScratchRoot folder. If the file does not exist it is 
	 * created, and if it already exists it will be overwritten. 
	 * 
	 * @param {String} inputPath
	 * @param {String} scratchPath
	 * @param {Boolean} recurseFlag
	 */
	tem.file.upload.makeArchive = function(inputPath, scratchPath, recurseFlag) {
		return makeArchiveHook(inputPath, scratchPath, recurseFlag);
	};


	/**
	 * <b>Not available in Web Reports</b> The contents of the file at the given location will be posted 
	 * to the BES Server using the PostFile cgi. 
	 * If successful, the function returns the URL which can be used to download the file, otherwise it 
	 * will be a diagnostic error message. Note that error messages always begin with "Error: " so you can 
	 * use that to test for an error condition. While the upload is in progress a dialog box will be displayed 
	 * showing the status of the operation and allowing the user to cancel it. 
	 * 
	 * 
	 * @param {String} inputPath 
	 */
	tem.file.upload.uploadFile = function(inputPath) {
		return uploadFileHook(inputPath);
	};


	/**
	 * <b>Not available in Web Reports</b> 
	 * Allows you to archive a file or folder, writing it to disk, and then upload it. 
	 * Streams data directly through ArchiveWriter into an HTTP request.
	 * 
	 * <pre>
	 *  var result = tem.file.upload.archiveAndUploadFile(inputPath, outputPath, recurseFlag);
	 *  var uploadInfo = result.split("\t");
	 *  var url = uploadInfo[0];
	 *  var size = uploadInfo[1];
	 *  var sha1 = uploadInfo[2];
	 * </pre> 
	 * 
	 * @param {String} inputPath  The path of the file or folder to be compressed and uploaded
	 * @param {String} outputPath The name that the archive will be given upon being received by the Root Server
	 * @param {Boolean} recurseFlag If true, will cause the archiver to add all subfolders to the archive (if the inputPath is a folder). 
	 * Otherwise, the archive will contain only the input folder's contents, and not the contents of any subfolders.
	 * @return {String} Tab-delimited string containing (in order) the upload URL, the compressed upload size, 
	 * and the upload's SHA1.
	 */
	tem.file.upload.archiveAndUploadFile = function(inputPath, outputPath, recurseFlag) {
		return archiveAndUploadFileHook(inputPath, outputPath, recurseFlag);
	};



	/**
	 * <b>Not available in Web Reports</b> Downloads the given url and writes into the file located at the 
	 * given sub-path of the ScratchRoot folder. 
	 * If the file does not exist, it will be created, and if it does exist it will be overwritten. 
	 * While the download is in progress a dialog box will be displayed showing the status of the operation and 
	 * allowing the user to cancel it. 
	 * 
	 * 
	 * @param {String} url
	 * @param {String} outputPath
	 */
	tem.file.upload.downloadFile = function(url, outputPath) {
		return downloadFileHook(url, outputPath);
	};

	/**
	 * <b>Not available in Web Reports</b> Identical to downloadFile except that it returns the 
	 * SHA1 of the downloaded file on success. 
	 * 
	 * @param {String} url
	 * @param {String} outputPath
	 * @return {String} SHA1 of the downloaded file on success
	 */
	tem.file.upload.downloadFileWithSHA1 = function(url, outputPath) {
		return downloadFileWithSHA1Hook(url, outputPath);
	};


	/**
	 * <b>Not available in Web Reports</b> 
	 * Returns a string containing the sha1 hash of the contents of the given file. 
	 * 
	 * @param {String} inputPath
	 */
	tem.file.upload.getFileSHA1 = function(inputPath) {
		return getFileSHA1Hook(inputPath);
	};

	/**
	 * <b>Not available in Web Reports</b> 
	 * Returns the size of the given file. This function returns a number. 
	 * If an error occurs the return value is -1 and the diagnostic message is stored in "theScratchFileResult.innerHTML". 
	 * 
	 * @param inputPath
	 */
	tem.file.upload.getFileSize = function( inputPath ) {
		return getFileSizeHook( inputPath );
	};





	/**
	 * @namespace 
	 * @description <b>Not available in Web Reports</b> Singleton created on application startup for use with interacting 
	 * with the file system, it is a wrapper for 
	 * <a href="http://msdn.microsoft.com/en-us/library/6kxy1a51%28v=vs.85%29.aspx">ActiveXObject("Scripting.FileSystemObject")</a>.
	 * 
	 * <p>There are two convenience functions provided by this class that are wrappers for functionality provided by FileSystemObject.
	 * There are a number of other methods available with FileSystemObject.  Information regarding these functions can be found
	 * in the documentation for <a href="http://msdn.microsoft.com/en-us/library/6kxy1a51%28v=vs.85%29.aspx">FileSystemObject</a>
	 * </p>
	 * 
	 * 
	 * @memberOf tem.file
	 * @name tem.file.FileSystem
	 */ 
	tem.file.FileSystem= (function() {
		
		var myActiveX_FSO;
	
		return {
			/**
			 * Returns the ActiveXObject("Scripting.FileSystemObject")
			 * instance used internally by this class for its operations.
			 * 
			 * 
			 * @name tem.file.FileSystem.getActiveXObject
			 * @function
			 * 
			 * @returns {ActiveXObject}
			 */
			getActiveXObject:function() {
				if(myActiveX_FSO === undefined || myActiveX_FSO === null) {
					myActiveX_FSO = new ActiveXObject("Scripting.FileSystemObject");
				}
				
				return myActiveX_FSO;
			},
			/**
			 * Determines whether a file exists at specified path.
			 * 
			 * @name tem.file.FileSystem.verifyFileExists
			 * @function
			 * 
			 * @param {String} filePath Absolute path for file to check.
			 * 
			 * @return {Boolean}
			 */
			verifyFileExists:function(filePath) {
					var result = false;
	
					if (this.getActiveXObject().FileExists(filePath)) {
						result = true;
				    }
				    return result;
			},

			/**
			 * Copies files from one directory to another.
			 * @name tem.file.FileSystem.copyFiles
			 * 
			 * @function
			 * @param {String} sourceFolder
			 * @param {String} destinationFolder
			 */		
			copyFiles:function(sourceFolder, destinationFolder) {
				var folder = this.getActiveXObject().getFolder(sourceFolder + '\\' );
				var fileCollection = new Enumerator(folder.Files);
			
				for(;!fileCollection.atEnd(); fileCollection.moveNext()){
					var fileSO = fileCollection.item();
					var dest = destinationFolder + "\\" + fileSO.Name;
					fileSO.Copy(dest);
				}
			}
		};
	})();




	/**
	 * @namespace 
	 * @name tem.file.scratchPad
	 * 
	 * @description
	 * <b>It's recommended that you use {@link tem.file.FileSystem} (where ActiveX use is available) rather than scratchPad functions</b>
	 * for working with the file system as it's not restricted to the Console's temporary "scratchpad" area.
	 * 
	 */
tem.file.scratchPad = {};

	/**
	 * <b>Not available in Web Reports</b> Copies a file from the file system into a sub-path in the 
	 * Console's temporary "scratchpad" area of the file system.
	 * 
	 * @param {String} inputPath
	 * @param {String} scratchPath
	 * @param {Boolean} allowOverwriteFlag If false, then an error will be returned if the file already exists.
	 */
	tem.file.scratchPad.copyFile = function(inputPath, scratchPath, allowOverwriteFlag) {
		return copyFileHook(inputPath, scratchPath, allowOverwriteFlag);
	};

	/**
	 * <b>Not available in Web Reports</b> Copy all of the files contained in the folder specified 
	 * by the inputPath to the sub-folder of the ScratchRoot folder 
	 * specified by scratchPath. The destination folder must exist already. If the recurseFlag is true then all of the 
	 * sub-folders will be copied as well as the files, and new destination sub-folders will be created. If a source file 
	 * or sub-folder already exists in the destination folder, it will cause an error. 
	 * 
	 * @param {String} inputPath
	 * @param {String} scratchPath If true then all of the sub-folders will be copied as well as the files, 
	 * and new destination sub-folders will be created.
	 * @param {Boolean} recurseFlag
	 */
	tem.file.scratchPad.copyFolder = function(inputPath, scratchPath, recurseFlag) {
		return copyFolderHook(inputPath, scratchPath, recurseFlag);
	};

	/**
	 * <b>Not available in Web Reports</b> Delete all the files in the folder located at the given sub-path of the 
	 * ScratchRoot folder. If recurseFlag is true, then 
	 * all the files in all of the sub-directories will also be deleted. Note that this function does not delete any folders. 
	 * 
	 * @param {String} scratchPath
	 * @param {Boolean} recurseFlag If recurseFlag is true, then 
	 * all the files in all of the sub-directories will also be deleted.
	 */
	tem.file.scratchPad.deleteAllFiles = function(scratchPath, recurseFlag) {
		return deleteAllFilesHook(scratchPath, recurseFlag);
	};

	/**
	 * <b>Not available in Web Reports</b> Delete the file located at the given sub-path of the ScratchRoot folder. 
	 * 
	 * @param {String} scratchPath
	 */
	tem.file.scratchPad.deleteFile = function(scratchPath) {
		return deleteFileHook(scratchPath);
	};

	/**
	 * <b>Not available in Web Reports</b> Delete all the files in the folder located at the given sub-path of the 
	 * ScratchRoot folder. If recurseFlag is true, then all 
	 * the files in all of the sub-directories will also be deleted. Note that this function does not delete any folders. 
	 * 
	 * @param {String} scratchPath
	 */
	tem.file.scratchPad.deleteFolder = function(scratchPath) {
		 return deleteFolderHook(scratchPath);
	};

	/**
	 * <b>Not available in Web Reports</b> Delete the folder located at the given sub-path of the ScratchRoot 
	 * folder and all of its contents. 
	 * 
	 * @param {String} scratchPath
	 */
	tem.file.scratchPad.deleteTree = function(scratchPath) {
		return deleteTreeHook(scratchPath);
	};

	/**
	 * <b>Not available in Web Reports</b> Create a folder at the given sub-path of the ScratchRoot folder. 
	 * 
	 * @param {String} scratchPath
	 */
	tem.file.scratchPad.makeFolder = function(scratchPath) {
		return makeFolderHook(scratchPath);
	};

	/**
	 * <b>Not available in Web Reports</b> Move a file from one location under the ScratchRoot folder to another. 
	 * You cannot move files that are located outside the scratch area. 
	 * 
	 * @param {String} scratchPathSrc
	 * @param {String} scratchPathDest
	 * @param {Boolean} allowOverwriteFlag
	 */
	tem.file.scratchPad.moveFile = function(scratchPathSrc, scratchPathDest, allowOverwriteFlag) {
		return moveFileHook(scratchPathSrc, scratchPathDest, allowOverwriteFlag);
	};

	/**
	 * <b>Not available in Web Reports</b> Writes the given string into the file located at the given sub-path 
	 * of the ScratchRoot folder. 
	 * If the appendFlag is false, then the file will be created if it does not exist, and will be over-written if it does exist. 
	 * If the appendFlag is true, then the file must exist, and the text will be appended to the contents of the existing file. 
	 * 
	 * @param {String} text
	 * @param {String} scratchPath
	 * @param {Boolean} appendFlag
	 */
	tem.file.scratchPad.writeFile = function(text, scratchPath, appendFlag) {
		return writeFileHook(text, scratchPath, appendFlag);
	};

	/**
	 * <b>Not available in Web Reports</b> This function returns the path to the temporary folder where all 
	 * "scratch" files are created. 
	 * In the functions below, some of the inputs are a full path, and some are a a sub-path of the 
	 * ScrathRoot folder. If you need to use a ScratchRoot sub-path as the input to one of the functions 
	 * that requires a full path, then you need to prepend the results of this function to the sub-path.
	 * 
	 */
	tem.file.scratchPad.getScratchRootPath = function() {
		return GetScratchRootPath();
	};




/**
 * @namespace 
 * @name tem.content
 * @description Contains functions for creating, editing, and deleting content (fixlets/tasks/analyses/baselines/computergroups) 
 * as well as triggering certain content functionality and opening content and computer document windows.
 * 
 */
tem.content = {};


	/**
	 * Opens document window for an action.
	 * 
	 * @param {Number} actionID
	 */
	tem.content.openAction = function(actionID) {
		var href;
		try{
			href = tem.evalRel('link href of bes actions whose (id of it as string = "' + actionID + '")');
		}catch(e){
			throw new Error('Problem opening document for action ID "' + actionID + '": ' + e.description);
		}
	
		tem.consoleUtils.openLink(href);
	};
	
	
	/**
	 *  Opens document window for a fixlet.
	 * 
	 * @param {Number} fixletID
	 * @param {String} [siteKey] Key of the SiteIdentifier listed in tem.config.sites array.  If not specified, the
	 * default site will be used (first site in tem.config.sites)
	 */
	tem.content.openFixlet = function(fixletID, siteKey) {
		var siteName = tem.config.getSite(siteKey).name;
		var href;
		
		try{
			href = tem.evalRel('link href of bes fixlets whose(id of it as string =  "' + fixletID + '" and name of site of it = "' + siteName + '")');
		}catch(e){
			throw new Error('Problem opening document for fixlet "' + fixletID + '" of site "' + siteName + '": ' + e.description);
		}
		
		tem.consoleUtils.openLink(href);
	};
	
	
	/**
	 * Opens document window for a computer.
	 * 
	 * @param {Number} computerId
	 */
	tem.content.openComputer = function(computerId) {
		var href;
		try{
			href = tem.evalRel('link href of bes computer whose (id of it = ' + computerId + ')');
		}catch(e){
			throw new Error('Problem opening document for computer "' + computerId + '": ' + e.description);
		}
		
		tem.consoleUtils.openLink(href);
	};



	/**
	 * Opens a computer group document in the console for an ad hoc set of computers, 
	 * similar to how in the console you can select a set of computers in a computer list,
	 * right click, and select "View As Group" to open a computer group document that displays 
	 * the selected set of computers as if they were a computer group.
	 * 
	 * <p>Call the function with an array of computer ids, or a single computer id.
	 * Here are two examples:</p>
	 * <pre>
	 * Example 1:
	 * tem.content.openComputerGroup(tem.evalRel("ids of bes computers"));
	 * 
	 * Example 2:
	 * var ids = tem.evalRel("ids of bes computers");
	 * var first5 = new Array(5);
	 * for (var i = 0; i < 5; i++) {
	 *   first5[i] = ids[i];
	 * }
	 * 
	 * tem.content.openComputerGroup(first5);
	 * </pre>
	 * 
	 * <p>The Console enables setting the computer group title, as follows:</p>
	 * 
	 * <pre>
	 * tem.content.openComputerGroup(cids, "Computers needing patch X");
	 * </pre>
	 * 
	 * <p>TEM enables tem.content.openComputerGroup() in Web Reports. However, when
	 * Web Reports aggregates multiple databases, this function will return every computer
	 * that matches any of the given ids across all databases. (For example, when calling
	 * tem.content.openComputerGroup( 1 ), if Web Reports is aggregating databases A and
	 * B, and both contain a computer with an id of "1", both computers will be returned as
	 * results.)</p>
	 * 
	 * 
	 * @param {Number|String|Array} cids Array of computer ids, or a single computer id. Strings 
	 * convertible to numbers will be converted automatically.
	 * @param {String} [title] Title that appears in document popup
	 */
	tem.content.openComputerGroup = function(cids, title) {
		return openComputerGroupHook(cids, title);
	};

	/**
	 * Similar to openComputerGroup, it will open a computer group document for 
	 * a specified computer group id.
	 * 
	 * @param {Number} groupId Computer group id
	 * @param {String} [title] Title that appears in document popup
	 */
	tem.content.openComputerGroupById = function(groupId, title) {
		var rel = tem.relevance.queries.computers.getComputersByComputerGroupId(groupId);
	
		try {
			tem.content.openComputerGroup(tem.evalRel(rel), title);
		} catch (e) {
			tem.logging.error("openComputerGroupById: " + e.description);
		}
	};


	/**
	 * <b>Not available in Web Reports</b> Used to create content 
	 * (Fixlet, Action, Analysis, Property, Baseline, ComputerGroup, Task).
	 * 
	 * <p>This function is similar to {@link tem.content.createContent} except that it works with XML 
	 * instead of model objects.</p>
	 * 
	 * <p>Note that you can construct your XML through string manipulation if you like, or you can use the 
	 * XML Document Object Model provided by Microsoft via the HTML tag "xml" like this:</p>
	 * 
	 * <pre>
	 * &lt;xml id="myXMLDocument"&gt;
	 *   &lt;?xml version="1.0" encoding="UTF-8"?&gt;
	 *     &lt;BES&gt;
	 *       &lt;Fixlet&gt;
	 *         &lt;Title&gt;New Fixlet&lt;/Title&gt;
	 *           more XML here
	 *       &lt;/Fixlet&gt;
	 *     &lt;/BES&gt;
	 *   &lt;/xml&gt;
	 * </pre>
	 * 
	 * 
	 * <p>Then you can access the DOM using script like this:</p>
	 * 
	 *  <pre>
	 *  var doc = myXMLDocument.XMLDocument;
	 *  var t = doc.selectSingleNode("BES/Fixlet/Title");
	 *  t.text = "My Title";
	 *  tem.content.importXML(doc.xml);
	 *  </pre>
	 *  
	 *  <p>For more information on using the XML DOM, 
	 *  see <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/e9da2722-7879-4e48-869c-7f16714e2824.asp"/>Microsoft documentation</a>.
	 *  </p>
	 *  
	 *  <p>
	 *  If the import is successful, it returns an array of object IDs corresponding to 
	 *  and in the same order as the object elements in the XML. If the import is cancelled, it returns 
	 *  the JavaScript 'undefined' value. If something else goes wrong (for example, if the XML is invalid) 
	 *  a Javascript exception is thrown. Here's an example import:
	 *  </p>
	 *  
	 *  <pre>
	 *  function ImportAction(){
	 *    try {
	 *      result_ids = tem.content.importXML(ActionXML.xml, false);
	 *    } catch (e) {
	 *      alert('There was an error importing the action.');
	 *      return false;
	 *    }
	 *
	 *    if (!result_ids) {
	 *      alert('The action import was cancelled.');
	 *    }								
	 *  }
	 *  </pre>
	 * 
	 * 
	 * @param {String} xml 
	 * @param {Boolean} [openDocuments=true] Specifies whether to open documents corresponding to newly
	 * imported items after they are imported.
	 * @param {String} [customSiteName] <b>TEM 8.1+ Only</b> Used to import into a custom site, set this value to name of site. 
	 * To import into your operator site, set customSiteName to undefined.
	 * @param {Array} [computerIDs] <b>TEM 8.1+ Only</b> A list of computer IDs, so that for content where a Take Action Dialog can be 
	 * applied at a later point, the user will only be able to target those computers if targeting by computer ID. 
	 * Note that if targeting by name or property, other computers can also be targeted.
	 * 
	 * @return {Array}  If the import is successful, it returns an array of object IDs 
	 * corresponding to and in the same order as the object elements in the XML. 
	 * If the import is cancelled, it returns the JavaScript 'undefined' value.
	 */
	tem.content.importXML = function(xml, openDocuments, customSiteName, computerIDs) {
		var importResult;
		
		try {
			importResult = importXMLHook(xml, openDocuments, customSiteName, computerIDs);
		} catch(e) {
			tem.logging.error('Error during content creation process, xml: ' + xml );
			throw e;
		}
		
		return importResult;
	};


	/**
	 * <b>Not available in Web Reports</b> Similar to importXML, used to create content in a specific custom site.
	 * 
	 * @param {String} xml 
	 * @param {Boolean} [openDocuments=true] Specifies whether to open documents corresponding to newly
	 * imported items after they are imported.
	 * @param {String} [customSiteName] Used to import into a custom site, set this value to name of custom site. 
	 * To import into your operator site, set customSiteName to undefined.
	 * 
	 * @return {Array}  If the import is successful, it returns an array of object IDs 
	 * corresponding to and in the same order as the object elements in the XML. 
	 * If the import is cancelled, it returns the JavaScript 'undefined' value.
	 */
	tem.content.importXMLToSite = function( xml, customSiteName, openDocuments ) {
		try {
			importResult = importXMLToSiteHook(xml, customSiteName, openDocuments);
		} catch(e) {
			tem.logging.error('Error during content creation process, xml: ' + xml );
			throw e;
		}
		
		return;
	};



	/**
	 * <b>Not available in Web Reports</b> Used to edit an existing fixlet/task/analysis/baseline/computergroup.
	 * 
	 * <p>Similar to {@link tem.content.editContent} except it works with XML
	 * instead of a model object.</p>
	 * 
	 * <p>The xml parameter is a BES XML representation of the fixlet.</p>
	 *  
	 * <pre>
	 * &lt;?xml ...?&gt;
	 *   &lt;BES&gt;
	 *     &lt;Fixlet&gt;...&glt;/Fixlet&gt;
	 *   &lt;/BES&gt;
	 * </pre>
	 *   
	 * <p>The following expression returns names of bes fixlets that are editable by the current console user:</p>
	 *   
	 * <pre>
	 *	names of bes fixlets 
	 *	 whose
	 *	 (custom flag of it 
	 *	  and
	 *	   (if
	 *	       custom site flag of it 
	 *	     then
	 *	       (master flag of current console user 
	 *	        or
	 *	         exists it 
	 *	         whose
	 *	         (name of current console user = name of it)
	 *	         of elements of union of 
	 *	         (owner set of it; writer set of it)
	 *	         of custom site of it
	 *	       )
	 *	     else
	 *	       (
	 *	         (master site flag of it 
	 *	          and
	 *	           master flag of current console user
	 *	         )
	 *	        or
	 *	         (name of issuer of it = name of current console user)
	 *	       )
	 *	   )
	 *	 )
	 *   </pre>

	 * @throws UserCancelled If the user presses the cancel button 
	 * when prompted for the console password, <b>unlike tem.content.importXML()</b>
	 * @param {Number} contentId
	 * @param {String} xml
	 */
	tem.content.importXMLForEdit = function(contentId, xml) {
		var importResult;
		try {
			importResult = editFixletHook(contentId, xml);
		} catch(e) {
			tem.logging.error('Error during content creation process, xml: ' + xml );
			throw e;
		}
		
		return importResult;
	};
	

	/**
	 * <b>Not available in Web Reports</b> This function can be used to create content and is similar 
	 * to {@link tem.content.importXML}, except 
	 * that it works with model objects that are subclasses of XMLSerializableObject instead of XML.
	 * 
	 * @requires json2.js if specifying WizardSource.
	 *
	 * @param {tem.model.XMLSerializableObject} contentModel Model object subclass of XMLSerializableObject that has all of its state set and 
	 * is ready for import into the console for content creation.
	 *
	 * @param {Boolean} [skipUI=false] If set to true, the console window asking for user confirmation on
	 * content creation will be suppressed and the content will automatically get created
	 * behind the scenes.
	 *
	 * @param {Boolean} [openDocuments=true] Specifies whether to open documents corresponding to newly
	 * imported items after they are imported.
	 *
	 * @param {tem.model.WizardSource} [wizardSource=null] Used to associate the created content with a 
	 * particular named wizard.  Useful for being able to "reload" created content back into a wizard
	 * and for generally being able to query a particular set of content by a standard metadata attribute
	 * (ultimately the WizardSource info is stored as a MIMEField).
	 * 
	 * @param {String} [customSiteName=null] <b>TEM 8.1+ Only</b> Used to import into a custom site, set this 
	 * value to name of custom site. Defaults to your operator site. 
	 * 
	 * @param {Array} [computerIds] <b>TEM 8.1+ Only</b> A list of computer IDs, so that for content where a Take Action Dialog can be 
	 * applied at a later point, the user will only be able to target those computers if targeting by computer ID. 
	 * Note that if targeting by name or property, other computers can also be targeted.
	 * 
	 */
	tem.content.createContent = function(contentModel, skipUI, openDocuments, wizardSource, customSiteName, computerIds) {
		if(skipUI === undefined) {
			skipUI = false;
		}
		
		if(openDocuments === undefined) {
			openDocuments = true;
		}

		if(wizardSource !== undefined && wizardSource !== null) {
			contentModel.setWizardSource(wizardSource.siteKey + "_" + wizardSource.sourceName);
		
			var JSONdata;

			try {
				JSONdata = JSON.stringify(wizardSource.formData);
			} catch(e) {
				tem.logging.error("There was an error serializing your content data to JSON for wizard source metadata, verify you're including json2.js.");
				throw e;
			}
			
			contentModel.setWizardData(JSONdata);
		}			
				
		var xmlString = contentModel.toXML(skipUI);
		return tem.content.importXML(xmlString.xml, openDocuments, customSiteName, computerIds);
	};


	/**
	 * <b>Not available in Web Reports</b> This function can be used to edit content and is similar to 
	 * {@link tem.content.importXML}, except 
	 * that it works with model objects that are subclasses of XMLSerializableObject instead of XML.
	 * 
	 * @param {Number} contentID
	 * @param {tem.model.XMLSerializableObject} contentModel Model object subclass of XMLSerializableObject that has all of its state set and 
	 * is ready for import into the console for content creation.
	 * @param {Boolean} [skipUI=false] If set to true, the console window asking for user confirmation on
	 * content creation will be suppressed and the content will automatically get created
	 * behind the scenes.
	 */
	tem.content.editContent = function(contentID, contentModel, skipUI){
		if(skipUI === undefined) {
			skipUI = false;
		}
		
		return tem.content.importXMLForEdit(contentID, contentModel.toXML(skipUI).xml);
	};

	
	
	/**
	 * <b>Not available in Web Reports</b> Used to delete existing fixlets/tasks/analyses/baselines/computergroups.
	 * 
	 * <p>The following expression returns names of bes fixlets that are deletable by the current console user 
	 * (the difference from editing is that master operators can delete fixlets in an operator site, 
	 * but not edit them):</p>
	 * 
	 * <pre>
	 *	 names of bes fixlets whose
	 *	 (custom flag of it 
	 *	  and
	 *	   (if
	 *	       custom site flag of it 
	 *	     then
	 *	       (
	 *	         master flag of current console user 
	 *	        or
	 *	         exists it 
	 *	         whose
	 *	         (name of current console user = name of it)
	 *	         of elements of union of 
	 *	         (owner set of it; writer set of it)
	 *	         of custom site of it
	 *	       )
	 *	     else
	 *	       ((master flag of current console user)
	 *	        or
	 *	         (name of issuer of it = name of current console user)
	 *	       )
	 *	   )
	 *	 )
	 * </pre>
	 * 
	 * @param {Number|Array} fixletIDs Can pass an Array or single Number
	 */
	tem.content.deleteContent = function(contentIDs) {
		if(tem.javascriptUtils.isArray(contentIDs)) {
			return deleteFixletsHook(contentIDs);
		}
		
		return deleteFixletHook(contentIDs);
	};


	
	/**
	 * <b>Not available in Web Reports</b> Used to copy multiple fixlets to the default Master Action Site. 
	 * 
	 * <p>Sample Usage:</p>
	 * 
	 * <pre>
	 *  tem.content.copyFixlets(new Array({fixletID: 452, siteID: 2147495801}, 
	 *                             {fixletID: 453, siteID: 2147495801}), false, true);
	 * </pre>
	 * 
	 * @param {Array} sourceFixlets  An array of &lt;fixletID, siteID&gt; tuples.  
	 * @param {Boolean} [skipUI=false] Optionally skip the user interface. Note this will apply to all. 
	 * @param {Boolean} [openDocuments=true] Specifies whether to open documents corresponding to newly
	 * imported items after they are imported.
	 */
	tem.content.copyFixlets = function( sourceFixlets, skipUI, openDocuments ) {
		var i;
		var multipleItems = new ActiveXObject("Microsoft.XMLDOM");
		multipleItems.loadXML( '<BES xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="BES.xsd"></BES>' );
	
		if(skipUI){
			multipleItems.childNodes[0].setAttribute("SkipUI","true"); 
		} else { 
			multipleItems.childNodes[0].setAttribute("SkipUI","false"); 
		}

		for(i=0; i<sourceFixlets.length; i++) {
			var singleItem = new ActiveXObject("Microsoft.XMLDOM");
			singleItem.loadXML( tem.evalRel( "(fixlet " + sourceFixlets[i].fixletID + " of bes site whose (id of it = " + sourceFixlets[i].siteID + ")) as xml" ) );	
			multipleItems.childNodes[0].appendChild(singleItem.childNodes[1].childNodes[0]);
		}

		tem.content.importXML( multipleItems.xml, openDocuments );
	};

	
	/**
	 * <b>Not available in Web Reports</b> Used to copy multiple fixlets to a specific custom site. 
	 * 
	 * <p>Sample Usage:</p>
	 * 
	 * <pre>
	 * tem.content.copyFixletsToSite(new Array({fixletID: 452, siteID: 2147495801},{fixletID: 453, siteID: 2147495801}), 
	 *                                 false, 
	 *                                 "destinationCustomSiteName", 
	 *                                 true);
	 * </pre>
	 *
	 * @param {Array} sourceFixlets  An array of &lt;fixletID, siteID&gt; tuples where siteID represents the source siteID. 
	 * @param {Boolean} [skipUI=false] Optionally skip the user interface. Note this will apply to all. 
	 * @param {String} [destinationSiteName=(Master Action Site)] A string indicating the destination custom site to which a 
	 * copy of said sourceFixlets will be made. 
	 * @param {Boolean} [openDocuments=true] Specifies whether to open documents corresponding to newly
	 * imported items after they are imported.
	 */
	tem.content.copyFixletsToSite = function(sourceFixlets, skipUI, destinationSiteName, openDocuments) {
		var i;
		var multipleItems = new ActiveXObject( "Microsoft.XMLDOM" );
		multipleItems.loadXML( '<BES xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="BES.xsd"></BES>' );
			
		if(skipUI){ 
			multipleItems.childNodes[0].setAttribute( "SkipUI","true" ); 
		} else { 
			multipleItems.childNodes[0].setAttribute( "SkipUI","false" ); 
		}
		
		for(i=0; i<sourceFixlets.length; i++) {
			var singleItem = new ActiveXObject( "Microsoft.XMLDOM" );
			singleItem.loadXML(tem.evalRel("(fixlet " + sourceFixlets[i].fixletID + " of bes site whose (id of it = " + sourceFixlets[i].siteID + ")) as xml") );	
			multipleItems.childNodes[0].appendChild( singleItem.childNodes[1].childNodes[0] );
		}

		tem.content.importXMLToSite(multipleItems.xml, destinationSiteName, openDocuments);
	};


	/**
	 * <b>Not available in Web Reports</b> Used to copy multiple fixlets to multiple custom sites. 
	 * 
	 * <p>Sample Usage:</p>
	 * 
	 * <pre>
	 * tem.content.copyFixletsToSites(new Array({fixletID: 452,siteID: 2147495801},{fixletID: 453, siteID: 2147495801), 
	 *                                  false, 
	 *                                  new Array("destination-site-1", "destination-site-2"), 
	 *                                  true);
	 * </pre>
	 * 
	 * @param {Array} sourceFixlets  An array of &lt;fixletID, siteID&gt; tuples where siteID represents the source siteID.  
	 * @param {Boolean} [skipUI=false] Optionally skip the user interface. Note this will apply to all. 
	 * @param {Array} [destinationSites=Master Action Site] Indicates the names of destination custom sites to which the 
	 * copies of sourceFixlets will be made. 
	 * @param {Boolean} [openDocuments=true] Specifies whether to open documents corresponding to newly
	 * imported items after they are imported.
	 */
	tem.content.copyFixletsToSites = function( sourceFixlets, skipUI, destinationSites, openDocuments ) {
		var i;
		for(i=0; i<sourceFixlets.length; i++) {
			tem.content.copyFixletsToSite(sourceFixlets, skipUI, destinationSites[i], openDocuments);
		}
	};


	/**
	 * <b>Not available in Web Reports</b> Used to delete existing global properties.
	 * 
	 * @param {Number|Array} propertyIDs
	 */
	tem.content.deleteProperties = function(propertyIDs) {
		if(tem.javascriptUtils.isArray(propertyIDs)) {
			return deletePropertiesHook(propertyIDs);
		}
		
		return deletePropertyHook(propertyIDs);
	};


	/**
	 * Used to check if analysis is active.
	 * 
	 * @param {Numer} analysisID
	 * @param {String} [siteKey] Key of the SiteIdentifier listed in tem.config.sites array.  If not specified, the
	 * default site will be used (first site in tem.config.sites)
	 */	
	tem.content.isAnalysisActive = function(analysisID, siteKey) {
		var siteName = tem.config.getSite(siteKey).name;
		return tem.evalRel('exists best activations whose(active flag of it) of fixlets whose(id of it = ' + analysisID + ' ) of bes sites whose(name of it = "' + siteName + '")');
	};


	/**
	 * <b>Not available in Web Reports</b> Used to activate analyses.
	 * 
	 * @param {String|Array} analysisIDs Individual elements in the array must be strings of format 'siteid:analysisid' or 
	 * a single string of format 'siteid:analysisid' can be specified for a single analysis
	 */
	tem.content.activateAnalyses = function(analysisIDs) {
		if(tem.javascriptUtils.isArray(analysisIDs)) {
			return  activateAnalysesHook(analysisIDs);
		}
		
		return activateAnalysisHook(analysisIDs);
	};


	/**
	 * <b>Not available in Web Reports</b> Used to deactivate analyses
	 * 
	 * @param {String|Array} analysisIDs Individual elements in the array must be strings of format 'siteid:analysisid' or 
	 * a single string of format 'siteid:analysisid' can be specified for a single analysis
	 */
	tem.content.deactivateAnalyses = function(analysisIDs) {
		if(tem.javascriptUtils.isArray(analysisIDs)) {
			return  deactivateAnalysesHook(analysisIDs);
		}
		
		return deactivateAnalysisHook(analysisIDs);
	};

	/**
	 * <b>Not available in Web Reports</b> Used to reactivate analyses.
	 * 
	 * @param {String|Array} analysisIDs Individual elements in the array must be strings of format 'siteid:analysisid' or 
	 * a single string of format 'siteid:analysisid' can be specified for a single analysis
	 */
	tem.content.reactivateAnalyses = function(analysisIDs) {
		if(tem.javascriptUtils.isArray(analysisIDs)) {
			return  reactivateAnalysesHook(analysisIDs);
		}
		
		return reactivateAnalysisHook(analysisIDs);
	};


	/**
	 * <b>Not available in Web Reports</b> Used to stop a set of actions
	 * 
	 * @param {Number|Array} actionIDs Can be individual Number for a single action
	 * 
	 * @return {Boolean} true if successful, false if error or cancelled.
	 */
	tem.content.stopActions = function(actionIDs) {
		if(tem.javascriptUtils.isArray(actionIDs)) {
			return  stopActionsHook(actionIDs);
		}
		
		return stopActionHook(actionIDs);
	};


	/**
	 * <b>Not available in Web Reports</b> 
	 * Used to bring up the take action dialog as if the user had clicked the take 
	 * action link in a fixlet,
	 * it returns immediately and the take action dialog will be non-modal. The resulting action will be 
	 * associated with the source Fixlet just as if the user clicked the take action link in the Fixlet.
	 * 
	 * <p>You can optionally supply custom action parameters and a callback function that will be called 
	 * after the action is created:</p>
	 * 
	 * <pre>
	 * tem.content.takeFixletAction(tem.evalRel('id of current fixlet'),
	 *                               tem.evalRel('id of current bes site'),
	 *                               'Action1',
	 *                               {'Parameter1': 'Value1', 'Parameter2': 'Value2'},
	 *                               function(id){alert('Took an action with id ' + id);});
	 * </pre>
	 * 
	 * @param {Number} fixletID
	 * @param {Number} siteID Note: The type of siteID is such that you can't pass the decimal version of the action site ID 
	 * returned from Relevance, since the action site ID will be bigger than the largest signed integer. So in order to take an 
	 * action on a custom fixlet, whose siteID is the action site ID: <pre>
	 * tem.content.takeFixletAction( fixletID, tem.evalRel('id of bes site whose (name of it is "ActionSite")')>>>0, contentID )</pre>
	 * @param {String} contentID i.e. id of the type returned by the "content id of <fixlet action>" inspector
	 * @param {Object} [parameters] A JavaScript object whose property-value pairs will be used as action parameters. 
	 * The user will be prompted for any parameters used in the script that are not specified in the object. 
	 * @param {Function} [callback] A function taking one argument, the ID of the action that has been created. 
	 * If the user cancels the Take Action dialog, the callback will not be called. 
	 */
	tem.content.takeFixletAction = function(fixletID, siteID, contentID, parameters, callback) {
		return takeFixletActionHook(fixletID, siteID, contentID, parameters, callback);
	};


    /**
	 * <b>Added in IEM 9.0 (Gilman)</b><br/>
	 * <b>Not available in Web Reports</b>
	 * <p>Similar to tem.content.takeFixletAction, and allows adding secure parameters. 
	 * Using secure parameters forces the action to be targeted statically, and then added to the mailboxes of any targeted agents. 
	 * The parameters are encrypted so that only the targeted agents will be able to access them. 
	 * They can then be used in the action script just like normal parameters
	 * </p>
	 * 
	 * <p>You can optionally supply custom action parameters and a callback function that will be called 
	 * after the action is created:</p>
	 * 
	 * <p>You can optionally supply custom action parameters and a callback function that will be called 
	 * after the action is created:</p>
	 * 
	 * <pre>
	 * tem.content.takeSecureFixletAction(tem.evalRel('id of current fixlet'),
	 *                                  tem.evalRel('id of current bes site'),
	 *                                  'Action1',
	 *                                  {'Parameter1': 'Value1', 'Parameter2': 'Value2'},
	 *                                  {'SecureParameter1': 'Value1', 'SecureParameter2': 'Value2'},
	 *                                  function(id){alert('Took an action with id ' + id);});
	 * </pre>
	 * 
	 * @param {Number} fixletID
	 * @param {Number} siteID Note: The type of siteID is such that you can't pass the decimal version of the action site ID 
	 * returned from Relevance, since the action site ID will be bigger than the largest signed integer. So in order to take an 
	 * action on a custom fixlet, whose siteID is the action site ID: <pre>
	 * tem.content.takeSecureFixletAction( fixletID, tem.evalRel('id of bes site whose (name of it is "ActionSite")')>>>0, contentID )</pre>
	 * @param {String} contentID i.e. id of the type returned by the "content id of <fixlet action>" inspector
	 * @param {Object} [parameters] A JavaScript object whose property-value pairs will be used as action parameters. 
	 * The user will be prompted for any parameters used in the script that are not specified in the object. 
	 * @param {Object} [secureParameters] A JavaScript object whose property-value pairs will be used as action parameters. 
     * Their values are double encrypted. When action is executed, secure parameter is decrypted.
	 * @param {Function} [callback] A function taking one argument, the ID of the action that has been created. 
	 * If the user cancels the Take Action dialog, the callback will not be called. 
	 */
	tem.content.takeSecureFixletAction = function (fixletID, siteID, contentID, parameters, secureParameters, callback) {
	    return takeSecureFixletActionHook(fixletID, siteID, contentID, parameters, secureParameters, callback);
	};

	
	/**
	 * <b>Not available in Web Reports</b> Used to create a custom site. Only master operators can create custom sites. 
	 * Validate that the current 
	 * user is a master operator before calling this function. The function will fail if the current user 
	 * is not a master operator, the site name is not valid, or if the site name already exists. 
	 * 
	 * @param {String} siteName Valid custom site names cannot contain ' " ' or ' \n '. They cannot end with with a space 
	 * character. The length must be less than or equal to 32 bytes.
	 */
	tem.content.createCustomSite = function(siteName) {
		return createCustomSiteHook(siteName);
	};


    /**
	 * <b>Added in IEM 9.0 (Gilman)</b><br/>
	 * <b>Not available in Web Reports</b> 
	 * <p>Adds the file pointed to by <i>filePath</i> on the local console's filesystem to the custom site <i>siteNameStr</i>.</p>
     * <p>If <i>siteNameStr</i> is null or empty, the file is added to the master action site if the current console user is a master operator,
     * or the user's operator site if the user is a non-master operator.</p>
     * <p>The file will be sent down to agent machines only if <i>clientFile</i> is set to true; 
     * otherwise it will be added to the site as a non-client file.</p>
	 * 
	 * @param {String} siteName Custom site's name
	 * @param {String} filePath Local file path
	 * @param {Boolean} clientFile Specifies whether the added file is a client file or non-client file 
     *
	 */
	tem.content.addFileToSite = function (siteNameStr, filePath, clientFile) {
	    return addFileToSiteHook(siteNameStr, filePath, clientFile);
	};


    /**
	 * <b>Added in IEM 9.0 (Gilman)</b><br/>
	 * <b>Not available in Web Reports</b> 
	 * <p>Adds the file pointed to by <i>filePath</i> on the local console's filesystem to the mailbox for computer <i>computerID</i>. 
     * The computer should be notified and gather the file into its mailbox at __BESData\mailboxsite\<i>fileName</i>. </p>
     * <p>If a file named <fileName> already exists in the mailbox, it will be overwritten with the contents at <i>filePath</i>.</p>
	 * 
	 * @param {Number} computerID
	 * @param {String} filePath Local file path
	 * @param {String} fileName File name in mailboxsite
     *
	 */
	tem.content.addFileToMailbox = function (computerID, filePath, fileName) {
	    return addFileToMailboxHook(computerID, filePath, fileName);
	};




/**
 * @namespace 
 * @name tem.dataStore
 * 
 * @description Contains functions for storing/deleting data in the dashboard data store.
 * 
 * <p>
 * Variables are stored as strings. One common approach for complex data is to store it as 
 * serialized JSON.
 * </p>
 * 
 * <p>
 * Because each dashboard/wizard has a separate namespace, naming collisions (with
 * another dashboard) cannot occur. Moreover, visibility of variables can be limited to a
 * particular user by flagging them as private:
 * </p>
 * <ul>
 * <li>A private variable is only visible to a particular user of a particular dashboard.</li>
 * <li>A shared variable is visible for all users of a particular dashboard.</li>
 * </ul>
 * 
 * <p>
 * If dashboards need to share data with each other, they can by specifying the same dashboardID.
 * </p>
 * 
 * 
 */
tem.dataStore = {};


	/**
	 * <b>Not available in Web Reports</b> Used to store a private/shared variable in the dashboard data store.
	 * For web reports, use {@link tem.dataStore.storeSharedVariableWR}
	 * 
	 * @param {String} name
	 * @param {String} value
	 * @param {Boolean} [isPrivate=false] Used to indicate whether the 
	 * variable to store is private or not.
	 * @param {String} [dashboardID] id of dashboard, defaults to dashboard id of current wizard if not specified or null
	 */
	tem.dataStore.storeVariable = function(name, value, isPrivate, dashboardID) {
		if(!dashboardID){
			dashboardID = tem.evalRel('dashboard id of current wizard');
		}	

		try{
			storeVariableHook(dashboardID, name, value, isPrivate);
		}catch(e){
			throw new Error('Could not store date for variable"' + name + '": ' + e.description);
		}	

		return;
	};
	
	
	/**
	 * Gets value of datastore variable.
	 * 
	 * @param {String} name
	 * @param {Boolean} [isPrivate=false] Used to indicate whether the 
	 * variable to store is private or not.
	 * @param {String} [dashboardID] id of dashboard, defaults to dashboard id of current wizard if not specified or null
	 */
	tem.dataStore.getVariable = function(name, isPrivate, dashboardID) {
		if(!dashboardID){
			dashboardID = tem.evalRel('dashboard id of current wizard');
		}
		var accessLevel = (isPrivate)?"private":"shared";
		var value = tem.evalRel('concatenation of unique values of ' + accessLevel + ' variables "' + name + '" of bes wizards whose(dashboard id of it = "' + dashboardID + '")');

		return value===''?null:value;
	};
	

	/**
	 * <b>Not available in Web Reports</b> Used to delete a private/shared variable from dashboard data store.
	 * 
	 * @param {String} name
	 * @param {Boolean} [isPrivate=false] Used to indicate whether the 
	 * variable to delete is private or not.
	 * @param {String} [dashboardID] id of dashboard, defaults to dashboard id of current wizard if not specified or null
	 */
	tem.dataStore.deleteVariable = function(name ,isPrivate, dashboardID) {
		if(!dashboardID){
			dashboardID = tem.evalRel('dashboard id of current wizard');
		}	
		return deleteVariableHook(dashboardID, name , isPrivate);
	};



	/**
	 * <b>Web Reports Only.</b> Used in Web Reports to store a shared variable in the dashboard data store.
	 * 
	 * @param {String} name
	 * @param {String} value
	 * @param {String} dashboardID id of dashboard that variable is stored under
	 * @param {Object} [callbackObj] If specified the call is made asynchronously. An object with a "success" 
	 * property that defines a success callback which gets passed results when called and an optional "failure" 
	 * property for a failure callback which gets passed the error string when called.
	 * <pre>
	 *  {
	 *   success: function( o ) {
	 *        // Do nothing, we're happy we succeeded.
	 *   },
	 *   failure: function( o ) {
	 *        WR.Notify.error( 'Yikes, something went wrong:' + o.responseText );
	 *   }
	 * }
	 * </pre>
	 * @param {String} [databaseID] allows you to specify which database the value will be written to 
	 * (Web Reports can be aggregating multiple databases, which means it can have multiple dashboard data stores). 
	 * If you do not provide this argument, the value will be written to <b>all</b> of the aggregated databases at the same time. 
	 * 
	 */
	tem.dataStore.storeSharedVariableWR = function(name, value, dashboardID, callbackObj, databaseID) {	
		StoreSharedVariable(dashboardID, name, value, callbackObj, databaseID);
		return;
	};


	/**
	 * Gets value of datastore variable for Web Reports.
	 * 
	 * @param {String} name
	 * @param {String} dashboardID id of dashboard
	 */
	tem.dataStore.getSharedVariableWR = function(name, dashboardID) {
		var value = tem.evalRel('concatenation of unique values of shared variables "' + name + '" of bes wizards whose(dashboard id of it = "' + dashboardID + '")');
		return value===''?null:value;
	};


	/**
	 * Used in Web Reports to delete a private/shared variable from dashboard data store.
	 * 
	 * @param {String} name
	 * @param {String} dashboardID id of dashboard, defaults to dashboard id of current wizard if not specified or null
	 * @param {Object} [callbackObj] If specified the call is made asynchronously. An object with a "success" 
	 * property that defines a success callback which gets passed results when called and an optional "failure" 
	 * property for a failure callback which gets passed the error string when called.
	 * <pre>
	 *  {
	 *   success: function( o ) {
	 *        // Do nothing, we're happy we succeeded.
	 *   },
	 *   failure: function( o ) {
	 *        WR.Notify.error( 'Yikes, something went wrong:' + o.responseText );
	 *   }
	 * }
	 * </pre>
	 * @param {String} [databaseID] allows you to specify which database the value will be written to 
	 * (Web Reports can be aggregating multiple databases, which means it can have multiple dashboard data stores). 
	 * If you do not provide this argument, the value will be written to <b>all</b> of the aggregated databases at the same time. 
	 * 
	 */
	tem.dataStore.deleteVariableWR = function(name, dashboardID, callbackObj, databaseID) {
		return DeleteSharedVariable(dashboardID, name, callbackObj, databaseID);
	};





/**
 * @namespace 
 * @name tem.context
 * @description Contains functions for determining information about the context a dashboard/wizard 
 * is running in (i.e. Console version, preferred language, and whether it is running 
 * in the Console or as a web report).
 *
 * 
 */
tem.context=  {};


(function() {
	var inConsoleContextCheck = tem.evalRel('if exists current wizard then dashboard id of current wizard else "false"')==="false"?false:true;

	/**
	 * <b>Not available in Web Reports</b> Returns a string containing the DSN name that the console is 
	 * using to connect to the database. 
	 * No error diagnostics are provided as this function does not have any expected error conditions. 
	 * 
	 * @return {String} String containing the DSN name that the console is using to connect to the database.
	 */
	tem.context.getCurrentDSN = function() {
		return getCurrentDSNHook();
	};

	/**
	 * <b>Not available in Web Reports</b> Returns a string containing the database login name that the 
	 * console is using to connect to the database. 
	 * No error diagnostics are provided as this function does not have any expected error conditions. 
	 * 
	 * @return {String} String containing the database login name that the console is using to connect to the database.
	 */
	tem.context.getCurrentUser = function() {
		return getCurrentUserHook();
	};

	
	/**
	 * <b>Available in: TEM 8.1+</b> Used to return language specified by "Console language" dropdown 
	 * in File &lt; Preferences in the Console (ie ENU, CHS, JPN, ESN, ITA, FRA, DEU)
     * 
     * @return {String} String representation of user's preferred language as selected in the Console.
     */	
	tem.context.getPreferredLanguage = function() {
		var preferredLanguage;
		try {
			preferredLanguage = tem.evalRel('preferred bes language');
		} catch(e) {
			tem.logging.error("Call to 8.1+ preferred bes language inspector failed.");
			throw e;
		}	
		return preferredLanguage;
	};

	/**
     * Used to determine if the app is running in the Console or not (eg as opposed
	 * to web reports).
	 * 
     * @return {Boolean} true if the app is running in the console.
     */
	tem.context.isInConsole = function() {
		return inConsoleContextCheck;
	};
		
			
	tem.context.languageMap = {
		ENU: 'en-us',
		CHS: 'zh-cn',
		JPN: 'ja',
		ESN: 'es',
		ITA: 'it',
		FRA: 'fr',
		DEU: 'de',
		CHT:'zh-tw', 
		KOR:'ko', 
		PTB:'pt-br'
	};
	
	// cache this reference as it only affects console on startup
	var consoleSelectedLanguage;


	/**
	 * Returns user <a href="http://msdn.microsoft.com/en-us/library/ms533052%28v=VS.85%29.aspx">locale</a>.  
	 * If running in an 8.1+ Console that supports selecting a preferred language
	 * from the "Console language" dropdown in File &lt; Preferences, and a preferred language is selected
	 * it will default to that, otherwise it will use navigator.browserLanguage or window.navigator.language
	 * to determine locale.
	 * 
	 * <p><b>Note:</b> Even though different browsers may return the locale as xx-XX as opposed to xx-xx, this
	 * function always normalized the locale as xx-xx</p>
	 * 
	 * @return {String} <a href="http://msdn.microsoft.com/en-us/library/ms533052%28v=VS.85%29.aspx">Locale</a>
	 * in format xx-xx
	 * 
	 */
	tem.context.getUserLocale = function(){
		var language = null;

		if(consoleSelectedLanguage === undefined) {
			try {
				consoleSelectedLanguage = tem.context.getPreferredLanguage()
			} catch(e) {
				consoleSelectedLanguage = null;
			}
		}
		
		// see if the preferred locale is a "supported" locale
		if(consoleSelectedLanguage !== null) {
			language = this.languageMap[consoleSelectedLanguage];
			
			if(tem.config.isDebug()) {
				tem.logging.debug("Using preferred language to determine resource bundle name: " + language);
			}			
		}
		
		if(language == null) {
			if (navigator.browserLanguage) {// ie
				// note that navigator.browserLanguage is not the default language set in IE settings.
				language = navigator.browserLanguage;
			} else {
				if (window.navigator.language) { // firefox, opera, chrome (web reports)
					language = window.navigator.language;
				}
			}	
			if(tem.config.isDebug()) {
				tem.logging.debug("Defaulting to browser language: " + language);
			}
		}
		
		return language===null?language:language.toLowerCase();
	};
		
		
	var version;	
						
	/**
     * Gets version of Console/Web reports an application is running in.
     * 
     * @return {String} String value of version
     */	
	tem.context.getVersion = function() {
		try {
			// cache this as it doesn't change
			if(version === undefined) {
				version = tem.evalRel('version of datastore inspectors');
			}
			return version;
		} catch(e){
			return null;
		}
		return null;
	};			
			
	/**
	 * Gets height of the window containing the application.
     * 
     * @return {Number} Height of window in pixels.
     */	
	tem.context.getWindowHeight = function() {
		return document.body.clientHeight;
	};
		
		
	/**
	 * Gets URL for BES Server
     * 
     * @return {String} URL for BES Server.
     */			
	tem.context.getServerURL = function() {
		return tem.evalRel('url of current bes server');
	};

		
	/**
	 * Gets the absolute path to where the dashboard is being loaded from for applications
	 * running in the Console.  In Web Reports it returns the base href for report files.
	 * 
	 * 
	 * @returns {String}
	 */
	tem.context.getBaseDirectory = function() {
		var baseDir;
		
		try {
			baseDir = document.getElementsByTagName('base')[0].getAttribute('href');
			if (baseDir.match(/^\\\\/)) {
				baseDir = baseDir.substring(2);
			}
		} catch (e) {
			baseDir = unescape(document.location.href);
			var p = document.location.protocol;
			baseDir = baseDir.slice(p.length + 3);

			var dirs = baseDir.split("/");
			dirs.pop();
			baseDir = dirs.join("/");
		}
		
		return baseDir;		
	};
	
})();	





/**
 * @namespace 
 * @name tem.consoleUtils
 * @description This namespace contains utility functions for interaction with the Console UI and general Console functionality.
 *
 * 
 */
tem.consoleUtils=  {};	



	/**
	 * <b>Not available in Web Reports</b> Adds (or replaces) a filter that is applied to all inspectors that 
	 * return an iteration or set of a given type. 
	 * Inspectors that retrieve a property or iterated property of a single object are not filtered. They will 
	 * return the properties of the object even if that object would be filtered out by the current global filter 
	 * of that type.
	 * 
	 * <p>
	 * When you add a filter using tem.consoleDataStore.addGlobalFilter, it will replace any previously added filter of the same type. 
	 * There is only one global filter for each type of object, but multiple types of objects may be filtered. In other words, 
	 * there can be only one global computer filter applied, and there can be only one global action filter, but both computers and 
	 * actions can be filtered at the same time.
	 * </p>
	 * 
	 * <p>
	 * The function takes a single parameter which is an integer specifying the id of the named filter to add to the set of 
	 * global filters. This id would normally be obtained from the bes filter inspector. Here is an example:
	 * </p>
	 * 
	 * 
	 * <pre>
	 * var ids = tem.evalRel("ids of bes filters whose (fixlet flag of it)");
	 * tem.consoleDataStore.addGlobalFilter(newid);
	 * </pre>
	 * 
	 * @param {Number} filterID Integer specifying the id of the named filter to add to the set of 
	 * global filters
	 */
	tem.consoleUtils.addGlobalFilter = function(filterID) {
		return addGlobalFilterHook(filterID);
	};


	/**
	 * <b>Not available in Web Reports</b> Causes the Create Custom Filter Console dialog to pop up, and 
	 * returns the id of the filter that 
	 * the user creates/updates using that UI. Here is an example: 
	 * 
	 * <pre>
	 *  var ids = tem.evalRel("ids of bes filters whose (fixlet flag of it)");
	 *  var newid = tem.consoleDataStore.openCreateFilterDialog("Fixlet", ids[0]);
	 *
	 *  var rel = "links of elements of fixlet set of bes filter " + newid;
	 *  var links = tem.evalRel(rel);
	 * </pre>
	 * 
	 * @param {String} filterType Name of the type of object to be filtered. This must be one of the following strings: "Fixlet", "Task", 
	 * "Baseline", "Analysis", "Computer Group Search", "Computer", "Action", "User", or "Unmanaged Asset".
	 * @param {Number} [filterID] If specified, then the dialog is in edit mode for the filter specified.  If not specified or 0 it will
	 * create a new filter.
	 */
	tem.consoleUtils.openCreateFilterDialog = function(filterType, filterID) {
		return external.OpenFindDialog(filterType, filterID);
	};


	/**
	 * <b>Not available in Web Reports</b> Used to remove all global filters.
	 * 
	 */
	tem.consoleUtils.clearAllGlobalFilters = function() {
		return clearAllGlobalFiltersHook();
	};

	/**
	 * <b>Not available in Web Reports</b> Used to remove a global filter of a specific type.
	 * 
	 * <pre>
	 *  tem.consoleDataStore.clearAllGlobalFilters();
	 *  var ids = tem.evalRel("ids of bes filters whose (fixlet flag of it)");
	 *  tem.consoleDataStore.addGlobalFilter(ids[0]);
	 *  tem.consoleDataStore.clearGlobalFilterOfType("Fixlet");
	 *  </pre>
	 * 
	 * @param {String} filterType This must be one of the following strings: "Fixlet", "Task", 
	 * "Baseline", "Analysis", "Computer Group Search", "Computer", "Action", "User", or "Unmanaged Asset".
	 * 
	 */
	tem.consoleUtils.clearGlobalFilterOfType = function(filterType) {
		return clearGlobalFilterOfTypeHook(filterType);
	};



	/**
	 *  This function will cause the "onclick" event to be fired on the element with the 
	 *  given id whenever the data set identified by signalName changes in the console's data 
	 *  stores. If signalName is the empty string, then any of the possible data sets changing 
	 *  will cause the event to be fired. The possible values for signalName are as follows:
	 *  
	 *  <pre>
	 *  Computers        One or more computers have been added or removed.
	 *  ReportTimes      One or more computers has reported and updated its "Last Report Time" property.
	 *  ExternalContent  One or more of the external sites that are currently subscribed has been updated.
	 *  CustomContent    One or more pieces of custom content have been added, removed, or edited.  It also
	 *  fires for analysis activation/deactivation.
	 *  Actions          One or more actions have been created, stopped or deleted.
	 *  ActionResults    One or more computers has reported a new status for one or more actions.
	 *  FixletResults    One or more computers has reported a new relevance status for one or more fixlets.
	 *  PropertyResults  One or more computers has reported a new value for one or more of its active properties.
	 *  RefreshCycle     A console refresh has been completed.  The handler will be called even if nothing changed.
	 *  </pre>
	 *  
	 *  <p>Here is an example:</p>
	 *  <pre>
	 *  &lt;script language=javascript&gt;
	 *  function DoRefresh() {
	 *    window.alert("SignalName = " + theRegisterRefreshSignalName.innerText);
	 *  }
	 *  &lt;/script&gt;
	 *  &lt;div id="myRefreshHandler" style="display: none" onclick="DoRefresh();"&gt;&lt;/div&gt;
	 *  &lt;script language=javascript&gt;
	 *    tem.consoleDataStore.registerRefreshHandler("myRefreshHandler","");
	 *  &lt;/script&gt;
	 *  </pre>
	 *  
	 *  <p>
	 *  In this example, the DoRefresh() function will be called whenever anything changes in 
	 *  the console's data stores. Note that the innerText of theRegisterRefreshSignalName will 
	 *  be set to the name of the data set that has changed, and that the DoRefresh function can 
	 *  be called repeatedly when more than one data set changes. 
	 *  </p>
	 *  
	 *  <p><b>Note:</b> This function should be used with caution, in particular keep in mind that dashboards/wizards
	 *  not visible but still in the Console's cache will continue to have their handler called when the event fires. 
	 *  Also, the events available to listen to can occur quite frequently so be sure to take pains to mitigate the
	 *  work your refresh handler has to do for each event trigger.</p>
	 * 
	 * @param {String} elementID
	 * @param {String} signalName
	 */
	tem.consoleUtils.registerRefreshHandler = function( elementID, signalName ) {
		return registerRefreshHandlerHook( elementID, signalName );
	};

	/**
	 * Opens the specified link in the Console or Web Reports
	 * 
	 * @param {String} href
	 */
	tem.consoleUtils.openLink = function(href) {
		if(tem.context.isInConsole()){
			window.location = href ;
		} else {
			window.open(href , '_blank');
		}
	};



	/**
	 * <b>Not available in Web Reports</b> Sends a request to forward a magic Wake-on-LAN packet to the 
	 * specified computer ID or array of IDs. 
	 * If the "enableWakeOnLAN" deployment option is not enabled or "tem.consoleUI.enableWakeOnLAN" has never been called
	 * or the last time it was called it was turned off, this function will return "not implemented". 
	 * 
	 * @param {Array} cids
	 */
	tem.consoleUtils.sendWakeOnLANRequest = function(cids) {
		return sendWakeOnLANRequestHook(cids);
	};
	
	/**
	 * <b>Not available in Web Reports</b> Controls whether the Console will show the "Send Wake on LAN Request" menu 
	 * option in the computer list, 
	 * and whether tem.consoleUI.sendWakeOnLANRequest will work. The session relevance expression 
	 * "enabled of bes wakeonlan status" returns the most recent value this function was called with. 
	 * This is a global setting that affects all Consoles in the deployment. 
	 * 
	 * @param {Boolean} flag
	 */
	tem.consoleUtils.enableWakeOnLAN = function(flag) {
		return enableWakeOnLANHook(flag);
	};
	
	/**
	 * <b>Not available in Web Reports</b> Loads the file at the given path, and replace any <?Relevance?> processing 
	 * instructions with the results of evaluating the relevance. This is intended primarily as a testing tool for 
	 * use when creating a presentation (possibly useful in constructing a "Presentation Authoring Wizard"). Note 
	 * that <?BeginRefreshRelevance?> and <?EndRefreshRelevance?> tags are not processed by this function. 
	 * 
	 * @param {String} path
	 */
	tem.consoleUtils.loadPresentation = function(path) {
		return loadPresentationHook(path);
	};
	
	/**
	 * <b>Not available in Web Reports</b> This function will cause the console to open a wizard/dashboard and return 
	 * the IE [window object] for the new wizard/dashboard. 
	 * You can use this window object to populate settings in the new window or catch events from inside the other window. 
	 * The following is script that opens a new wizard and hooks the onunload event of the child wizard: 
	 * 
	 * <pre>
	 * &lt;script&gt;
	 * window.onload = function() {
	 *    wizard = tem.consoleUI.openWizard(1,"deployment-overview.ojo");
	 *    setTimeout( function() { wizard.attachEvent("onunload", function() { alert("unloaded!"); } ); }, 0 );
	 * }
	 * &lt;/script&gt;
	 * </pre>
	 * 
	 * 
	 * @param {Number} siteID
	 * @param {String} dashboardID
	 */
	tem.consoleUtils.openWizard = function(siteID, dashboardID) {
		return external.OpenWizard(siteID, dashboardID);
	};
	



/**
 * @namespace Contains model object classes.
 * @name tem.model
 * 
 * @description Individual content model objects are based on the BES XML schema.  You can find the schema
 * for these XML documents in your BES Console install, under the reference directory.
 */
tem.model=  {};


	/**
	 * @class Used to map a site's actual name to developer-specified key. (Used in tem.config.sites)
	 * 
	 * @param {String} key
	 * @param {String} name
	 * 
	 * @property {String} key
	 * @property {String} name
	 */
	tem.model.SiteIdentifier = function(key,name) {
		this.key = key;
		this.name = name;
	};
	
	
	/**
	 * @class Wrapper class that lets the XMLSerializableObject XML parser know that
	 * a string represents a chunk of XML.
	 *
	 * @param {String} xmlString A string that represents a chunk of XML, i.e. 
	 * 
	 * <pre>testAction.ActionScript = new tem.model.XMLWrapper('&lt;ActionScript MIMEType="application/x-sh"&gt;#!/bin/sh '
	 *		+ '\r# Enter your action script here&lt;/ActionScript&gt;');
	 * </pre>
	 * 
	 * 
	 * @property {String} xmlString
	 */
	tem.model.XMLWrapper = function(xmlString) {
		this.xmlString = xmlString;
	};

	tem.model.XMLWrapper.prototype.fromXML = function(nodeXML){
		this.xmlString = nodeXML;
		return this;
	}

	tem.model._ActionScriptWrapper = function(){
		this.fromXML = function(nodeXML){
			var node = new ActiveXObject("Microsoft.XMLDOM");
			node.loadXML(nodeXML);	
			node = node.childNodes[0];
		
			var MIMEType = node.getAttribute("MIMEType");		
			
			if( MIMEType=="application/x-Fixlet-Windows-Shell"){
				return node.text;
			}	
	
			return new tem.model.XMLWrapper(node.xml);
		}
	}


	/**
	 * @class XMLSerializableObject is an abstract class that serves as base class for all content model
	 * objects.
	 *
	 * <p>
	 * Individual content model objects are based on the BES XML schema.  You can find the schema
	 * for these XML documents in your BES Console install, under the reference directory.
	 * </p>
	 * 
	 * @property {String} type Maps to a specific type of content that can be created in the Console (i.e. "Fixlet")
	 * @property {String} rootType Top level content model objects (i.e. Fixlet, Task) need to get wrapped in a
	 * containing element when imported into the console for content creation.
	 * This is the name of that containing element.
	 * @property {tem.model.XMLWrapper} customXML By setting this property you can bypass any of the 
	 * auto-generation of XML based on the content model object's state and specify your own custom 
	 * XML to be used for content creation.
	 * @property orderedFields {Array} Used to define the full ordered set of fields to use when generating XML in toXML
	 * @property attributes {Array} Defines which object properties map to attributes in XML version of model object
	 * @property typeMap {Object} Defines any property types that are not Strings.
	 * @property textValue {String} Defines a value to be interpreted as a text node in XML version of model object.
	 * 
	 */
	tem.model.XMLSerializableObject = function () {

		this.type=null;
		this.rootType=null;
		this.customXML = null;
		
		this.textValue = null;
		this.typeMap = {};
		this.orderedFields = [];
		this.attributes = [];

	};
    
    /**
     * This method creates an XML "snapshot" of the current state of the content model object.
     * Typically this XML would be used as part of the content creation process as the console
     * hooks use an XML representation of a content object to create content.
     *
     * @param {Boolean} skipUI  If set to true the console window asking for user confirmation on
     * content creation will be suppressed.
     * @return {DOMDocument}
     */
	tem.model.XMLSerializableObject.prototype.toXML =  function (skipUI) {
	    var i, j;
	    if(this.customXML !== null) {
	        return customXML;
	    }

	    if ((this.type == null) && (this.rootType == null)) {
	        tem.logging.error('Invalid XMLSerializableObject. XMLSerializableObject must have a type and/or rootType.');
	        throw new Error(temui.l10n.adfapi.errorCreatingContent);
	    }

	    var orderedFields = this.orderedFields;
	    var xmlSnapshot = new ActiveXObject("Microsoft.XMLDOM");

	    // if type is null, use rootType instead
	    var rootName = this.type;
	    if (!rootName) {
	        rootName = this.rootType;
	    }
	    var rootElement = xmlSnapshot.createElement(rootName);

	    if (this.textValue) {
	        var textNode = xmlSnapshot.createTextNode(this.textValue);
	        rootElement.appendChild(textNode);
	    }

	    // go through the ordered fields array and generate the XML
	    // based on the type of the field
	    for (i=0; i< orderedFields.length; i++) {

	        var fieldName = orderedFields[i];
	        if (this[fieldName] !== null && this[fieldName] !== undefined) {

	            var fieldValue = this[fieldName];

	            // a function with same name serves as getter function
	            if ((typeof this[fieldName]) == "function") {
	                fieldValue = this[fieldName]();
	            }

	            if (fieldValue instanceof tem.model.XMLWrapper) {
	                var fieldXML = new ActiveXObject("Microsoft.XMLDOM"); 
	                fieldXML.loadXML(fieldValue.xmlString);
						
	                for(var j=0; j<fieldXML.childNodes.length; j++){
	                    rootElement.appendChild(fieldXML.childNodes[j]);
	                }
						
	            } else if (fieldValue instanceof tem.model.XMLSerializableObject) {
	                rootElement.appendChild(fieldValue.toXML(false));

	            } else if (tem.javascriptUtils.isArray(fieldValue)) {
	                for (j = 0; j < fieldValue.length; j++) {
	                    var item = fieldValue[j];
							
	                    if(item instanceof tem.model.XMLSerializableObject) {
	                        rootElement.appendChild(item.toXML(false));
	                    } else {
	                        var fieldNode = xmlSnapshot.createElement(fieldName);
	                        var itemNode = xmlSnapshot.createTextNode(item);
	                        fieldNode.appendChild(itemNode);
	                        rootElement.appendChild(fieldNode);
	                    }
	                }
	            } else {
	                if (typeof fieldValue === 'boolean') {
	                    if (fieldValue) {
	                        fieldValue = 'true';
	                    } else {
	                        fieldValue = 'false';
	                    }
	                }

	                var fieldNode2 =  xmlSnapshot.createElement(fieldName);
	                var itemNode2 =xmlSnapshot.createTextNode(fieldValue);
	                fieldNode2.appendChild(itemNode2);
	                rootElement.appendChild(fieldNode2);
	            }
	        }
	    }

	    var attributes = this.attributes;
	    for (var i = 0; i < attributes.length; i++) {
	        var attrName = attributes[i];
	        var attrValue = this[attrName];
	        if (attrValue !== null && attrValue !== undefined) {

	            if (typeof attrValue === 'boolean') {
	                if (attrValue) {
	                    attrValue = 'true';
	                } else {
	                    attrValue = 'false';
	                }
	            }

	            rootElement.setAttribute(attrName, attrValue);
	        }
	    }

	    if (this.rootType !== null) {
	        var topRootElement;
	        if (this.type) {
	            topRootElement = xmlSnapshot.createElement(this.rootType);
	            topRootElement.appendChild(rootElement);
	        } else {
	            topRootElement = rootElement;
	        }

	        if(skipUI !== false && skipUI !== null && skipUI !== undefined) {
	            topRootElement.setAttribute('SkipUI', 'true');
	        }

	        return topRootElement;
	    }

	    return rootElement;
	};

	
    /**
     * <p>This method deserializes an XML string and populates the model object's properties based
     * on the contents of the XML, recursively creating "sub-model objects" where needed.</p>
     * 
     * <p>For example:</p>
     * 
     * <pre>
     * var testFixlet = new tem.model.Fixlet();
     * testFixlet.Title = "Test Fixlet";
     * ...
     * var testAction = new tem.model.FixletAction("action1");
     * testAction.ActionScript = "// do nothing";
     * testFixlet.addAction(testAction);
     * 
     * var fixletId = tem.content.createContent(testFixlet, true, false);
     * var fixletXML = tem.evalRel('(fixlet whose (id of it = ' + fixletId +') of bes sites whose (name of it = "ActionSite")) as xml');	
     * var builtFixlet = new tem.model.Fixlet();
     * builtFixlet.fromXML(fixletXML);
     * </pre>
     * 
     * <p>would result in the builtFixlet model object having all of its properties set based on the retrieved XML, including
     * having its Action property populated with a tem.model.FixletAction object.</p>
     * 
     * @param {String} nodeXML  String representation of an XML object.
     */
	tem.model.XMLSerializableObject.prototype.fromXML =  function (nodeXML) {
	
		tem.logging.debug("fromXML(): " + nodeXML);

		var node = new ActiveXObject("Microsoft.XMLDOM");
		var model;
		
		node.loadXML(nodeXML);	
		model = this;
		
		if( node.selectSingleNode("BES") != null){
			// called from root model object
			var besRoot =  node.selectSingleNode("BES");
			node = besRoot.childNodes[0];
		} else {
			// get rid of the document node
			node = node.childNodes[0];
		}	

		tem.logging.debug("deserializing: " + node.nodeName);

		setModelPropertiesFromAttributes(model, node);

		for (var i = 0; i < node.childNodes.length; i++) {
			var childNode = node.childNodes[i];
			
			var fieldType;
			var fieldName = childNode.nodeName;
			var fieldValue;
			
			// figure out the type
			var hasSubModel = true;
			
			if (model.typeMap[fieldName] != null || model.typeMap[fieldName + "XML"] != null) {
				
				if (model.typeMap[fieldName + "XML"] != null){
					fieldName = fieldName + "XML"
				}
				
				fieldType = model.typeMap[fieldName];
				if ((fieldType == "String" || fieldType == "Boolean" || fieldType == "Number")) {
					hasSubModel = false;
					tem.logging.debug(tab + "fieldName: " + fieldName + " fieldType: " + fieldType + " hasSubModel: " + hasSubModel);
				} else if (fieldType.subType != null && (fieldType.subType == "String" || fieldType.subType == "Boolean" || fieldType.subType == "Number")) {
					hasSubModel = false;
					tem.logging.debug(tab + "fieldName: " + fieldName + " fieldSubType: " + fieldType.subType + " hasSubModel: " + hasSubModel);
				}
				
			} else {
				fieldType = fieldName;
				hasSubModel = false;
				tem.logging.debug(tab + "fieldName: " + fieldName + " fieldType: " + fieldType + " hasSubModel: " + hasSubModel);
			}
			
			if (!hasSubModel) {
				if (fieldType.subType != null) {
					fieldValue = getTypedValue(fieldType.subType, childNode.text);
					var addName = fieldType.addName ? fieldType.addName : "add" + fieldName;
					tem.logging.debug(tab + "fieldValue: " + fieldValue + " addName: " + addName);
					model[addName].apply(model, [fieldValue]);
				} else {
					fieldValue = getTypedValue(fieldType, childNode.text);
					tem.logging.debug(tab + "fieldValue: " + fieldValue);
					model[fieldName] = fieldValue;
				}
				
			} else {
			
				if (fieldType.subType != null) {
					// it is part of an array of model objects
					var subModel = tem.javascriptUtils.classFactory("tem.model." + fieldType.subType);
					fieldValue = subModel.fromXML(childNode.xml);
					var addName = fieldType.addName ? fieldType.addName : "add" + fieldName;
					tem.logging.debug(tab + "calling addName on subModel: " + addName);
					model[addName].apply(model, [fieldValue]);
				} else {
					var subModel = tem.javascriptUtils.classFactory("tem.model." + fieldType);
					tem.logging.debug(tab + "calling fromXML on subModel");
					model[fieldName] = subModel.fromXML(childNode.xml);
				}
				
			}
		}

		return model;
	};		
	
	

	tem.model.XMLSerializableObject.prototype._addTypeMapProperties = function (properties){
		for(var key in properties){
			this.typeMap[key] = properties[key];
		}
	}


	function isEmptyNode(node){
		return (node.childNodes.length == 0 && (node.attributes==null || node.attributes.length == 0));
	}

	function containsTextNode(node){
		// has one node of type text or cdata
		return (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4));
	}	
	
	function setModelPropertiesFromAttributes(model, node){
		for(var i=0; i<node.attributes.length; i++) {
	
			var fieldType;
			var attribute = node.attributes[i];
			
			if(model.typeMap[attribute.nodeName] != null)	{
				fieldType = model.typeMap[attribute.nodeName];
			} else {
				fieldType = attribute.nodeName;
			}
				
			model[attribute.nodeName] = getTypedValue(fieldType, attribute.nodeValue);
		}
	}	

	function getTypedValue(type, value){
		var typedValue;
		
		switch(type){
			case "String":
				typedValue = value;
				break;
			case "Boolean":
				typedValue= (value=="true")?true:false;
				break;
			case "Number":
				typedValue=parseInt(value);
				break;
			default:
				// undefined means String
				typedValue = value;
				break;	
		}
		
		return typedValue;		
	}	
	
	
	/**
	 * @class Container for multiple XMLSerializableObjects.
	 * 
	 * @augments tem.model.XMLSerializableObject
	 */
	tem.model.MultipleItems = function() {
		tem.model.XMLSerializableObject.call(this);
	
		this.type = null;
		this.rootType = "BES";
		
		this._items = [];
		this.orderedFields = ["_itemAssembler"];

	};
	tem.model.MultipleItems.prototype = new tem.model.XMLSerializableObject();

	tem.model.MultipleItems.prototype.fromXML = function(){
		tem.logging.error("fromXML() can not be called on tem.model.MultipleItems");
		throw new Error(temui.l10n.adfapi.errorInternal);
	}

	tem.model.MultipleItems.prototype._itemAssembler = function () {
	    var copiedItems = [];
	    for (var i = 0; i < this._items.length; i++) {
	        // make a shallow-copied clone of each item so that we can change its rootType
	        var copiedItem = new tem.model.XMLSerializableObject();
	        for (var p in this._items[i]) {
	            copiedItem[p] = this._items[i][p];
	        }
	        copiedItem.rootType = null;
	        copiedItems.push(copiedItem);
	    }
	    return copiedItems;
	};

    /**
     * Add a model object item to the collection
     * The item can be an XMLSerializableObject, but it can not be a MultipleItems.
     * @param {tem.model.XMLSerializableObject} item
     */
	tem.model.MultipleItems.prototype.addItem = function(item) {
	    if ((item instanceof tem.model.XMLSerializableObject)
            && !(item instanceof tem.model.MultipleItems)
            && (item.rootType == "BES")) {
	        this._items.push(item);
	    } else {
	        tem.logging.error('Invalid item is added to MultipleItems object.');
	        throw new Error(temui.l10n.adfapi.errorCreatingContent);
	    }
	};


    /**
     * Remove a model object item from the collection
     * @param {tem.model.XMLSerializableObject} item
     */
	tem.model.MultipleItems.prototype.removeItem = function(item) {
        if(!tem.javascriptUtils.arrayRemoveElement(item, this._items)){
        	tem.logging.log('The item is not found');
        }
	};
	
	/**
	 * @class Base class for action model objects.
	 * 
	 * @property {String} Title
	 * @property {String} Relevance
	 * @property {String | tem.model.XMLWrapper} ActionScript
	 * @property {tem.model.BaseActionSuccessCriteria} SuccessCriteria
	 * @property {tem.model.XMLWrapper} SuccessCriteriaXML (deprecated)
	 * @property {Boolean} SuccessCriteriaLocked
     *
     * @property {Array<tem.model.ActionParameter>} Parameter Added in 9.0 (Gilman)
     * @property {Array<tem.model.ActionSecureParameter>} SecureParameter Added in 9.0 (Gilman)
	 * 
	 * 
	 * @augments tem.model.XMLSerializableObject
	 */
	tem.model.BaseAction = function() {
		tem.model.XMLSerializableObject.call(this);

		this.Title = null;
		this.Relevance = null;
		this.ActionScript = null;
		this.SuccessCriteria = null;
		this.SuccessCriteriaXML = null;
		this.SuccessCriteriaLocked = null;

	    // Available since 9.0
		this.Parameter = [];
		this.SecureParameter = [];

		this.typeMap = {ActionScript:"_ActionScriptWrapper",
			            SuccessCriteria:"BaseActionSuccessCriteria", 
			            SuccessCriteriaLocked: "Boolean",
			            Parameter: { subType: "ActionParameter", addName: "addParameter" },
			            SecureParameter: { subType: "ActionSecureParameter", addName: "addSecureParameter" }
		};
	    // SecureParameter is not exported to xml
		
		this.orderedFields = ["Title",
                              "Relevance",
                              "ActionScript",
                              "SuccessCriteria",
                              "SuccessCriteriaLocked",
                              "Parameter",          // Added in 9.0 (Gilman)
                              "SecureParameter"     // Added in 9.0 (Gilman)
		                     ];
	};
	tem.model.BaseAction.prototype = new tem.model.XMLSerializableObject();

    /**
     * Add a secure parameter to action.
     * 
     * @param {tem.model.ActionSecureParameter} parameter
     *
     */
	tem.model.BaseAction.prototype.addSecureParameter = function (parameter) {
	    this.SecureParameter.push(parameter);
	}

    /**
     * Remove a secure parameter from the action.
     * 
     * @param {tem.model.ActionSecureParameter} parameter
     *
     */
	tem.model.BaseAction.prototype.removeSecureParameter = function (parameter) {
	    if(!tem.javascriptUtils.arrayRemoveElement(parameter, this.SecureParameter)){
			tem.logging.log('The parameter is not found');
	    }
	}

    /**
     * Add a parameter to action.
     * 
     * @param {tem.model.ActionParameter} parameter
     *
     */
	tem.model.BaseAction.prototype.addParameter = function (parameter) {
	    this.Parameter.push(parameter);
	}


    /**
     * Remove a parameter from the action.
     * 
     * @param {tem.model.ActionParameter} parameter
     *
     */
	tem.model.BaseAction.prototype.removeParameter = function (parameter) {
	    if(! tem.javascriptUtils.arrayRemoveElement(parameter, this.Parameter)){
	        tem.logging.log('The parameter is not found');
	    }
	}

    /**
	 * <strong>Added in 9.0 (Gilman)</strong>
	 * Model for Action Parameter.
	 * 
     * @class 
     *
     * @param {String} name
     * @param {String} value
     *
	 * @property {String} Name
	 * @property {String} textValue
	 * 
	 * 
	 * @augments tem.model.XMLSerializableObject
	 */
	tem.model.ActionParameter = function (name, value) {
	    tem.model.XMLSerializableObject.call(this);

	    this.type = "Parameter";

	    this.Name = name;
	    this.textValue = value;

	    this.attributes = ["Name"];
	};

	tem.model.ActionParameter.prototype = new tem.model.XMLSerializableObject();


	tem.model.ActionParameter.prototype.fromXML = function (nodeXML) {
	    var node = new ActiveXObject("Microsoft.XMLDOM");
	    node.loadXML(nodeXML);
	    node = node.childNodes[0];

	    var model = this;
	    setModelPropertiesFromAttributes(this, node);

	    this.textValue = node.text;

	    return this;
	};

    /**
	 * <strong>Added in 9.0 (Gilman)</strong>
	 *
     * Model for Action SecureParameter. 
     * When SecureParameter is used, action must be targeted at a set of computers by ID or by Name.
     * 
     * Bad Request error can be thrown when invalid Computer ID or Name is used to target computers.
     * 
     * 
     * @class 
     * 
     * @param {String} name
     * @param {String} value
     *
	 * @property {String} Name
	 * @property {String} textValue
	 * 
     * @see tem.model.ActionTargetByComputerID
     * @see tem.model.ActionTargetByComputerName
	 * 
	 * @augments tem.model.ActionParameter
	 */
	tem.model.ActionSecureParameter = function (name, value) {
	    tem.model.ActionParameter.call(this, name, value);
	    this.type = "SecureParameter";
	};

	tem.model.ActionSecureParameter.prototype = new tem.model.ActionParameter();



    /**
	 * <strong>Added in 9.0 (Gilman)</strong>
     * Model for BESActionTarget. Do not use this class directly. Refer to its subclasses.
     *
	 * @class 
	 * 
	 * @augments tem.model.XMLSerializableObject
     *
	 * @see tem.model.ActionTargetByComputerName
	 * @see tem.model.ActionTargetByComputerID
	 * @see tem.model.ActionTargetByCustomRelevance
	 * @see tem.model.ActionTargetAllComputers
	 */
	tem.model.BaseActionTarget = function () {
	    tem.model.XMLSerializableObject.call(this);

	    this.type = "Target";
	};
	tem.model.BaseActionTarget.prototype = new tem.model.XMLSerializableObject();
    


    /**
	 * <strong>Added in 9.0 (Gilman)</strong>
	 * Target computers by computer name.
     *
     * @class 
     *
	 * @property {Array<String>} ComputerName
	 * 
	 * @augments tem.model.BaseActionTarget
	 */
	tem.model.ActionTargetByComputerName = function () {
	    tem.model.BaseActionTarget.call(this);

	    this.ComputerName = [];

	    this.orderedFields = ["ComputerName"];
	};
	tem.model.ActionTargetByComputerName.prototype = new tem.model.BaseActionTarget();

    /**
     * Add a computer by using its name.
     * 
     * @param {String} computerName
     */
	tem.model.ActionTargetByComputerName.prototype.addComputerName = function (computerName) {
	    this.ComputerName.push(computerName);
	}

    /**
     * Remove the computer name from the target computer list
     * 
     * @param {String} computerName
     */
	tem.model.ActionTargetByComputerName.prototype.removeComputerName = function (computerName) {
	    if(! tem.javascriptUtils.arrayRemoveElement(computerName, this.ComputerName)){
   			tem.logging.log('The computer name is not found');
		}
	}

    
    /**
	 * <strong>Added in 9.0 (Gilman)</strong>
	 * Target computers by computer ID.
     *
     * @class 
     *
	 * @property {Array<Integer>} ComputerID
	 * 
	 * @augments tem.model.BaseActionTarget
	 */
	tem.model.ActionTargetByComputerID = function () {
	    tem.model.BaseActionTarget.call(this);

	    this.ComputerID = [];

	    this.orderedFields = ["ComputerID"];
	};
	tem.model.ActionTargetByComputerID.prototype = new tem.model.BaseActionTarget();

    /**
     * Add a computer by using its computer ID.
     *
     * @param {Integer} computerID
     */
	tem.model.ActionTargetByComputerID.prototype.addComputerID = function (computerID) {
	    this.ComputerID.push(computerID);
	}

    /**
     * Remove the computer ID from the target computer list.
     *
     * @param {Integer} computerID
     */
	tem.model.ActionTargetByComputerID.prototype.removeComputerID = function (computerID) {
	    if(! tem.javascriptUtils.arrayRemoveElement(computerID, this.ComputerID)){
   			tem.logging.log('The computerID is not found');
		}
	}

    /**
	 * <strong>Added in 9.0 (Gilman)</strong>
	 * Target computers by relevance.
     *
     * @class 
     *
     * @param {String} relevance
     * 
     * @property {String} CustomRelevance
	 * 
	 * @augments tem.model.BaseActionTarget
	 */
	tem.model.ActionTargetByCustomRelevance = function (relevance) {
	    tem.model.BaseActionTarget.call(this);

	    this.CustomRelevance = relevance;

	    this.orderedFields = ["CustomRelevance"];
	};
	tem.model.ActionTargetByCustomRelevance.prototype = new tem.model.BaseActionTarget();

    /**
	 * <strong>Added in 9.0 (Gilman)</strong>
	 * Target all computers.
     *
     * @class 
	 * 
	 * @augments tem.model.BaseActionTarget
	 */
	tem.model.ActionTargetAllComputers = function () {
	    tem.model.BaseActionTarget.call(this);

	    this.AllComputers = true;

	    this.orderedFields = ["AllComputers"];
	};
	tem.model.ActionTargetAllComputers.prototype = new tem.model.BaseActionTarget();


	/**
	 * @param {String} title
	 * @param {String} relevance
	 * @param {String | tem.model.XMLWrapper} actionScript
	 * 
	 * @property {tem.model.ActionSettings} Settings
	 * @property {tem.model.XMLWrapper} SettingsLocks
	 * @property {Boolean} IsUrgent
     *
     * @property {tem.model.BaseActionTarget} Target Added in 9.0 (Gilman)
	 * 
	 * @augments tem.model.BaseAction
	 * @class
	 */
	tem.model.SingleAction = function(title, relevance, actionScript) {
		tem.model.BaseAction.call(this);

		this.type="SingleAction";
		this.rootType="BES";
		
		this.Title = title;
		this.Relevance = relevance;
		this.ActionScript = actionScript;

		this.Settings = null;
		this.SettingsLocks = null;
		this.IsUrgent = null;

	    // since 9.0
		this.Target = null;

	    // target is not exported to xml
		this._addTypeMapProperties({
		    Settings: "ActionSettings",
		    SettingsLocks: "XMLWrapper",
		    IsUrgent: "Boolean",
		    Target: "BaseActionTarget"
		});

		this.orderedFields = this.orderedFields.concat(["Settings",
						                                "SettingsLocks",
						                                "IsUrgent",
		                                                "Target"       // since 9.0
		                                               ]);
	};
	tem.model.SingleAction.prototype = new tem.model.BaseAction();



    /**
     * @class
     * 
	 * @property {String} Title
	 * @property {String} Relevance
	 * @property {String | tem.model.XMLWrapper} PreGroupActionScript
	 * @property {Array.<tem.model.MemberAction>} MemberAction
	 * @property {String | tem.model.XMLWrapper} PostGroupActionScript
	 * @property {tem.model.ActionSettings} Settings
	 * @property {tem.model.XMLWrapper} SettingsLocks
     * 
     * @property {tem.model.BaseActionTarget} Target Added in 9.0 (Gilman)
	 * 
	 */
	tem.model.MultipleActionGroup = function () {
	    tem.model.XMLSerializableObject.call(this);

	    this.type = "MultipleActionGroup";
	    this.rootType = "BES";

	    this.Title = null;
	    this.Relevance = null;
	    this.PreGroupActionScript = null;
	    this.PostGroupActionScript = null;
	    this.Settings = null;
	    this.SettingsLocks = null;
	    this.MemberAction = [];

	    // since 9.0
	    this.Target = null;

		// PreGroupActionScript and PostGroupActionScript don't get populated when retrieving via session relevance
		// so not sure their mappings will ever get used
		this.typeMap = {PreGroupActionScript:"_ActionScriptWrapper", 
			MemberAction:{subType:"MemberAction", addName:"addAction"},
			PostGroupActionScript:"_ActionScriptWrapper",
			Settings:"ActionSettings",
			SettingsLocks:"XMLWrapper"};

	    this.orderedFields = ["Title",
						"Relevance",
						"PreGroupActionScript",
						"MemberAction",
						"PostGroupActionScript",
						"Settings",
						"SettingsLocks",
		                "Target"       // since 9.0
	                    ];
	};
	tem.model.MultipleActionGroup.prototype = new tem.model.XMLSerializableObject();




    /**
     * Add an action to the multiple action group
     * 
     * @param {tem.model.MemberAction} action
     */
	tem.model.MultipleActionGroup.prototype.addAction = function (action) {
	    this.MemberAction.push(action);
	}

    /**
     * Remove the action from the multiple action group
     * 
     * @param {tem.model.MemberAction} action
     */
	tem.model.MultipleActionGroup.prototype.removeAction = function (action) {
	    if(! tem.javascriptUtils.arrayRemoveElement(action, this.MemberAction)){
   			tem.logging.log('The action is not found');
		}
	}


    /**
     *
	 * @param {String} title
	 * @param {String} relevance
     * @param {String | tem.model.XMLWrapper} actionScript
     *
	 * @property {Boolean} IncludeInGroupRelevance
     *
     * @class
     */
	tem.model.MemberAction = function (title, relevance, actionScript) {
	    tem.model.BaseAction.call(this);

	    this.type = "MemberAction";

	    this.Title = title;
	    this.Relevance = relevance;
	    this.ActionScript = actionScript;

	    this.IncludeInGroupRelevance = null;

		this._addTypeMapProperties({IncludeInGroupRelevance:"Boolean"});
	    this.orderedFields.push("IncludeInGroupRelevance");
	};
	tem.model.MemberAction.prototype = new tem.model.BaseAction();






	/**
	 * @property {Boolean} HasMessage
	 * @property {tem.model.XMLWrapper} MessageXML (taken from schema)
	 * <pre>
	 * &lt;xs:complexType&gt;
	 *  &lt;xs:sequence&gt;
	 *    &lt;xs:group minOccurs="0" ref="Message"/&gt;
	 *    &lt;xs:element minOccurs="0" name="ShowActionButton" type="xs:boolean"/&gt;
	 *    &lt;xs:element minOccurs="0" name="ShowCancelButton" type="xs:boolean"/&gt;
	 *    &lt;xs:element minOccurs="0" name="AllowPostponement" type="xs:boolean"/&gt;
	 *    &lt;xs:element minOccurs="0" name="MaxPostponementInterval" type="ActionMessageMaxPostponementInterval"/&gt;
	 *    &lt;xs:element minOccurs="0" name="PostponementDeadlineOffset" type="TimeInterval"/&gt;
	 *    &lt;xs:element minOccurs="0" name="HasTimeout" type="xs:boolean"/&gt;
	 *    &lt;xs:element minOccurs="0" name="TimeoutInterval" type="ActionMessageTimeInterval"/&gt;
	 *  &lt;/xs:sequence&gt;
	 * &lt;/xs:complexType&gt;
	 * </pre>
	 * @property {String} ActionUITitle
	 * @property {Boolean} PreActionShowUI
	 * @property {tem.model.XMLWrapper} PreActionXML (from schema)
	 * <pre>
	 *	&lt;xs:element name="PreAction" minOccurs="0"&gt;
	 *		&lt;xs:complexType&gt;
	 *			&lt;xs:sequence&gt;
	 *			&lt;xs:element	name="Text"	type="xs:string" minOccurs="0" /&gt;
	 *			&lt;xs:element	name="AskToSaveWork" type="xs:boolean" minOccurs="0" /&gt;
	 *			&lt;xs:element	name="ShowActionButton"	type="xs:boolean" minOccurs="0" /&gt;
	 *			&lt;xs:element	name="ShowCancelButton"	type="xs:boolean" minOccurs="0" /&gt;
	 *			&lt;xs:element	name="DeadlineBehavior"	type="ActionDeadlineBehavior" minOccurs="0" /&gt;
	 *			&lt;xs:element	name="DeadlineType"	minOccurs="0"&gt;
	 *				&lt;xs:simpleType&gt;
	 *				&lt;xs:restriction	base="xs:string"&gt;
	 *					&lt;xs:enumeration value="Interval" /&gt;
	 *					&lt;xs:enumeration value="Absolute" /&gt;
	 *				&lt;/xs:restriction&gt;
	 *				&lt;/xs:simpleType&gt;
	 *			&lt;/xs:element&gt;
	 *			&lt;xs:element	name="DeadlineInterval"	type="ActionMessageTimeInterval" minOccurs="0" /&gt;
	 * 			&lt;xs:choice&gt;
	 * 				&lt;xs:element	name="DeadlineOffset" type="TimeInterval" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="DeadlineLocalOffset" type="TimeInterval" minOccurs="0" /&gt;
	 *			&lt;/xs:choice&gt;
	 *			&lt;xs:element	name="ShowConfirmation"	type="xs:boolean" minOccurs="0" /&gt;
	 *			&lt;xs:element	name="Confirmation"	type="xs:string" minOccurs="0" /&gt;
	 *			&lt;/xs:sequence&gt;
	 *		&lt;/xs:complexType&gt;
	 *	&lt;/xs:element&gt;
	 * </pre>
	 * @property {Boolean} HasRunningMessage
	 * @property {tem.model.XMLWrapper} RunningMessageXML
	 * <pre>
	 *	&lt;xs:element name="RunningMessage"	minOccurs="0"&gt;
	 *		&lt;xs:complexType&gt;
	 *			&lt;xs:sequence&gt;
	 *				&lt;xs:element	name="Title" type="xs:string" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Text"	type="xs:string" minOccurs="0" /&gt;
	 *			&lt;/xs:sequence&gt;
	 *		&lt;/xs:complexType&gt;
	 *	&lt;/xs:element&gt;
	 * </pre> 
	 * @property {Boolean} HasTimeRange
	 * @property {tem.model.XMLWrapper} TimeRangeXML (from schema)
	 * <pre>
		&lt;xs:element name="TimeRange" minOccurs="0"&gt;
			&lt;xs:complexType&gt;
				&lt;xs:sequence&gt;
					&lt;xs:element	name="StartTime" type="xs:time" minOccurs="0" /&gt;
					&lt;xs:element	name="EndTime" type="xs:time" minOccurs="0"	/&gt;
				&lt;/xs:sequence&gt;
			&lt;/xs:complexType&gt;
		&lt;/xs:element>
	 * </pre>
	 * @property {Boolean} HasStartTime
	 * @property {String} StartDateTimeOffset Use StartDateTimeOffset to specify the start time using GMT as the reference time.
	 * Instead of setting StartDateTimeOffset as of <b> TEM 8.1 patch #2+</b> you can specify the 
	 * <span class="fixedFont light">{String}</span> <span class="fixedFont">StartDateTimeLocalOffset</span> property to 
	 * specify the start time using local time as the reference time.
	 * 
	 * <p>For example, suppose it's January 1, 12:00 local time and your time zone is GMT-8.
	 * 		<br>&nbsp;&nbsp;"StartDateTimeOffset = 1 day, 2 hours" sets the start time to Janary 2, 22:00.
	 * 		<br>&nbsp;&nbsp;"StartDateTimeLocalOffset = 1 day, 2 hours" sets the start time to January 2, 14:00.
	 * </p>
	 * 
	 * <p>These values need to be set according to the following RegExp specified in
	 * the XML schema:</p>
	 *
	 * <p>P([0-9]+D)?(T([0-9]+H)?([0-9]+M)?([0-9]+(\.[0-9]{1,6})?S)?)?</p>
	 *
	 * <p>A sample value would be "P1DT23H59M48S"</p>
	 * 
	 * @property {String} StartDateTimeLocalOffset (See notes for StartDateTimeOffset)
	 * @property {Boolean} HasEndTime
	 * @property {String} EndDateTimeOffset  Use EndDateTimeOffset to specify the end time using GMT as the reference time.
	 * Instead of setting EndDateTimeOffset as of <b> TEM 8.1 patch #2+</b> you can specify the 
	 * <span class="fixedFont light">{String}</span> <span class="fixedFont">EndDateTimeLocalOffset</span> property to 
	 * specify the end time using local time as the reference time.
	 * 
	 * <p>For example, suppose it's January 1, 12:00 local time and your time zone is GMT-8.
	 * 		<br>&nbsp;&nbsp;"EndDateTimeOffset = 1 day, 2 hours" sets the end time to Janary 2, 22:00.
	 * 		<br>&nbsp;&nbsp;"EndDateTimeLocalOffset = 1 day, 2 hours" sets the end time to January 2, 14:00.
	 * </p>
	 * 
	 * <p>These values need to be set according to the following RegExp specified in
	 * the XML schema:</p>
	 *
	 * <p>P([0-9]+D)?(T([0-9]+H)?([0-9]+M)?([0-9]+(\.[0-9]{1,6})?S)?)?</p>
	 *
	 * <p>A sample value would be "P1DT23H59M48S"</p>
	 * 
	 * @property {String} EndDateTimeLocalOffset (See notes for EndDateTimeOffset)
	 * @property {Boolean} HasDayOfWeekConstraint
	 * @property {tem.model.XMLWrapper} DayOfWeekConstraintXML (taken from schema)
	 * <pre>
	 *	&lt;xs:element name="DayOfWeekConstraint" minOccurs="0"&gt;
	 *		&lt;xs:complexType&gt;
	 *			&lt;xs:sequence&gt;
	 *				&lt;xs:element	name="Sun" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Mon" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Tue" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Wed" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Thu" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Fri" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Sat" type="xs:boolean" minOccurs="0" /&gt;
	 *			&lt;/xs:sequence&gt;
	 *		&lt;/xs:complexType&gt;
	 *	&lt;/xs:element&gt;
	 * </pre>
	 * @property {String} ActiveUserRequirement Must be "NoRequirement",  "RequireUser" or  "RequireNoUser"
	 * @property {String} ActiveUserType Must be "AllUsers",  "LocalUsers" or  "UsersOfGroups"
	 * @property {tem.model.XMLWrapper} UIGroupConstraintsXML (taken from schema)
	 * <pre>
	 *	&lt;xs:element name="UIGroupConstraints" minOccurs="0"&gt;
	 *		&lt;xs:complexType&gt;
	 *			&lt;xs:choice maxOccurs="unbounded"&gt;
	 *				&lt;xs:element	name="Win9xGroup" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="WinNTGroup" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="LocalGroup" minOccurs="0"	maxOccurs="unbounded"&gt;
	 *					&lt;xs:complexType&gt;
	 *						&lt;xs:attribute name="Name" type="xs:string" use="required" /&gt;
	 *					&lt;/xs:complexType&gt;
	 *				&lt;/xs:element&gt;
	 *				&lt;xs:element	name="DomainGroup" minOccurs="0" maxOccurs="unbounded"&gt;
	 *					&lt;xs:complexType&gt;
	 *						&lt;xs:attribute name="Name" type="xs:string" use="required" /&gt;
	 *						&lt;xs:attribute name="Sid" type="xs:string" use="required" /&gt;
	 *					&lt;/xs:complexType&gt;
	 *				&lt;/xs:element&gt;
	 *			&lt;/xs:choice&gt;
	 *		&lt;/xs:complexType&gt;
	 *	&lt;/xs:element&gt;
	 * </pre>
	 * @property {Boolean} HasWhose 
	 * @property {tem.model.XMLWrapper} WhoseXML (from schema)
	 * <pre>
	 *	&lt;xs:element name="Whose" minOccurs="0"&gt;
	 *		&lt;xs:complexType&gt;
	 *			&lt;xs:sequence&gt;
	 *				&lt;xs:element	name="Property" type="xs:string" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Relation" minOccurs="0"&gt;
	 *					&lt;xs:simpleType&gt;
	 *						&lt;xs:restriction	base="xs:string" /&gt;
	 *					&lt;/xs:simpleType&gt;
	 *				&lt;/xs:element&gt;
	 *				&lt;xs:element	name="Value" type="xs:string" minOccurs="0" /&gt;
	 *			&lt;/xs:sequence&gt;
	 *		&lt;/xs:complexType&gt;
	 *	&lt;/xs:element&gt;
	 * </pre>
	 * @property {Boolean} Reapply 
	 * @property {Boolean} HasReapplyLimit 
	 * @property {Number} ReapplyLimit 
	 * @property {Boolean} HasReapplyInterval 
	 * @property {String} ReapplyInterval Must have one of the following values:
	 * "PT15M","PT30M","PT1H","PT2H","PT4H","PT6H","PT8H","PT12H",
	 * "P1D","P2D","P3D","P5D","P7D","P15D","P30D"
	 * @property {Boolean} HasRetry 
	 * @property {Number} RetryCount 
	 * @property {tem.model.XMLWrapper} RetryWaitXML (from schema)
	 * <pre>
	 *	&lt;xs:element name="RetryWait" minOccurs="0"&gt;
	 *		&lt;xs:complexType&gt;
	 *			&lt;xs:simpleContent&gt;
	 *			&lt;xs:extension base="RetryWaitInterval"&gt;
	 *				&lt;xs:attribute name="Behavior"	default="WaitForInterval"&gt;
	 *				&lt;xs:simpleType&gt;
	 *					&lt;xs:restriction base="xs:string"&gt;
	 *					&lt;xs:enumeration	value="WaitForReboot" /&gt;
	 *					&lt;xs:enumeration	value="WaitForInterval" /&gt;
	 *					&lt;/xs:restriction&gt;
	 *				&lt;/xs:simpleType&gt;
	 *				&lt;/xs:attribute&gt;
	 *			&lt;/xs:extension&gt;
	 *			&lt;/xs:simpleContent&gt;
	 *		&lt;/xs:complexType&gt;
	 *	&lt;/xs:element&gt;
	 * </pre>
	 * @property {Boolean} HasTemporalDistribution 
	 * @property {String} TemporalDistribution This value needs to be set according to the following RegExp specified in
	 * the XML schema:
	 *
	 * <p>P([0-9]+D)?(T([0-9]+H)?([0-9]+M)?([0-9]+(\.[0-9]{1,6})?S)?)?</p>
	 *
	 * <p>A sample value would be "P1DT23H59M48S"</p>
	 * @property {Boolean} ContinueOnErrors
	 * @property {tem.model.XMLWrapper} PostActionBehaviorXML (from schema)
	 * <pre>
	 *	&lt;xs:element name="PostActionBehavior"	minOccurs="0"&gt;
	 *		&lt;xs:complexType&gt;
	 *			&lt;xs:sequence&gt;
	 *				&lt;xs:element	name="Behavior"	type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="AllowCancel" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Postponement"	type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Timeout" type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;xs:element	name="Deadline"	type="xs:boolean" minOccurs="0" /&gt;
	 *				&lt;!-- Postponement and Timeout were BES pre-7.0 options that	were replaced with Deadline	--&gt;
	 *				&lt;xs:group ref="MessageLocks" minOccurs="0" /&gt;
	 *			&lt;/xs:sequence&gt;
	 *		&lt;/xs:complexType&gt;
	 *	&lt;/xs:element&gt;
	 * </pre>
	 * @property {Boolean} IsOffer
	 * @property {String} OfferCategory
	 * @property {String} OfferDescriptionHTML
	 * 
	 * 
	 * 
	 * @augments tem.model.XMLSerializableObject 
	 * 
	 * 
	 * @class
	 */
	tem.model.ActionSettings = function() {
		tem.model.XMLSerializableObject.call(this);
		
		this.type="Settings";

		this.HasMessage = null;
		this.MessageXML = null;
		this.ActionUITitle = null;
		this.PreActionShowUI = null;
		this.PreActionXML = null;
		this.HasRunningMessage = null;
		this.RunningMessageXML = null;
		this.HasTimeRange = null;
		this.TimeRangeXML = null;
		this.HasStartTime = null;
		this.StartDateTimeOffset = null;
		this.StartDateTimeLocalOffset = null;
		this.HasEndTime = null;
		this.EndDateTimeOffset = null;
		this.EndDateTimeLocalOffset = null;
		this.HasDayOfWeekConstraint = null;
		this.DayOfWeekConstraintXML = null;
		this.ActiveUserRequirement = null;
		this.ActiveUserType = null; 
		this.UIGroupConstraintsXML = null;
		this.HasWhose = null;
		this.WhoseXML = null;
		this.Reapply = null;
		this.HasReapplyLimit = null;
		this.ReapplyLimit = null;
		this.HasReapplyInterval = null;
		this.ReapplyInterval = null;
		this.HasRetry = null;
		this.RetryCount = null;
		this.RetryWaitXML = null;
		this.HasTemporalDistribution = null;
		this.TemporalDistribution = null;
		this.ContinueOnErrors = null;
		this.PostActionBehaviorXML = null;
		this.IsOffer = null;
		this.OfferCategory = null;
		this.OfferDescriptionHTML = null;


		this.typeMap =  {MessageXML:"XMLWrapper", 
				PreActionXML:"XMLWrapper", 
				RunningMessageXML:"XMLWrapper", 
				TimeRangeXML:"XMLWrapper", 
				DayOfWeekConstraintXML:"XMLWrapper",
				UIGroupConstraintsXML:"XMLWrapper",
				WhoseXML:"XMLWrapper", 
				RetryWaitXML:"XMLWrapper", 
				PostActionBehaviorXML:"XMLWrapper",
				HasMessage:"Boolean",
				PreActionShowUI:"Boolean",
				HasRunningMessage:"Boolean",
				HasTimeRange:"Boolean",
				HasStartTime:"Boolean",
				HasEndTime:"Boolean",
				HasDayOfWeekConstraint:"Boolean",
				HasWhose:"Boolean",
				Reapply:"Boolean",
				HasReapplyLimit:"Boolean",
				ReapplyLimit:"Number",
				HasReapplyInterval:"Boolean",
				HasRetry:"Boolean",
				RetryCount:"Number",
				HasTemporalDistribution:"Boolean",
				ContinueOnErrors:"Boolean",
				IsOffer:"Boolean"
				};

		this.orderedFields = ["HasMessage",
				"MessageXML",
				"ActionUITitle",
				"PreActionShowUI",
				"PreActionXML",
				"HasRunningMessage",
				"RunningMessageXML",
				"HasTimeRange",
				"TimeRangeXML",
				"HasStartTime",
				"StartDateTimeOffset", // timeinterval
				"StartDateTimeLocalOffset", // timeinterval
				"HasEndTime",
				"EndDateTimeOffset", // nonnegativetimeinterval
				"EndDateTimeLocalOffset", // nonnegativetimeinterval
				"HasDayOfWeekConstraint",
				"DayOfWeekConstraintXML",
				"ActiveUserRequirement", //RESTRICTED TO NoRequirement RequireUser  RequireNoUser
				"ActiveUserType", //RESTRICTED to AllUsers LocalUsers UsersOfGroups
				"UIGroupConstraintsXML", //COMPLEX*
				"HasWhose", //BOOLEAN
				"WhoseXML", //COMPLEX
				"Reapply", //BOOLEAN
				"HasReapplyLimit", //BOOLEAN
				"ReapplyLimit", //UINT
				"HasReapplyInterval", //BOOLEAN
				"ReapplyInterval", //COMPLEX
				"HasRetry", //BOOLEAN
				"RetryCount", //UINT
				"RetryWaitXML", //COMPLEX
				"HasTemporalDistribution", //BOOLEAN
				"TemporalDistribution", // non negative TIMEINTERVAL
				"ContinueOnErrors", //BOOLEAN
				"PostActionBehaviorXML", //COMPLEX *
				"IsOffer", //BOOLEAN
				"OfferCategory", //STRING
				"OfferDescriptionHTML"];

	};

	tem.model.ActionSettings.prototype = new tem.model.XMLSerializableObject();



	/**
	 * 
	 * @property {String} Title This field should be localized using jxlat preprocessor tag.
	 * @property {String} Description This field should be localized using jxlat preprocessor tag.
	 * @property {Array} Relevance
	 * @property {String} Category This field should be localized using jxlat preprocessor tag.
	 * @property {tem.model.XMLWrapper} WizardDataXML 
	 * From schema:
	 * <pre>
	 * &lt;xs:element minOccurs="0" name="WizardData"&gt;
	 *	 &lt;xs:complexType&gt;
	 *		 &lt;xs:sequence&gt;
	 *			 &lt;xs:element minOccurs="0" name="Name" type="xs:string"/&gt;
	 *			 &lt;xs:element minOccurs="0" name="DataStore" type="xs:string"/&gt;
	 *			 &lt;xs:element minOccurs="0" name="StartURL" type="xs:string"/&gt;
	 *			 &lt;xs:element minOccurs="0" name="SkipUI" type="xs:string"/&gt;
	 *		 &lt;/xs:sequence&gt;
	 *	 &lt;/xs:complexType&gt;
	 * &lt;/xs:element&gt;
	 * </pre>
	 * @property {String} DownloadSize
	 * @property {String} Source This field should be localized using jxlat preprocessor tag.
	 * @property {String} SourceID This field should be localized using jxlat preprocessor tag.
	 * @property {String} SourceReleaseDate Must be of format YYYY-MM-DD
	 * @property {String} SourceSeverity This field should be localized using jxlat preprocessor tag.
	 * @property {String} CVENames
	 * @property {String} SANSID
	 * @property {Array} MIMEField Array of tem.model.MIMEField() objects
	 * @property {String} Domain Id of domain that content belongs to, i.e. SYST for Systems Lifecycle. Defaults to currently selected domain.
	 * For list of possible domains you can use: <pre>ids of bes domains</pre>
	 * @property {String} Delay This value needs to be set according to the following RegExp specified in
	 * the XML schema:
	 *
	 * <p>P([0-9]+D)?(T([0-9]+H)?([0-9]+M)?([0-9]+(\.[0-9]{1,6})?S)?)?</p>
	 *
	 * <p>A sample value would be "P1DT23H59M48S"</p>
	 * 
	 * 
	 * @augments tem.model.XMLSerializableObject
	 * @class 
	 */
	tem.model.BaseFixlet = function() {
	    tem.model.XMLSerializableObject.call(this);
		
		this.Title = null;
		this.Description = null;
		this.Relevance = [];

		this.Category = null;
		this.WizardDataXML = null;
		this.DownloadSize = null;			
		this.Source = null;
		this.SourceID = null;		
		this.SourceReleaseDate = null;
		this.SourceSeverity = null;
		this.CVENames = null;
		this.SANSID = null;
		this.MIMEField = [];
		this.Domain = null;
		this.Delay = null;

		this._wizardSourceMIME = null;
		this._wizardDataMIME = null;

		this.typeMap = {WizardDataXML:"XMLWrapper",
			MIMEField:{subType:"MIMEField"}, 
			Relevance:{subType:"String"} 
		};

		this.orderedFields = ["Title",
								"Description",
								"Relevance",
								"Category",
								"WizardDataXML",
								"DownloadSize",
								"Source",
								"SourceID",
								"SourceReleaseDate",
								"SourceSeverity",
								"CVENames",
								"SANSID",
								"MIMEField",
								"Domain",
								"Delay"];

	};
	tem.model.BaseFixlet.prototype = new tem.model.XMLSerializableObject();

    /**
     * Add a relevance to the fixlet
     * 
     * @param {String} relevance
     */
	tem.model.BaseFixlet.prototype.addRelevance = function addRelevance(relevance) {
	    this.Relevance.push(relevance);
	};

    /**
     * Remove the relevance from the fixlet
     * 
     * @param {String} relevance
     */
	tem.model.BaseFixlet.prototype.removeRelevance = function (relevance) {
	    if(! tem.javascriptUtils.arrayRemoveElement(relevance, this.Relevance)){
   			tem.logging.log('The relevance is not found');
		}
	};

    /**
     * @param {tem.model.MIMEField} mimeField
     */
	tem.model.BaseFixlet.prototype.addMIMEField =  function(mimeField) {
	    this.MIMEField.push(mimeField);
	};

    /**
     * @param {tem.model.MIMEField} mimeField
     */
	tem.model.BaseFixlet.prototype.removeMIMEField =  function(mimeField) {
	    if(! tem.javascriptUtils.arrayRemoveElement(mimeField, this.MIMEField)){
   			tem.logging.log('The mimeField is not found');
		}
	};

	tem.model.BaseFixlet.prototype.setWizardSource = function (sourceName) {
	    this._wizardSourceMIME = new tem.model.MIMEField("x-fixlet-adf-wizard-source", sourceName);
	    this.addMIMEField(this._wizardSourceMIME);
	};

	tem.model.BaseFixlet.prototype.getWizardSource = function getWizardSource() {
	    return this._wizardSourceMIME.Value;
	};

	tem.model.BaseFixlet.prototype.setWizardData = function(data) {
	    this._wizardDataMIME = new tem.model.MIMEField("x-fixlet-adf-wizard-data", data);
	    this.addMIMEField(this._wizardDataMIME);
	};

	tem.model.BaseFixlet.prototype.getWizardData = function getWizardData() {
	    return this._wizardDataMIME.Value;
	};

    /**
     * Concatenate all relevance with AND clause to form a single relevance
     * @private
     * @return {String}
     */
	tem.model.BaseFixlet.prototype._getCombinedRelevance = function () {
	    var combinedRelevance = "";
	    for (var i = 0; i < this.Relevance.length; i++) {
	        if (combinedRelevance == "") {
	            combinedRelevance = this.Relevance[i];
	        } else {
	            combinedRelevance = "(" + combinedRelevance + ") AND (" + this.Relevance[i] + ")";
	        }
	    }
	    return combinedRelevance;
	};


	/**
	 * @property {Array} Action Array of FixletActions
	 * @property {tem.model.DefaultAction} DefaultAction
	 * 
	 * @augments tem.model.BaseFixlet
	 * @class 
	 */
	tem.model.FixletWithActions = function() {
		tem.model.BaseFixlet.call(this); 
		this.type="Fixlet";
		this.rootType = "BES";

		this.Action = [];
		this.DefaultAction = null;

		this._addTypeMapProperties({Action:{subType:"FixletAction"}, DefaultAction:"DefaultAction"});

		this.orderedFields = this.orderedFields.concat(["DefaultAction","Action"]);

	};
	tem.model.FixletWithActions.prototype = new tem.model.BaseFixlet();

    /**
     * @param {tem.model.FixletAction} action
     */
	tem.model.FixletWithActions.prototype.addAction = function (action) {
	    this.Action.push(action);
	};

    /**
     * @param {tem.model.FixletAction} action
     */
	tem.model.FixletWithActions.prototype.removeAction = function (action) {
	    if(! tem.javascriptUtils.arrayRemoveElement(action, this.Action)){
   			tem.logging.log('The action is not found');
		}
	};


    /**
	 * @augments tem.model.FixletWithActions
	 * @class 
	 */
	tem.model.Fixlet = function() {
		tem.model.FixletWithActions.call(this);
	};
	tem.model.Fixlet.prototype = new tem.model.FixletWithActions();


	/**
	 * @param {String} id String identifier for action within a fixlet.
	 * 
	 * @property {String} ID
	 * @property {tem.model.ActionDescription} Description
	 * @property {String | tem.model.XMLWrapper} ActionScript
	 * @property {tem.model.BaseActionSuccessCriteria} SuccessCriteria
	 * @property {tem.model.XMLWrapper} SuccessCriteriaXML (deprecated)
	 * @property {Boolean} SuccessCriteriaLocked
	 * @property {tem.model.ActionSettings} Settings
	 * @property {tem.model.XMLWrapper} SettingsLocks
	 * 
	 * @augments tem.model.XMLSerializableObject
	 * @class
	 */
	tem.model.FixletAction = function(id) {
	    tem.model.XMLSerializableObject.call(this);
		
		this.type="Action";
		this.ID = id;

		this.Description = null;
		this.ActionScript = null;
		this.SuccessCriteria = null;
		this.SuccessCriteriaXML = null;
		this.SuccessCriteriaLocked = null;
		this.Settings = null;
		this.SettingsLocks = null;

		this.typeMap = {Description:"ActionDescription",
			ActionScript:"_ActionScriptWrapper",
			SuccessCriteria:"BaseActionSuccessCriteria", 
			SuccessCriteriaLocked:"Boolean",
			Settings:"ActionSettings",
			SettingsLocks:"XMLWrapper"};


		/**
		 * @inheritDoc
		 */
		this.orderedFields = ["Description",
					        "ActionScript",
					        "SuccessCriteria",
					        "SuccessCriteriaXML",
					        "SuccessCriteriaLocked",
					        "Settings",
					        "SettingsLocks"];

		this.attributes = ["ID"];

	};
	tem.model.FixletAction.prototype = new tem.model.XMLSerializableObject();


	/**
	 * @param {String} id String identifier for action within a fixlet.
	 * 
	 * @augments tem.model.FixletAction
	 * @class
	 */
	tem.model.DefaultAction = function(id){
		tem.model.FixletAction.call(this, id);
		this.type = 'DefaultAction';
	};
	tem.model.DefaultAction.prototype = new tem.model.FixletAction();

	/**
	 * ActionDescription can be initialized either by giving pre-link, link and post-link strings:
	 * <pre>
	 * var actionDescription =  new tem.model.ActionDescription('&lt;?rxlat Click?&gt;', '&lt;?rxlat here?&gt;', '&lt;?rxlat to take action X.?&gt;');
	 * </pre>
	 * 
     * Or by giving a full link string whose link is enclosed in &lt;link&gt; tag :<pre>
	 * var actionDescription =  new tem.model.ActionDescription('&lt;?rxlat Click &lt;link&gt;here&lt;/link&gt; to take action X.?&gt;');
	 * </pre>
	 * 
	 * @property {String} PreLink
	 * @property {String} Link
	 * @property {String} PostLink
	 * 
	 * @class
	 * @augments tem.model.XMLSerializableObject
	 */
	tem.model.ActionDescription = function(preLink, link, postLink) {
		tem.model.XMLSerializableObject.call(this);
		
		this.type = "Description";

		var fullLink = null;
		var START_LINK_TAG = "<link>";
		var END_LINK_TAG = "</link>";

		if (preLink && (preLink.indexOf(START_LINK_TAG) != -1)) {
		    fullLink = preLink;
		}
	    // for compatibility with flex version, either prelink or link variable can be used as full link
		if (link && (link.indexOf(START_LINK_TAG) != -1)) {
		    fullLink = link;
		}
		if (fullLink) {
		    this.PreLink = fullLink.substring(0, fullLink.indexOf(START_LINK_TAG));
		    this.Link = fullLink.substring(fullLink.indexOf(START_LINK_TAG) + START_LINK_TAG.length, fullLink.indexOf(END_LINK_TAG));
		    this.PostLink = fullLink.substring(fullLink.indexOf(END_LINK_TAG) + END_LINK_TAG.length);
		} else {
		    this.PreLink = preLink;
		    this.Link = link;
		    this.PostLink = postLink;
		}

		this.orderedFields = ["PreLink","Link","PostLink"];
	};
	tem.model.ActionDescription.prototype = new tem.model.XMLSerializableObject();

	/**
	 * 
	 * @augments tem.model.FixletWithActions
	 * @class
	 */
	tem.model.Task = function() {
		tem.model.FixletWithActions.call(this);
		this.type="Task";
	};
	tem.model.Task.prototype = new tem.model.FixletWithActions();



	/**
	 * 
	 * @param {String} name
	 * @param {String} value
	 * 
	 * @property {String} Name
	 * @property {String} Value
	 * 
	 * @augments  tem.model.XMLSerializableObject
	 * @class
	 */
	tem.model.MIMEField = function(name, value) {
		tem.model.XMLSerializableObject.call(this);
		
		this.type="MIMEField";
		this.Name = name;
		this.Value = value;

		this.orderedFields = ["Name", "Value"];
	};
	tem.model.MIMEField.prototype = new tem.model.XMLSerializableObject();


	/**
	 * Represents a wizard, used to associate a piece of content with the wizard that created it.
	 *  
	 *  
	 * @param {String} sourceName
	 * @param {Object} formData
	 * @param {String} siteKey
	 * 
	 * @class
	 */
	tem.model.WizardSource = function(sourceName, formData, siteKey) {
		this.sourceName = sourceName;
		this.formData = formData;
		this.siteKey = siteKey;
	};


    /**
	 * @class 
	 * @augments tem.model.BaseFixlet
	 */
	tem.model.Baseline = function () {
	    tem.model.BaseFixlet.call(this);
	    this.type = "Baseline";
	    this.rootType = "BES";

	    this.BaselineComponentCollection = new tem.model.BaselineComponentCollection();
	    this.Settings = null;
	    this.SettingsLocks = null;

		this._addTypeMapProperties({MIMEField:"MIMEField", 
									BaselineComponentCollection:"BaselineComponentCollection"});

	    this.orderedFields = this.orderedFields.concat(["BaselineComponentCollection",
					                                    "Settings",
					                                    "SettingsLocks"]);
	};
	tem.model.Baseline.prototype = new tem.model.BaseFixlet();

    /**
     * @param {tem.model.BaselineComponentGroup} componentGroup
     */
	tem.model.Baseline.prototype.addBaselineComponentGroup = function (componentGroup) {
	    this.BaselineComponentCollection.BaselineComponentGroup.push(componentGroup);
	};

    /**
     * @param {tem.model.BaselineComponentGroup} componentGroup
     */
	tem.model.Baseline.prototype.removeBaselineComponentGroup = function (componentGroup) {
	    if(! tem.javascriptUtils.arrayRemoveElement(componentGroup, this.BaselineComponentCollection.BaselineComponentGroup)){
   			tem.logging.log('The componentGroup is not found');
		}
	}; 


    /**
     * @property {Array} BaselineComponentGroup Array of BaselineComponentGroup
     * 
	 * @class 
     */
	tem.model.BaselineComponentCollection = function () {
	    tem.model.XMLSerializableObject.call(this);
	    this.type = "BaselineComponentCollection";

	    this.BaselineComponentGroup = [];
		
		this.typeMap = {BaselineComponentGroup:{subType:"BaselineComponentGroup"}};		
	    this.orderedFields = ["BaselineComponentGroup"];
	};
	tem.model.BaselineComponentCollection.prototype = new tem.model.XMLSerializableObject();

    /**
     * @param {tem.model.BaselineComponentGroup} componentGroup
     */
	tem.model.BaselineComponentCollection.prototype.addBaselineComponentGroup = function (componentGroup) {
	    this.BaselineComponentGroup.push(componentGroup);
	};

    /**
     * @param {tem.model.BaselineComponentGroup} componentGroup
     */
	tem.model.BaselineComponentCollection.prototype.removeBaselineComponentGroup = function (componentGroup) {
	    if(! tem.javascriptUtils.arrayRemoveElement(componentGroup, this.BaselineComponentGroup)){
   			tem.logging.log('The componentGroup is not found');
		}
	};

    /**
     *
	 * @param {String} name
     *
     * @property {String} Name
     * @property {Array} BaselineComponent Array of BaselineComponent
     * 
	 * @class 
     */
	tem.model.BaselineComponentGroup = function (name) {
	    tem.model.XMLSerializableObject.call(this);
	    this.type = "BaselineComponentGroup";

	    this.Name = name;
	    this.BaselineComponent = [];

		this.typeMap = {BaselineComponent:{subType:"BaselineComponent"}};

	    this.orderedFields = ['BaselineComponent'];
	    this.attributes = ["Name"];
	};
	tem.model.BaselineComponentGroup.prototype = new tem.model.XMLSerializableObject();

    /**
     * @param {tem.model.BaselineComponent} component
     */
	tem.model.BaselineComponentGroup.prototype.addBaselineComponent = function (component) {
		this.BaselineComponent.push(component);
	};

    /**
     * @param {tem.model.BaselineComponent} component
     */
	tem.model.BaselineComponentGroup.prototype.removeBaselineComponent = function (component) {
		if(! tem.javascriptUtils.arrayRemoveElement(component, this.BaselineComponent)){
   			tem.logging.log('The component is not found');
		}
	};


    /**
     * Add a fixlet or task to the baseline group. It will use the fixlet's default action if defined
     * otherwise it uses the first defined action.
     * 
     * @param {tem.model.FixletWithActions} fixlet
     * @param {Number} fixletId
     * @param {String} siteURL
     */
	tem.model.BaselineComponentGroup.prototype.addFixlet = function (fixlet, fixletId, siteURL) {
	    var action = null;
	    if (fixlet.DefaultAction) {
	        action = fixlet.DefaultAction;
	    } else {
	        if (fixlet.Action.length > 0) {
	            action = fixlet.Action[0];
	        }
	    }
	    if (action) {
	        var baselineComponent = new tem.model.BaselineComponent(fixlet.Title, action.ID, fixlet._getCombinedRelevance(), action.ActionScript);
	        baselineComponent.SourceSiteURL = siteURL;
	        baselineComponent.SourceID = fixletId;
	        if (action.SuccessCriteria != null) {
	            baselineComponent.SuccessCriteria = action.SuccessCriteria;
	        } else {
	            if (fixlet instanceof tem.model.Task) {
	                baselineComponent.SuccessCriteria = new tem.model.RunToCompletion();
	            } else {
	                baselineComponent.SuccessCriteria = new tem.model.OriginalRelevance();
	            }
	        }
	        this.addBaselineComponent(baselineComponent);
	    }
	}


    /**
     * A component used in a baseline. 
     * The params, except actionScript, are required. 
     * It can be linked to a fixlet/action by setting SourceSiteURL and SourceID.
     *
	 * @param {String} name
	 * @param {String} actionName
	 * @param {String} relevance
	 * @param {String} actionScript
     * 
     * @property {String} Name
     * @property {String} ActionName
     * @property {Boolean} IncludeInRelevance
     * @property {String} SourceSiteURL
     * @property {Integer} SourceID
     * @property {String} Relevance
     * @property {String} ActionScript
     * @property {Integer} Delay
     * @property {tem.model.BaseActionSuccessCriteria} SuccessCriteria
     * 
	 * @class 
     */
	tem.model.BaselineComponent = function (name, actionName, relevance, actionScript) {
	    tem.model.XMLSerializableObject.call(this);
	    this.type = "BaselineComponent";

	    this.Name = name;
	    this.ActionName = actionName;
	    this.IncludeInRelevance = true;
	    this.SourceSiteURL = null;
	    this.SourceID = null;

	    this.Relevance = relevance;
	    this.ActionScript = actionScript;
	    this.Delay = null;
	    this.SuccessCriteria = null;

		this.typeMap = {SuccessCriteria:"BaseActionSuccessCriteria",
						IncludeInRelevance:"Boolean",
						SourceID:"Number",
						Delay:"Number"
						};

	    this.orderedFields = ["Relevance",
                                "Delay",
                                "ActionScript",
                                "SuccessCriteria"];

	    this.attributes = ["Name",
                            "ActionName",
                            "IncludeInRelevance",
                            "SourceSiteURL",
                            "SourceID"];
	};
	tem.model.BaselineComponent.prototype = new tem.model.XMLSerializableObject();

    /**
     * Abstract class for ActionSuccessCriteria. Do not use this class directly, instead use one of its subclasses: 
	 * tem.model.RunToCompletion, tem.model.OriginalRelevance, or tem.model.CustomRelevance
     * 
     * @param {String} option value can be either RunToCompletion, OriginalRelevance, or CustomRelevance
     * 
     * @property {String} Option value can be either RunToCompletion, OriginalRelevance, or CustomRelevance
     * 
	 * @class 
	 * @augments tem.model.XMLSerializableObject
	 * 
	 * @see tem.model.RunToCompletion
	 * @see tem.model.OriginalRelevance
	 * @see tem.model.CustomRelevance
     */
	tem.model.BaseActionSuccessCriteria = function (option) {
	    tem.model.XMLSerializableObject.call(this);
	    this.type = "SuccessCriteria";

	    this.Option = option;

	    this.attributes = ["Option"];
	};
	
	tem.model.BaseActionSuccessCriteria.prototype = new tem.model.XMLSerializableObject();
	
	
	tem.model.BaseActionSuccessCriteria.prototype.fromXML = function(nodeXML){
		var node = new ActiveXObject("Microsoft.XMLDOM");
		node.loadXML(nodeXML);	
		node = node.childNodes[0];
		
		var option = node.getAttribute("Option");
		
		var model = tem.javascriptUtils.classFactory("tem.model." + option);
		
		if(option == "CustomRelevance"){
			model.textValue = node.text;
			model.relevance = node.text;
		}	
		
		return model;
	}	
	
    /**
     * Used to specify "RunToCompletion" for an ActionSuccessCriteria
     * 
	 * @class
	 * @augments tem.model.BaseActionSuccessCriteria 
     */
	tem.model.RunToCompletion = function () {
	    tem.model.BaseActionSuccessCriteria.call(this, "RunToCompletion");
	}
	tem.model.RunToCompletion.prototype = new tem.model.BaseActionSuccessCriteria();

    /**
     * Used to specify that original relevance should be used for an ActionSuccessCriteria
     * 
	 * @class
	 * @augments tem.model.BaseActionSuccessCriteria 
     */
	tem.model.OriginalRelevance = function () {
	    tem.model.BaseActionSuccessCriteria.call(this, "OriginalRelevance");
	}
	tem.model.OriginalRelevance.prototype = new tem.model.BaseActionSuccessCriteria();

    /**
     * Used to defined custom relevance for an ActionSuccessCriteria
     * 
     * @param {String} relevance
     * 
	 * @class
	 * @augments tem.model.BaseActionSuccessCriteria 
     */
	tem.model.CustomRelevance = function (relevance) {
	    tem.model.BaseActionSuccessCriteria.call(this, "CustomRelevance");
		this.relevance = relevance;
	    this.textValue = relevance;
	}
	tem.model.CustomRelevance.prototype = new tem.model.BaseActionSuccessCriteria();


	/**
	 * @property {Array} Property Array of AnalysisProperty
	 * 
	 * @class
	 */
	tem.model.Analysis = function() {
		tem.model.BaseFixlet.call(this);
		
		this.type="Analysis";
		this.rootType="BES";

		this.Property = [];

		this._addTypeMapProperties({
			Property: {
				subType: "AnalysisProperty"
			}
		});

		this.orderedFields = ["Title",
								"Description",
								"Relevance",
								"Category",
								"WizardDataXML",
								"DownloadSize",
								"Source",
								"SourceID",
								"SourceReleaseDate",
								"SourceSeverity",
								"CVENames",
								"SANSID",
								"MIMEField",
								"Domain",
								"Delay",
								"Property"];
	};
	tem.model.Analysis.prototype = new tem.model.BaseFixlet();

	tem.model.Analysis.prototype.addProperty = function (analysisProperty) {
	    this.Property.push(analysisProperty);
	};

	tem.model.Analysis.prototype.removeProperty = function (analysisProperty) {
	    if(! tem.javascriptUtils.arrayRemoveElement(analysisProperty, this.Property)){
   			tem.logging.log('The analysis property is not found');
		}
	};


	/**
	 * 
	 * @param {Number} ID
	 * @param {String} Name
	 * @param {String} RelevanceString
	 * 
	 * @property {Boolean} KeepStatistics
	 * @property {String} EvaluationPeriod This value needs to be set according to the following RegExp specified in
	 * the XML schema:
	 *
	 * <p>P([0-9]+D)?(T([0-9]+H)?([0-9]+M)?([0-9]+(\.[0-9]{1,6})?S)?)?</p>
	 *
	 * <p>A sample value would be "P1DT23H59M48S"</p>
	 * 
	 * @augments tem.model.XMLSerializableObject
	 * @class
	 */
	tem.model.AnalysisProperty = function(ID, Name, RelevanceString){
		tem.model.XMLSerializableObject.call(this);
		this.type = "Property";

		this.ID = ID;
		this.Name = Name;
		this.KeepStatistics=false;
		this.EvaluationPeriod = null;
		this.textValue = RelevanceString;

		this._addTypeMapProperties( {ID:"Number", KeepStatistics:"Boolean"});
		this.attributes = ["ID",  "EvaluationPeriod","Name", "KeepStatistics"];	
	};
	tem.model.AnalysisProperty.prototype = new tem.model.XMLSerializableObject();

	tem.model.AnalysisProperty.prototype.fromXML = function(nodeXML){
		var node = new ActiveXObject("Microsoft.XMLDOM");
		node.loadXML(nodeXML);
		node = node.childNodes[0];	

		var model = this;
		setModelPropertiesFromAttributes(this, node);

		this.textValue = node.text;
	
		return this;
	}

    /**
	 * Model for ComputerGroup
	 * 
	 * @param {String} Title
	 * @param {String} Domain
	 * @param {Boolean} JoinByIntersection
	 * @param {Array} SearchCriteria Array of tem.model.BaseComputerGroupSearch
     *
     * @class
     */
	tem.model.ComputerGroup = function (title, domain, joinByIntersection) {
	    tem.model.XMLSerializableObject.call(this);
	    this.rootType = "BES";
	    this.type = "ComputerGroup";

	    this.Title = title;
	    this.Domain = domain;
	    this.JoinByIntersection = joinByIntersection;
	    this.SearchCriteria = [];

		this.typeMap = {
			JoinByIntersection:"Boolean",
			SearchComponentRelevance:{subType: "SearchComponentRelevance", addName:"addComputerSearchCriteria"},
			SearchComponentPropertyReference:{subType: "SearchComponentPropertyReference", addName:"addComputerSearchCriteria"},
			SearchComponentGroupReference:{subType: "SearchComponentGroupReference", addName:"addComputerSearchCriteria"}
		};

        this.orderedFields = ["Title", "Domain", "JoinByIntersection", "SearchCriteria"];
	};
	tem.model.ComputerGroup.prototype = new tem.model.XMLSerializableObject();

    /**
     * Add a search criteria to filter computer list
     * @param {tem.model.BaseComputerGroupSearch} searchCriteria
     */
	tem.model.ComputerGroup.prototype.addComputerSearchCriteria = function (searchCriteria) {
	    if (searchCriteria instanceof tem.model.BaseComputerGroupSearch) {
	        this.SearchCriteria.push(searchCriteria);
	    } else {
			tem.logging.error('Invalid search criteria is added to ComputerGroup: ' + searchCriteria);
	        throw new Error(temui.l10n.model.errorCreatingContent);
	    }
	};

	tem.model.ComputerGroup.prototype.removeComputerSearchCriteria = function (searchCriteria) {
	    if(! tem.javascriptUtils.arrayRemoveElement(searchCriteria, this.SearchCriteria)){
			tem.logging.log('The search criteria is not found');
		}
	};


    /**
	 * Abstract class for computer group SearchCriteria. Do not use this class directly.
     * Refer to SearchComponentPropertyReference, SearchComponentRelevance, and SearchComponentGroupReference.
     *
     * @class
     * @see tem.model.SearchComponentPropertyReference
     * @see tem.model.SearchComponentRelevance
     * @see tem.model.SearchComponentGroupReference
     */
	tem.model.BaseComputerGroupSearch = function () {
	    tem.model.XMLSerializableObject.call(this);
	}
	tem.model.BaseComputerGroupSearch.prototype = new tem.model.XMLSerializableObject();


    /**
     * Search computers based on computer propety's value
     *
     * @param {String} propertyName computer's predefined or custom propery name, such as "Computer Name"
     * @param {String} comparison comparison operator, can be either: "Contains", "DoesNotContain", "Equals", or "DoesNotEqual"
     * @param {String} searchText value to be compared to property value
     *
     * @property {String} Relevance generated relevance for the search criteria
     *
     * @class
     */
	tem.model.SearchComponentPropertyReference = function (propertyName, comparison, searchText) {
	    tem.model.BaseComputerGroupSearch.call(this);
	    this.type = "SearchComponentPropertyReference";

	    this.SearchText = searchText;
	    this.Relevance = "";

	    this.PropertyName = propertyName;
	    this.Comparison = comparison;

	    this.orderedFields = ["SearchText", "Relevance"];
	    this.attributes = ["PropertyName", "Comparison"];
	}
	tem.model.SearchComponentPropertyReference.prototype = new tem.model.BaseComputerGroupSearch();


    /**
     * Search computers based on relevance
     *
     * @param {String} relevance relevance to be evaluated
     * @param {String} comparison comparison operator, can be either: "IsTrue" or "IsFalse". Default value is "IsTrue".
     *
     * @class
     */
	tem.model.SearchComponentRelevance = function (relevance, comparison) {
	    tem.model.BaseComputerGroupSearch.call(this);
	    this.type = "SearchComponentRelevance";

	    this.Relevance = relevance;
	    this.Comparison = comparison || "IsTrue";

	    this.orderedFields = ["Relevance"];
	    this.attributes = ["Comparison"];
	}
	tem.model.SearchComponentRelevance.prototype = new tem.model.BaseComputerGroupSearch();


    /**
     * Search computers based on group memebership
     *
     * @param {String} groupName
     * @param {String} comparison comparison operator, can be either: "IsMember" or "IsNotMember". Default value is "IsMember".
     *
     * @class
     */
	tem.model.SearchComponentGroupReference = function (groupName, comparison) {
	    tem.model.BaseComputerGroupSearch.call(this);
	    this.type = "SearchComponentGroupReference";

	    this.GroupName = groupName;
	    this.Comparison = comparison || "IsMember";

	    this.attributes = ["GroupName", "Comparison"];
	}
	tem.model.SearchComponentGroupReference.prototype = new tem.model.BaseComputerGroupSearch();

		
/**
 * @namespace 
 * @name tem.l10n
 * @description Utility functions for working with localization.
 */
tem.l10n = {};

	/**
	 * This function can be used to pass parameters to a localized string, and having 
	 * parameters that are integer/time/date types properly localized:
	 * 
	 * <pre>
	 * var finalString = tem.l10n.format('<?rxlat Showing {0} out of {1} fixlets ?>', 25, 'number of bes fixlets');
	 * </pre>
	 * 
	 * <p>This function makes a relevance call using the format inspector to localize
	 * parameters in the proper format. String parameters are treated as relevance snippets
	 * so a parameter that should be treated as a string must be in "":</p>
	 * 
	 * <pre>
	 * var finalString = tem.l10n.format('<?rxlat The time {0} is: {1} ?>', '"now"', 'now');
	 * </pre>
	 * 
	 * <p>Would output as something like: The time now is: 5/12/2011 10:31:03 PM</p>
	 * 
	 * 
	 * @param {String} rxlat Must be string localized using rxlat with parameters of the format {x}
	 * @param {Object} parameters Arbitrary number of arguments that will be subsituted for {x} placemarkers.
	 */
	tem.l10n.format = function() {
		var r = "format \"" + arguments[0] + "\"";
		for (var i = 1; i < arguments.length; i++) {
			r += " + " + arguments[i];
		}
	
		return tem.evalRel(r);
	}	

})();

