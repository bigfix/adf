/**
 * (C) Copyright IBM Corp. 2011-2013  All Rights Reserved.
 * 
 *	ADF v2.2.3
 */

/**
 * Contains basic default support code for developing a Dojo dashboard/wizard.
 * 
 */
dojo.require("dijit.Dialog");

var temui = temui?temui:{};
temui.dojo = temui.dojo?temui.dojo:{};
		
(function() {
	
	/*********************************************
	 * Custom logging functions.
	 * 
	 */
	var GLOBAL_LOG = [];
	
	function onLogSettingsChange(event) {
		if(dijit.byId('debugOption').checked) {
			tem.config.logLevel = tem.config.DEBUG;
		} else {
			tem.config.logLevel = tem.config.ERROR;
		}
	}
	
	function getLogContents() {
		var logContents = [];
		
		for (var i=0; i<GLOBAL_LOG.length; i++) {
			var date = new Date(GLOBAL_LOG[i][0]);
			logContents.push(getDateString(date) + '[' + GLOBAL_LOG[i][2] + ']  ' +  GLOBAL_LOG[i][1]);
		};
	
		return  logContents.join('\n\r');
	}


	function getDateString(date) {
		var month = date.getMonth()+1;
		var dayOfMonth = padDate(date.getDate());
		var year = date.getFullYear();
		var hours = padDate(date.getHours());
		var minutes = padDate(date.getMinutes());
		var seconds = padDate(date.getSeconds());
		var milliseconds = padDate(date.getMilliseconds(), 3);
		var dateString = month + "/" + dayOfMonth + "/" + year;	
		var timeString = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
		return dateString + " " + timeString;
	}	
	
	
	function padDate(number, totalLength) {
		if(totalLength == null) {
			totalLength = 2;
		}
		var paddedString = "" + number;
		while(paddedString.length < totalLength) {
			paddedString = "0" + paddedString;
		}
		
		return paddedString;
	};

	function getLogTextAttributes(textAreaId) {
		return {id: textAreaId, value: getLogContents(),  rows: '30',  style: {width: '100%', fontSize: '11px'}};
	}
	
	function logJSTarget(message, logLevel) {
		// only log debug statements if level is set to debug
		if(logLevel > tem.config.logLevel) {
			return;
		}	
	
		try {
			if(GLOBAL_LOG.length > 1500) {
				GLOBAL_LOG = GLOBAL_LOG.slice(-1000);
			}
		
			GLOBAL_LOG.push([new Date().getTime(), message, logLevel]);
		} catch(e) {
			// TODO: what should be the fallback here?
			// fail silently...
		}
	}


	// From dojox.grid.enhanced.plugins.StoreLayer:
	// summary:
	//		When the server gives back *response* for the commands, you can do something here.
	// tags:
	//		callback extension
	// response: string
	//		server response
	// userRequest: [in|out] dojo.data.api.Request
	//		The request object for *fetch*. You can modify this object according to the *response*
	//		so as to change the behavior of *fetch*
	//
	temui.dojo.onCommandLoadHelper = function(/* string */response, /* keywordArgs */ userRequest){
		// make sure fetch has filter information
		userRequest.filter = response.filter;
	}
	

	function addLogContents(errorDiv, errorLink) {
		var existingLogContents = errorDiv.childNodes;
	
		if(existingLogContents != null && existingLogContents.length == 1) {
			var textArea = dojo.create('textarea', getLogTextAttributes('errorLogContents'));
			errorDiv.appendChild(textArea);
			var hideLogText = temui.dojo.l10n.hideLogContents;
			errorLink.innerHTML =  hideLogText;
			errorLink.title = hideLogText;
		} else if(existingLogContents != null) {
			if(existingLogContents.length > 0 && existingLogContents.length == 2) {
				errorDiv.removeChild(existingLogContents[1]);
				var showLogText = temui.dojo.l10n.showLogContents;
				errorLink.innerHTML = showLogText;
				errorLink.title = showLogText;
			}	
		}
		
		return false;
	}

	
	/**
	 * Utility function to trigger log popup
	 */
	temui.dojo.showLogContents = function() {
		var logContentsDialog = new dijit.Dialog({
			id: 'logDialog',
			title: temui.dojo.l10n.debugErrorLog,
			style: "width: 500px"
		});
	
		dojo.connect(dijit.byId('logDialog'), 'onHide', function(event) {logContentsDialog.destroyRecursive()});
		var testDiv = dojo.create('div',  {style:{position:'relative'}});
	
		var button = new dijit.form.Button({
			label: temui.dojo.l10n.refreshLogContents,
			onClick: function() {
				dojo.byId("logContents").value = getLogContents();
	            },
			style:{position:'absolute', 'right':5}
	        });
	
		testDiv.appendChild(button.domNode);
	
		var settingsForm = dojo.create('form', {style:{paddingBottom:'10px'}}, testDiv);
		dojo.create('span', {innerHTML:temui.dojo.l10n.logLevel, style: {paddingRight: '5px'}}, settingsForm);
	
		var radioOne = new dijit.form.RadioButton({
			id: 'debugOption',
			checked: tem.config.logLevel==tem.config.DEBUG,
			value: "debug",
			name: "logLevel"
	        });
		settingsForm.appendChild(radioOne.domNode);
		var radioOneLabel = dojo.create('label', {'for':'debugOption', innerHTML:temui.dojo.l10n.debug, style: {paddingRight: '5px'}}, settingsForm);
		var radioTwo = new dijit.form.RadioButton({
			id: 'errorOption',
			checked: tem.config.logLevel==tem.config.ERROR,
			value: "error",
			name: "logLevel"
		});
		settingsForm.appendChild(radioTwo.domNode);
		var radioTwoLabel = dojo.create('label', {'for':'errorOption', innerHTML:'Error'}, settingsForm);
		dojo.connect(radioOne, 'onChange', null, onLogSettingsChange);
	
		var textarea = dojo.create('textarea', getLogTextAttributes('logContents'), testDiv);
		logContentsDialog.attr("content", testDiv);
		logContentsDialog.show();
	}	


    dojo.addOnLoad(function() {
		// set tem logging to use custom logging
		tem.logging.debug = function(message) {logJSTarget(message, 'DEBUG');};
		tem.logging.error = function(message) {logJSTarget(message, 'ERROR');};
		
		if(console && console.debug && console.error) {
			console.debug = tem.logging.debug;
			console.error = tem.logging.error;
		}
		
		
		// REMOVE THIS if using in actual project (defaulting to debug for demo purposes)			
		tem.config.logLevel = tem.config.DEBUG;

		dojo.connect(dojo.doc, 'onkeypress', function (e) {
			if(e.keyChar == 'L' && e.ctrlKey && e.shiftKey && e.altKey) {
				temui.dojo.showLogContents();
			}
		});
				
		// global error handler		
		window.onerror = function(message, uri, line) {
			var errorPopUp = new dijit.Dialog({
				title: temui.dojo.l10n.errorTitle,
				style: "width: 500px"
			});	
			
			var errorDiv = dojo.create('div', {style: {width: '100%'}});
			var errorMessageDiv = dojo.create('div', {style:{height:'10em',position: 'relative'}}, errorDiv);
			var errorTextDiv = dojo.create('div', {style:{marginBottom:'12px'}});
			var errorImg = dojo.create('img', {src: 'ADF/images/i_message_critical.png',  style:{'float':'left', marginRight:'-40px'}});
			var errorText = dojo.create('span', {innerHTML: tem.l10n.format(temui.dojo.l10n.errorMessage, '"' +  message.replace(/"/gi, '%22') + '<br/><br/>"' , '"' + uri + '<br/><br/>"', '"' + line + '"')});					
			var errorTextInnerDiv = dojo.create('div', {style: {paddingLeft: '40px', 'float': 'left', marginBottom: '30px', wordWrap: 'break-word'}});
			errorTextDiv.appendChild(errorImg);
			errorTextInnerDiv.appendChild(errorText);
			errorTextDiv.appendChild(errorTextInnerDiv);
			errorMessageDiv.appendChild(errorTextDiv);
			
			var linkDiv = dojo.create('div', { style:{textAlign:'right', position:'absolute', bottom: 5, right: 10}}, errorDiv);
			var errorLink = dojo.create("a", { title: temui.dojo.l10n.showLog, innerHTML: temui.dojo.l10n.showLog });	
			linkDiv.appendChild(errorLink);
			dojo.connect(errorLink, 'click', function() { addLogContents(errorDiv, errorLink)});
					
			errorMessageDiv.appendChild(linkDiv);
			errorDiv.appendChild(errorMessageDiv);	
			errorPopUp.attr("content", errorDiv);
			errorPopUp.show();
			
			return false;				
		}
	});		

})();
			

			
dojo.provide("temui.dojo.data.RelevanceResultsStore");

/**
 * <b>Recommended for 8.2+ dashboards.</b> This datastore makes extensive use of the sort() method of the 
 * RelevanceResult type returned by tem.evalRel() which has a memory leak which was fixed in 8.2.  Consequently
 * the datastore will work in pre 8.2 but can run into significant memory issues with large data sets. 
 * 
 * <p>
 * This datastore encapsulates an optimal way for working with a simple set of Relevance results.  For UI and 
 * Relevance results that fit its criteria it can provide significant performance benefits in terms of data loading
 * times and UI responsiveness.  
 * </p>
 * 
 * <p>
 * This is an implementation of a Dojo datastore that provides a read-only wrapper for the special JS type that gets 
 * returned from tem.evalRel().  For general information regarding dojo data access layer and datastores 
 * go <a href="http://docs.dojocampus.org/dojo/data">here</a>.
 * </p>
 * 
 * <p>
 * It implements <a href="http://docs.dojocampus.org/dojo/data/api">dojo.data.api.Read 
 * and dojo.data.api.Identity API's</a>.  Note that as the return type of tem.evalRel() is a read only 
 * JavaScript type, this store does not implement the dojo.data.api.Write API.
 * </p>
 * 
 * <p>
 * It makes the following assumptions about the UI and Relevance results:
 * </p>
 * 
 * <ul>
 * <li>It works by default with single column sorting (i.e. setting grid's nestedSorting:false). Nested sorting would 
 * require customization.</li> 
 * 
 * <li>It assumes that all sorts can be done by index on a "flat" Relevance results set. To work with a situation where
 * you need to work with a RelevanceResult that has tuples as individual results, you'll need to do some 
 * customization.</li>
 * 
 * <li>It uses Relevance for its filter queries.  Works by default with dojo's EnhancedGrid and its filter plugin. It 
 * dynamically generates a Relevance query based off the criteria specified in the Filter object. It builds this query 
 * by taking the specified relevanceQuery and adding a whose clause after it, i.e.
 * 		
 *  	(id of it,name of it,name of site of it, name of site of it) of bes fixlets
 *  	whose 
 *  		((name of it as string as lowercase  contains  "bes" 
 *  			OR id of it as string as lowercase  contains  "bes" 
 *  			OR name of site of it as string as lowercase  contains  "bes"))
 * 
 * If you require a different filter relevance query, you'll need to do some customization.</li>
 * 
 * <li>RelevanceResult's sort() by index method does not do case insensitive sorting.  To accomplish this while still making use
 * of the super fast sort() method you'll need to in your Relevance bring in an additionally lowercase version of whatever field
 * you need to do case insensitive sorting on, and do some customization to point to that result index for all sorting.</li>
 * 
 * <li>RelevanceResult is read only, so any behind the scenes changes will require reloading the entire datastore to keep it in 
 * synch.</li>
 * 
 * <p>As an example a test case EnhancedGrid/Table widget that fit the basic criteria above and did not require customization could work 
 * with 100k rows of data with &lt;1 second sorting across the board, a responsive UI while background relevance queries are being 
 * executed, and no slow script or timeout errors.  Mileage will vary, but this was using a non-optimal setup for Console and Server.</p>
 * 
 * <p>The one exception to there being no slow script errors is around Print and Export. Supporting Print and Export for large (around 100k)
 * data sets will require customization to the EnhancedGrid and possibly this datastore.</p> 
 * 
 */
dojo.declare("temui.dojo.data.RelevanceResultsStore", null,{

	/**
	 * @param {Object} args 
	 * 		args is an Object that works with the following attributes:
	 * 			
	 * 			relevanceQuery {String}: The full relevance query used to get the results for datastore, i.e.
	 * 				var relevanceStr = '(id of it,name of it,name of site of it) of bes fixlets';
	 * 
	 * 			fieldMap {Array}: Array of objects. Each object defines an "index" which references an index in
	 * 			the flat relevance results and a "key" which defines the Relevance term used to query the property.
	 * 			For instance with the following relevanceQuery:
	 * 	
	 * 				'(id of it,name of it,name of site of it) of bes fixlets';
	 * 
	 * 			you would define the following fieldMap
	 * 
	 *				fieldMap: [{index:0, key: "id"}, 
	 *							{index:1, key: "name"}, 
	 *							{index:2, key: "name of site"}]
	 *
	 *			Keys are used to auto-generate filter Relevance.
	 * 
	 *  		getIdentity: (From dojo.data.api.Identity docs: Returns a unique identifier for an item. The return value will be
 	 *       		either a string or something that has a toString() method.)
	 *  
	 *  		getIdentityAttributes: (From dojo.data.api.Identity docs: Returns an array of attribute names that are used to generate the identity.
	 *				For most stores, this is a single attribute ... This function is intended to identify the attributes that comprise the identity 
	 *				so that so that during a render of all attributes, the UI can hide the the identity information if it chooses.
	 *  
	 */
	constructor: function(args){
		this._features = {'dojo.data.api.Read':true, 'dojo.data.api.Identity':true};
		this.fieldMap = args.fieldMap;	

		this._prevRelevanceQuery =  args.relevanceQuery;
		this.relevanceQuery = args.relevanceQuery;
		this._origRelevanceQuery = args.relevanceQuery;
		
		this.getIdentity = args.getIdentity;
		this.getIdentityAttributes = args.getIdentityAttributes;
	},
	
	relevanceData:null,
	_prevRelevanceQuery:null,
	_origRelevanceQuery:null,
	relevanceQuery: null,
	fieldMap:null,
	cachedData:null,
	previousSort:null,


	applySort: function(sort, relevanceData) {
		var sortIndex;
					
		for (var i=0; i<this.fieldMap.length; i++) {
			var item = this.fieldMap[i];
	
			// map the column index to the index in the relevance results				
			if(item.index == sort[0].attribute) {
				sortIndex = item.index;
				break;
			}
		}
		var isDesc = sort[0].descending;
		relevanceData.sort(sortIndex, !isDesc);
	},	
	

	/**
	 * This function works with the filter object passed in the request to fetch(), and dynamically 
	 * generates a filter clause for a relevance query, i.e.
	 * 
	 * (id of it,name of it,name of site of it, name of site of it) of bes fixlets whose 
	 * ((name of it as string as lowercase  contains  "bes" OR id of it as string as lowercase  contains  
	 * "bes" OR name of site of it as string as lowercase  contains  "bes"))
	 *  
	 */
	buildFilterClause: function(filter) {
		var filterClauseString = '';
		filterClauseString = this.getFilterClause(filter);
		filterClauseString = '(' + filterClauseString + ')';

		var relevanceStr = this._origRelevanceQuery + ' whose ' + filterClauseString;
		return relevanceStr;
	},
	
	
	getFilterClause: function(filterData){
		var isMultiple = filterData.op.toLowerCase() == 'any' || filterData.op.toLowerCase() == 'all';
		
		if(!isMultiple) {
			return  this.getWhereClauseForFilter(filterData.data, filterData.op);
		} 
	
		var filterClauses = [];
		
		for (var i = 0; i < filterData.data.length; i++) {
			var currItem = filterData.data[i];
			isMultiple = currItem.op.toLowerCase() == 'any' || currItem.op.toLowerCase() == 'all';
			
			if(isMultiple) {
				var ruleClause = [];
				
				for (var j = 0; j < currItem.data.length; j++) {
					var currRule = currItem.data[j];
					ruleClause.push(this.getWhereClauseForFilter(currRule.data, currRule.op));
				}
				
				filterClauses.push( '(' + ruleClause.join(' ' + this.getConditionForFilter(currItem.op) + ' ') +  ')');
				
			} else {
				filterClauses.push(this.getWhereClauseForFilter(currItem.data, currItem.op));
			}
		}
		
		var filters = '(' + filterClauses.join(' ' + this.getConditionForFilter(filterData.op) + ' ') + ')';
		return filters;	
		
	},

	getWhereClauseForFilter: function(col, condition) {
		for (var i=0; i<this.fieldMap.length; i++) {
			var item = this.fieldMap[i];
			
			if(item.index == col[0].data) {
				var currField = item.key;
				break;
			}
		}
		
		var filterStr = col[1]? col[1].data:'';
		var colClause = {name: col[0].data, itemIndex: currField, filterStr: filterStr, condition: condition};
		var clauseStr = currField + ' of it as string as lowercase ' + this.getConditionForFilter(colClause.condition) + ' "' + colClause.filterStr + '"';
		
		return clauseStr;
	},

	getConditionForFilter: function (condition) {
		condition = condition.toLowerCase();	
			
		switch(condition) {	
			case 'all':
				return 'AND';
				break;
			case 'any':
				return 'OR';
				break;
			case 'contains':
				return ' contains ' ;
				break;
			case 'equalto':
				return ' equals ' ;
				break;
			case 'startswith':
				return ' starts with ' ;
				break;
			case 'endswith':
				return ' ends with ' ;
				break;
			case 'notcontains':
				return ' does not contain ' ;
				break;
			case 'notequalto':
				return ' does not equal ' ;
				break;
			case 'notstartswith':
				return ' does not start with ' ;
				break;
			case 'notendswith':
				return ' does not end with ' ;
				break;
			case 'isempty':
				// value is '' in this case
				return ' equals ' ;
				break;
			default:
				return condition;
		}	
	},
	
	isSameSort: function(sort1, sort2) {
		if(sort1 == null || sort2==null) {
			return sort1 == sort2;
		}
		
		if(sort1[0].attribute == sort2[0].attribute && sort1[0].descending == sort2[0].descending) {
			return true;
		}
		
		return false
	},

	loadCallback: function(requestObject, findCallback) {
		return function (results){
			findCallback(results, requestObject);
		}
	},
	
	//--------------------------------------------------------------------------
	//  dojo.data.api.Identity
	//--------------------------------------------------------------------------
	getIdentity: function(item){
		throw new Error('getIdentity() must be implemented for each RelevanceResultsStore');
	},
	
	getIdentityAttributes: function( item){
		throw new Error('getIdentityAttributes() must be implemented for each RelevanceResultsStore');
	},


	//--------------------------------------------------------------------------
	//  dojo.data.api.Read
	//--------------------------------------------------------------------------
	getValue: function(item, attribute, defaultValue){
		var values = this.getValues(item, attribute);
		return (values.length > 0)?values[0]:defaultValue;
	},

	getValues: function(item, attribute){
		return item[attribute]?[item[attribute]]:[];
	},

	getAttributes: function(item){
		var attributes = [];
		for(var key in item){
			attributes.push(key);
		}
		return attributes; // Array
	},

	hasAttribute: function(item,  attribute){
		return (attribute in item);
	},

	containsValue: function(item, attribute, value){
		// do nothing, filtering is occurring through relevance
		return false;
	},

	isItem: function(item){
		if(!this.currData) {
			return false;
		}
		
		for (var i=0; i<this.currData.length; i++) {
			if(this.currData[i] === item) {
				return true;
			}
		};

		return false
	},

	isItemLoaded: function(item){
		return true;
	},

	loadItem: function(keywordArgs){
		// do nothing, relevance results are all or nothing
	},

	getFeatures: function(){
		return this._features; //Object
	},

	getLabel: function(item){
		// no generic label field for relevance results	
		return undefined; //undefined
	},

	getLabelAttributes: function(item){
		// no generic label field for relevance results
		return null; //null
	},



	close: function(request){
		this.relevanceData = null;
		this._prevRelevanceQuery = null;
		this.relevanceQuery = null;
		this.fieldMap = null;
		this.cachedData = null;

	},

	fetch: function(request){

		request = request || {};
		if(!request.store){
			request.store = this;
		}
		var self = this;

		var _errorHandler = function(errorData, requestObject){
			if(requestObject.onError){
				var scope = requestObject.scope || dojo.global;
				requestObject.onError.call(scope, errorData, requestObject);
			}
		};

		if(request.filter) {
			this.relevanceQuery = this.buildFilterClause(request.filter);
		} else {
			this.relevanceQuery = this._origRelevanceQuery;
		}


		var _fetchHandler = function(relevanceData, requestObject){	
			this.cachedData = relevanceData;
			
			var oldAbortFunction = requestObject.abort || null;
			var aborted = false;
			
			var startIndex = requestObject.start?requestObject.start:0;
			
			var endIndex = (requestObject.count && (requestObject.count !== Infinity))?(startIndex + requestObject.count):relevanceData.currData.length;
	
			requestObject.abort = function(){
				aborted = true;
				if(oldAbortFunction){
					oldAbortFunction.call(requestObject);
				}
			};
	
			var scope = requestObject.scope || dojo.global;
			if(!requestObject.store){
				requestObject.store = self;
			}
			
			if(requestObject.onBegin){
				requestObject.onBegin.call(scope, relevanceData.currData.length, requestObject);
			}
			
			if(requestObject.sort && !this.isSameSort(requestObject.sort, this.previousSort)){
				this.applySort(requestObject.sort, relevanceData);
				this.previousSort = requestObject.sort;
			}
			
			if(requestObject.onItem){
				for(var i = startIndex; (i < items.length) && (i < endIndex); ++i){
					var item = items[i];
					if(!aborted){
						requestObject.onItem.call(scope, item, requestObject);
					}
				}
			}

			if(requestObject.onComplete && !aborted){
				var subset = null;
				if(!requestObject.onItem){
					subset = [];	

					for (var i = startIndex; i<endIndex && i < relevanceData.currData.length; i++) {
						var fieldsArr = []

						for(var j=0; j< this.fieldMap.length; j++) {
							fieldsArr.push(relevanceData.currData[i][j]);
						}

						subset.push(fieldsArr);
					}
				}	
				requestObject.onComplete.call(scope, subset, requestObject);
			}
		};

			
		// did the user click on refresh	
		var isRefresh = (request.isRender==null && 
							this.isSameSort(request.sort, this.previousSort) && 
							(this.relevanceQuery == this._prevRelevanceQuery));

		if(isRefresh) {
			this.cachedData = null;
		}

		if(this.relevanceQuery != this._prevRelevanceQuery) {
			this._prevRelevanceQuery = this.relevanceQuery;
			this.cachedData = null;
		}
		
		if(this.cachedData == null) {	
			var relevanceData = new tem.relevance.RelevanceData();
			relevanceData.onChange = this.loadCallback(request, dojo.hitch(this, _fetchHandler));
			this.previousSort = null;
			relevanceData.load(this.relevanceQuery);
		} else {
			var myFetchHandler = dojo.hitch(this, _fetchHandler);
			myFetchHandler(this.cachedData, request);
		}
		
		return request;
	}
	

});


		
			