/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * ADF v2.3.0
 */
if ($.jsDate) {
	try {
		document.getElementsByTagName('html')[0].lang = 'x-temLang';
		var t = temui.l10n;
		$.jsDate.regional['x-temLang'] = {
			monthNames: [t.january, t.february, t.march, t.april, t.may, t.june, t.july, t.august, t.september, t.october, t.november, t.december],
			monthNamesShort: t.monthNamesShort.split(" "),
			dayNames: [t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday],
			dayNamesShort: t.dayNamesShort.split(" "),
			dateFormat: '%Y-%m-%d %H:%M:%S'
		}
	} catch (e) {
		// TODO: would be nice if it was possible to use error popup here
		alert("Error localizing jqPlot, make sure resource.js is included.");
	}
}


try {
	tem;
} catch(e) {
	try {
		console.error("ADFUI.js must be loaded after AdfApi.js");
	} catch(e) {
		alert("ADFUI.js must be loaded after AdfApi.js");
	}
}

var temui = temui?temui:{};
temui.chart = {};
temui.grid = {};



(/** @param {jQuery} $ */ function($) {

/** 
 * @namespace temui 
 * @name temui
 * 
 */

/** 
 * @namespace $.fn
 * @name $.fn
 * 
 * @description Custom jQuery plugins defined for application UI.
 * 
 */

	/**
	 * jQuery plugin that applies the application's top nav styles.  Typically this does not need to be
	 * explicitly called, it gets called automatically on the first element with a data-tem-role
	 * of "topNav".  It will also stylize any refresh button defined in the topNav. 
	 * 
	 * @function
	 * @name temTopNav
	 * @memberOf $.fn
	 * 
	 * @example
	 * $("*[data-tem-role='topNav']").first().temTopNav();
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div data-tem-role="topNav"&gt;
	 * 	&lt;button data-tem-role="refreshButton"&gt;&lt;/button&gt;
	 * 	&lt;button&gt;Custom Button&lt;/button&gt;
	 * &lt;/div&gt;
	 */
	$.fn.temTopNav = function() {
		this.addClass("temui-top-nav");
		
		var $buttons = this.find("button");
		$buttons.addClass("temui-top-nav-button");

		var $refreshButton = this.find("*[data-tem-role='refreshButton']");
		$refreshButton.append('<div class="temui-top-nav-refresh-button" />');
		
		var $printButton = this.find("*[data-tem-role='printButton']");
		$printButton.append('<div class="temui-top-nav-print-button" />').click(function() {
			temui.print();
		});

		return this;
	}



	/**
	 * jQuery plugin that applies the application's header style.  Typically this does not need to be
	 * explicitly called, it gets called automatically on the first element with a data-tem-role
	 * of "tem-header". It will also stylize any "last update" text defined in the header via 
	 * the lastUpdate data-tem-role.
	 * 
	 * @function
	 * @name temHeader
	 * @memberOf $.fn
	 * 
	 * @example
	 * $("*[data-tem-role='header']").first().temHeader();
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div data-tem-role="header"&gt;
	 * 	ADF 2.2- Sample Dashboard
	 * 	&lt;div id="lastUpdate" data-tem-role="lastUpdate"&gt;&lt;/div&gt;	
	 * &lt;/div&gt;
	 */
	$.fn.temHeader = function(){
		this.addClass("temui-header");
		
		$lastUpdate = this.find("*[data-tem-role='lastUpdate']")
			.addClass("temui-last-update");
		
		this.after($lastUpdate);	
	}

	/**
	 * @description Applies validation on a form. This is a wrapper of jQuery Validation plugin
	 * and supplies a custom errorPlacement function to provide a common error message UI.
	 * 
	 * <p>There is also a custom validator <i>data-tem-validate-relevance</i> that can validate a form element 
	 * using session relevance query. The element is valid if the relevance returns true.</p>
	 * 
	 * <p>Refer to <a href='http://docs.jquery.com/Plugins/Validation'>jQuery Validation plugin</a> for more options and methods.</p>
	 *
	 * <p>
	 * The HTML markup can define the following data-tem-* attributes in input elements in addition to what jQuery Validation plugin provides.</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">data-tem-validate-error</span> Error message to be displayed when the element input is invalid.</li>
	 * 	<li><span style="font-weight:bold">data-tem-validate-relevance</span> Validate input by using a session relevance. String "{0}" in the relevance is replaced by the input's value. The relevance should return true if the value is valid and false otherwise.</li>
	 * 	<li><span style="font-weight:bold">data-tem-validate-function</span> Define a validation function. Input to the function is the input's value. The function should return true if its value is valid and false otherwise.</li>
	 * </ul>
	 *
	 * @function
	 * @name temValidate
	 * @memberOf $.fn
	 *
	 * @example
	 * var validator = $("#formID").temValidate();
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;form id="formID"&gt;
	 *    Name (min length: 2): 
	 *       &lt;input id="input-name" name="name" required minlength="2"/&gt;
	 *    Valid fixlet ID: 
	 *       &lt;input id="input-fixlet" name="fixletID" required digits
	 *              data-tem-validate-relevance='exists fixlet {value} of bes sites' /&gt;
	 *    Year of birth: 
	 *       &lt;input id="input-year" name="year" required digits
	 *              data-tem-validate-function='function(value){ return (value < (new Date()).getFullYear()); }' /&gt;
	 *    &lt;input type="submit" value="Submit"/&gt;
	 * &lt;/form&gt;
	 * 
	 */
	$.fn.temValidate = function (config) {
		if(!$.validator){
			tem.logging.error("temui.validator requires jquery-validate plugin to be loaded");
			throw new Error(temui.l10n.adfapi.errorInternal);
		}

		if (!$.validator.methods['data-tem-validate-relevance']) {
			$.validator.addMethod("data-tem-validate-relevance", function (value, element, param) {
				relevance = param.replace(/\{value\}/g, value);
				try {
					var result = tem.evalRel(relevance);
					return (result === true);
				} catch (e) {
					tem.logging.error(e.message);
				}
				return false;
			}, temui.l10n.validate.invalidInput);
		}

		if (!$.validator.methods['data-tem-validate-function']) {
			$.validator.addMethod("data-tem-validate-function", function (value, element, param) {
				try {
					eval('var validationFn = ' + param);
				} catch (e) {
					tem.logging.error(e.message);
					return false;
				}
				if (typeof validationFn != 'function') {
					tem.logging.error("validationFunction must be function");
					return false;
				}
				return validationFn(value);
				return false;
			}, temui.l10n.validate.invalidInput);
		}

		var predefinedConfig = {
			validClass: 'temui-validation-valid',
			errorClass: 'temui-validation-error',
			wrapper: "div",
			errorPlacement: function ($error, $element) {
				// position error message at the top right of input
				$error.addClass('temui-validation-error-container');
				$error.attr('data-tem-validate-input-name', $element.attr('name'));
				$error.insertAfter($element);

				var $pivot = $element;
				if ($element.attr('data-tem-validate-input-container')) {
					$pivot = $('#' + $element.attr('data-tem-validate-input-container'));
				}

				$error.css('top', $pivot.position().top);
				$error.css('left', $pivot.position().left + $pivot.width());

				var $label = $error.children('label');

				var $errorIcon = $('<div/>').addClass('temui-validation-error-icon').appendTo($error);
				var $sharkFin = $('<div/>').addClass('temui-validation-error-sharkfin').appendTo($error);

				var showErrorMessage = function () {
					$label.css('visibility', '');
					$sharkFin.css('visibility', '');
				};

				var hideErrorMessage = function () {
					$label.css('visibility', 'hidden');
					$sharkFin.css('visibility', 'hidden');
				};

				// hide the message by defaut, show it when mouseover the error icon 
				// or when the input is focused
				if (!$element.is(':focus')) {
					hideErrorMessage();
				}

				$errorIcon.mouseover(showErrorMessage);
				$errorIcon.mouseout(function () {
					if (!$element.is(':focus')) {
						hideErrorMessage();
					}
				});
				$element.focus(showErrorMessage);
				$element.blur(hideErrorMessage);
			}
		};

		$.extend(predefinedConfig, config);

		if (!predefinedConfig.messages) {
			predefinedConfig.messages = {};
		}

		this.find("*[name][data-tem-validate-error]").each(function () {
			var $inputElement = $(this);
			var name = $inputElement.attr('name');
			var errorMessage = $inputElement.attr('data-tem-validate-error');

			predefinedConfig.messages[name] = errorMessage;
		});

		var validator = this.validate(predefinedConfig);

		return validator;
	};
	

	/** 
	 * @class
	 * @memberOf temui
	 * @name chartContainer 
	 * 
	 * @description chartContainer is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).chartContainer()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).chartContainer()</code> function takes one argument, 
	 * an object literal with properties used in the creation of the chartContainer. 
	 * For the chartContainer, the properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">plot:</span> A jqPlot object that is a descendant of the container</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component:</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">header</span></li>
	 * </ul>
	 * 
	 * 
	 * @example
	 * var plot = temui.chart.barChart('chart', [chartSeries1, chartSeries2]);
	 * $("#testChartContainer").chartContainer({plot:plot});
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="testChartContainer"&gt;
	 *   &lt;h3 data-tem-role="header"&gt;Top 8 Patch Fixlets with Most Unpatched Endpoints&lt;/h3&gt;
	 *   &lt;div id="chart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * &lt;/div&gt;
	 * 
	 */ 
	$.widget("temui.chartContainer", {
		options: {
			plot: null
		},

		lastWidth: 0,
		lastHeight: 0,
		
		_create: function() {

			this.element.addClass('temui-dashboard-item');

			this.element.find("*[data-tem-role='header']")
				.addClass("ui-widget-header")
				.addClass("ui-corner-all")
				.addClass("temui-dashboard-item-header");
			
			this._initializeResizing();

		},

		_initializeResizing: function() {
			var self = this;

			var timer = null;
			$(window).on('resize.temui',(function () {
					// prevent too many resize call when user resizes the console window
					// but still make sure that the first call and last call are triggered
					if (timer == null) {
						self.resize();
					}
					clearTimeout(timer);
					timer = setTimeout(function(){
						self.resize();
						timer = null;
					}, 100);
				})
			);
		},

		/**
		 * Canvas position fix in IE 7-8 for printing
		 * @private
		 */
		_canvasPositionFix: function() {
			var self = this;
			var canvases = self.element.find('canvas').filter(function() {
				return $(this).css('position') == 'absolute';
			});
			canvases.wrap(function() {
				var canvas = $(this);
				var div = $('<div />').css({
					position: 'absolute',
					top: canvas.css('top'),
					left: canvas.css('left')
				});
				canvas.css({
					top: '0',
					left: '0'
				});
				return div;
			});
		},

		/**
		 * Resizes its chart component.
		 * 
		 * @function
		 * @memberOf temui.chartContainer#
		 */
		resize: function() {
			var self = this;
			if (self.lastWidth === self.element.width() && self.lastHeight === self.element.height()) {
				return;
			}
			self.lastWidth  = self.element.width();
			self.lastHeight = self.element.height();

			if (self.options.plot && self.element.width() > 0 && self.element.height() > 0) {
				$.each(self.options.plot.series, function(index, series){
					if(series.barWidth != undefined) {
						series.barWidth = undefined;
					}
				});
				self.options.plot.replot({resetAxes:true});
				self._canvasPositionFix();
			}
		},

		/**
		 * Cleans up any modifications made to the DOM
		 * 
		 * @function
		 * @memberOf temui.chartContainer#
		 * @name destroy
		 */
		destroy: function() {
			
			$(window).off('resize.temui');
			
			this.element.removeClass('tem-dashboard-item');

			this.element.find("*[data-tem-role='header']")
				.removeClass("ui-widget-header")
				.removeClass("ui-corner-all")
				.removeClass("tem-dashboard-item-header");
			
			return $.Widget.prototype.destroy.call(this);
		}
	});


	/** 
	 * @class
	 * @memberOf temui
	 * @name message 
	 * 
	 * @description message is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).message()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).message()</code> function takes one argument, 
	 * an object literal with properties used in the creation of the message. 
	 * For the message, the properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">type</span> A String indicating message type, it can be "error", "warning", "success" or "information"</li>
	 * 	<li><span style="font-weight:bold">closable</span> (defaults to true) A Boolean indicating whether the message can be closed or not.</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component:</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">messageText</span></li>
	 * 	<li><span style="font-weight:bold">description</span> (optional)</li>
	 * </ul>
	 * 
	 * 
	 * @example
	 * $("#warning").message({type:'warning'});
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="warning"&gt;
	 *   &lt;p data-tem-role="messageText"&gt;This is a warning message.&lt;/p&gt;
	 * &lt;/div&gt;
	 * 
	 */  
	$.widget("temui.message", {
		options: {
			type: null,
			closable: true
			/* TODO: messageText, description */
		},
		
		_create: function() {
			var self = this;

			var $messageText= this.element.find("*[data-tem-role='messageText']")
				.addClass("temui-message-text")		
				.addClass("temui-container");
				
			var $messageText= this.element.find("*[data-tem-role='description']")
				.addClass("temui-message-description");				

			this.element.addClass('temui-message')
				.addClass('temui-' + this.options.type);
				
			if(this.options.closable){
				var $actionContainer = 	$('<div class="yui3-g"></div>')
					.addClass("temui-message-actionContainer");
				
				var $closeLinkContainer = $('<div class="yui3-u"></div>')
					.addClass("temui-message-closeLinkContainer");
					
				var $closeLink = $('<span class="ui-icon ui-icon-closethick"></span>')
					.addClass("temui-message-closeLink");

				$actionContainer.append($closeLinkContainer.append($closeLink));
					
				this.element.prepend($actionContainer);	
				
				$closeLink.click(function(event){
					self.close(event);
				});
			}
			
			var $img = $('<span></span>')
				.addClass("temui-indicator")
				.addClass("temui-" + this.options.type + "-indicator");
			
			this.element.prepend($img)
			
		},
		/**
		 * @event temui.message#close
		 * @description Triggered when the message is about to be hidden. If any event listener returns false, then
		 * it will short circuit the actual closing.
		 * @type {object}
		 * @param {event} event that triggered the close event
		 */
		/**
		 * @event temui.message#closed
		 * @description Triggered after the message is hidden.
		 * @type {object}
		 * @param {event} event that triggered the closed event
		 */
		/**
		 * Closes the message
		 * 
		 * @function
		 * @memberOf temui.message#
		 * @name close
		 */		
		close: function(event){
			if (false === this._trigger( "close", event)) {
				return;
			}
			
			this.element.hide();
			this._trigger( "closed", event)
		},
		
		/**
		 * Cleans up any modifications made to the DOM
		 * 
		 * @function
		 * @memberOf temui.message#
		 * @name destroy
		 */				
		destroy: function() {
			$(window).off('resize.temui');
			
			this.element.removeClass('tem-dashboard-item');

			this.element.find("*[data-tem-role='header']")
				.removeClass("ui-widget-header")
				.removeClass("ui-corner-all")
				.removeClass("tem-dashboard-item-header");				

			var $messageText= this.element.find("*[data-tem-role='messageText']")
				.removeClass("temui-message-text")		
				.removeClass("temui-container");
				
			var $messageText= this.element.find("*[data-tem-role='description']")
				.removeClass("temui-message-description");				

			this.element.removeClass('temui-message')
				.removeClass('temui-' + this.options.type);
				
			this.element.find('.temui-message-actionContainer').remove();
			this.element.find('.temui-indicator').remove();

			return $.Widget.prototype.destroy.call(this);
		}
		
	});  

	
	/** 
	 * @class
	 * @memberOf temui
	 * @name analysisWarning 
	 * 
	 * @description analysisWarning is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).analysisWarning()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).analysisWarning()</code> function takes one argument, 
	 * an object literal with properties used in the creation of the analysisWarning. 
	 * For the analysisWarning, the properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">analysesInfo</span> An array of Object literals. The individual object literals can have the following
	 * 	properties:
	 *  <ul>
	 *  <li>ids- Array of analysis ids.</li> 
	 *  <li>siteKey (optional)- siteKey that points to list of predefined sites in the tem.config.sites property. If not site then it will
	 *  use the default site.  This site is the site that the defined ids belong to.</li> 
	 *  </ul>
	 * 	</li>
	 * 	<li><span style="font-weight:bold">closable</span> (defaults to false) A Boolean indicating whether the analysisWarning can be closed or not.</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component:</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">messageText</span> (optional) Defaults to a standard warning that analyses need to be activated.</li>
	 * </ul>
	 * 
	 * 
	 * @example
	 * $("#warning").analysisWarning({analysesInfo:[{ids:[1, 2]}, {ids:[3], siteKey:"ADS"}]});
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="warning"&gt;&lt;/div&gt;
	 * 
	 */  
	$.widget("temui.analysisWarning", $.temui.message, {
		options: {
			analysesInfo: null,
			closable: false
		},
		
		/**
		 * @event temui.analysisWarning#activate
		 * @description Triggered when the analyses are about to be activated. If any event listener returns false, then
		 * it will short circuit the actual activation.
		 * @type {object}
		 * @param {event} event that triggered the activate event
		 */
		/**
		 * @event temui.analysisWarning#activated
		 * @description Triggered after the analyses are activated.
		 * @type {object}
		 * @param {event} event that triggered the activated event
		 */
		_create: function() {
			var self = this;
			var areAnalysesActivated = this._getAnalysesStatus();
			if(areAnalysesActivated){
				this.element.hide();
				return;
			}

			this.options.type = 'warning';			

			var links = this._getInactiveAnalysisLinks();			
			
			var $messageText= this.element.find("*[data-tem-role='messageText']");
			if(!$messageText.length){
				var messageText = links.length>1?temui.l10n.analysesWarningDefault:temui.l10n.analysisWarningDefault;
				$messageText = $('<div data-tem-role="messageText">' + messageText + "</div>");
				this.element.prepend($messageText);
			}
			
			$.temui.message.prototype._create.call(this);

			var $linksContainer = $('<div></div>')
				.addClass('temui-message-description');
			
			var $ul = $('<ul></ul>')
				.addClass('temui-analysisWarning-list');
			
			$.each(links, function(index, val) {
				var $li = $("<li></li>").append(val);
				$ul.append($li);
			});
				
			$linksContainer.append($ul);	
			this.element.append($linksContainer);
			var activate = links.length>1?temui.l10n.analysesWarningActivate:temui.l10n.analysisWarningActivate;

			var $activate = $('<button>' + activate + '</button>').addClass("temui-plain-button").button();
			$activate.click(function(event){
				if (false === self._trigger( "activate", event)) {
					return;
				}
				
				if(self._doAnalysesActivation()){
					self.element.hide();
					self._trigger( "activated", event);
				}
			});

			this.element.append($activate);	
		},

		/**
		 * Checks the current status of the analyses and hides/shows the warning accordingly.
		 * 
		 * @function
		 * @memberOf temui.analysisWarning#
		 * @name refresh
		 */
		refresh: function(){
			if(this._getAnalysesStatus()){
				this.element.hide();
			} else {
				this.element.show();
			}
		},

		/**
		 * Cleans up any modifications made to the DOM
		 * 
		 * @function
		 * @memberOf temui.analysisWarning#
		 * @name destroy
		 */	
		destroy: function() {
			var $messageText= this.element.find("*[data-tem-role='messageText']");
			if($messageText.html()==temui.l10n.analysesWarningDefault || $messageText.html()==temui.l10n.analysisWarningDefault){
				$messageText.remove();
			}
			
			this.element.find("button.temui-plain-button").remove();
			this.element.find(".temui-message-description").remove();

			return $.temui.message.prototype.destroy.call(this);
		},
		
		_getSiteRelevance: function(siteKey) {
			var siteIdentifier = tem.config.getSite(siteKey);
			return 'bes site whose (name of it contains "' + siteIdentifier.name + '")';
		},
		
		_getInactiveAnalysisLinks : function (){
			var analysesInfo = this.options.analysesInfo;
			var relArray = new Array();
			for (var i = 0; i < analysesInfo.length; i++) {
				var ids = analysesInfo[i].ids;
				var siteKey = analysesInfo[i].siteKey;
				var siteRel = this._getSiteRelevance(siteKey);
				var rel = '';
				for (var j = 0; j < ids.length; j++) {
					var idsRel = [];
					for(var j = 0; j < ids.length; j++){
						idsRel.push('id of it = ' + ids[j]);
					}
					var rel = 'links of fixlets whose ((' + idsRel.join(' OR ') + ')'
								+ ' AND analysis flag of it and (not exists best activation of it OR not (active flag of best activation of it)))'
								+ ' of ' +  siteRel;
					relArray.push(rel);
				}
			}
			return tem.evalRel(relArray.join('; '));
		},
	
		_getAnalysesStatus : function(){
			var analysesInfo = this.options.analysesInfo;
			var relArray = new Array();
			for (var i = 0; i < analysesInfo.length; i++) {
				var ids = analysesInfo[i].ids;
				var siteKey = analysesInfo[i].siteKey;
				var siteRel = this._getSiteRelevance(siteKey);
				var rel = '';
				for (var j = 0; j < ids.length; j++) {
					rel += 'not exists fixlets whose (id of it = ' + ids[j] + ')'
							+ ' whose ( not exists best activation of it OR not active flag of best activation of it) of ' + siteRel;
					if (j != ids.length - 1) {
						rel += ' AND ';
					}
				}
				relArray.push(rel);
			}
		
			return (tem.evalRel(relArray.join(' AND ')));
		},
		
		_doAnalysesActivation : function () {
			var analysesInfo = this.options.analysesInfo;
			var relArray = new Array();
			for (var i = 0; i < analysesInfo.length; i++) {
				var ids = analysesInfo[i].ids;
				var siteKey = analysesInfo[i].siteKey;
				var siteRel = this._getSiteRelevance(siteKey);
				var rel = '';

				var rel = '(id of site of it as string & ":" & id of it as string) of fixlets (' + ids.join(';') + ')'
							+ ' whose (not exists best activation of it OR not active flag of best activation of it) of ' + siteRel;
				relArray.push(rel);
			}		
			var a_ids = tem.evalRel(relArray.join('; '));
			
			return tem.content.activateAnalyses(a_ids.toArray());			
		}
	});


	/** 
	 * @class
	 * @memberOf temui
	 * @name popupMessage 
	 * 
	 * @description popupMessage is a jQuery widget, extending jQuery dialog widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).popupMessage()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).popupMessage()</code> function takes one argument, 
	 * an object literal with properties used in the creation of the message. 
	 * The properties include inherited properties from <a href='http://docs.jquery.com/UI/API/1.8/Dialog'>jQuery dialog widget</a> and the following:
	 * </p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">type</span> (defaults to "information") A String indicating message type, it can be "error", "warning", "success", "information" or "question".</li>
	 * 	<li><span style="font-weight:bold">messageText</span> Message to be displayed.</li>
	 * 	<li><span style="font-weight:bold">description</span> More detailed explaination of the message (optional).</li>
	 * </ul>
	 *
	 * <p>Note: When property <i>title</i> is not defined, the title bar is hidden.</p>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component. If same field is declared in properties, its property value overwrites attribute value.</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">messageText</span></li>
	 * 	<li><span style="font-weight:bold">description</span> (optional)</li>
	 * </ul>
	 * 
	 * <p>Another way to create popup message without the need of preparing a DOM element is to use $.temui.popupMessage.createPopup function.</p>
	 * 
	 * @example
	 * $("#warning").popupMessage({type:'warning'});
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="warning"&gt;
	 *   &lt;div data-tem-role="messageText"&gt;This is a warning message.&lt;/div&gt;
	 *   &lt;div data-tem-role="description"&gt;This is a more detailed description.&lt;/div&gt;
	 * &lt;/div&gt;
	 *
	 * 
	 */
	$.widget("temui.popupMessage", $.ui.dialog, {
		options: {
			messageText: null,
			description: null,
			type: "information",
			modal: true,
			width: 500,
			minHeight:100
		},

		_create: function () {
			var self = this;
			this.$originalMessage = this.element.find("*[data-tem-role='messageText']").hide();
			this.$originalDescription = this.element.find("*[data-tem-role='description']").hide();
			this.$dialogContent = $('<div/>').appendTo(this.element);
			this.refresh();
			$.ui.dialog.prototype._create.call(this);
		},

		refresh: function () {
			var messageTxt = this.options.messageText || this.$originalMessage.html();
			var descriptionTxt = this.options.description || this.$originalDescription.html();
			var content = "";
			
			this.$dialogContent.html( "  <div class='temui-message-wrapper'>"
									+ "     <div class='temui-message-summary'>"
									+ "         <span class='temui-indicator large'></span>"
									+ "         <span class='temui-popup-title'>" + messageTxt + "</span>"
									+ "     </div>"
									+ "     <div class='temui-popup-description'>" + descriptionTxt + "</div>"
									+ " </div>"
			);
			if (!descriptionTxt) {
				this.element.find('.temui-popup-description').hide();
			}
			this.$dialogContent.find('.temui-indicator').addClass('temui-' + this.options.type + '-indicator');

			if (!this.options.title && !this.element.attr('title')) {
				this.options.dialogClass = 'temui-popup-message-dialog temui-hide-title';
			}else{
				this.options.dialogClass = "temui-popup-message-dialog";
			}
		},

		/**
		 * Cleans up any modifications made to the DOM
		 * 
		 * @function
		 * @memberOf temui.popupMessage#
		 * @name destroy
		 */
		destroy: function () {
			var self = this;

			this.$dialogContent.remove();
			this.$originalMessage.show();
			this.$originalDescription.show();

			// ui.dialog destroy method doesn't call its parent's detroy (jqueryui 1.8)
			// this can be removed after updating to 1.9
			$.Widget.prototype.destroy.apply(this, arguments);

			return $.ui.dialog.prototype.destroy.call(this);
		}

	});

	/**
	 * @function
	 * @memberOf temui.popupMessage
	 * @name createPopup
	 *
	 * @description Creates a popupMessage widget and returns it to caller.
	 * <p>Parameter <i>buttons</i> is used as option <i>buttons</i> to jQuery dialog widget, with its function context changed to the underlying DOM element.</p>
	 * <p>The returned object is the widget, not the DOM element. Thus you can call its public methods directly.</p>
	 *
	 * @example
	 *      var popup = $.temui.popupMessage.createPopup('test message');
	 *      popup.close();
	 * 
	 * 
	 * @param {String} message
	 * @param {String} type Default: "information"
	 * @param {String} description optional
	 * @param {String} title optional
	 * @param {object} buttons Default: Close button
	 *
	 * @return {temui.popupMessage}
	 */
	$.temui.popupMessage.createPopup = function (message, type, description, title, buttons) {
		if (!type) {
			type = "information";
		}
		if (!buttons) {
			buttons = {};
			buttons[temui.l10n.dialogClose] = function () {
				this.popupMessage('close');
			};
		}
		var $popupElement = $('<div/>');
		for(var name in buttons){
			buttons[name] = $.proxy(buttons[name], $popupElement);
		}

		return $popupElement.popupMessage({
			title: title,
			type: type,
			buttons: buttons,
			messageText: message,
			description: description
		}).data('popupMessage');
	};

	/**
	 * @function
	 * @memberOf temui
	 * @name createPopup
	 *
	 * @description Alias of {$.temui.popupMessage.createPopup}
	 *
	 * @example
	 *      var popup = temui.createPopup('test message');
	 *      popup.close();
	 * 
	 * 
	 * @param {String} message
	 * @param {String} type Default: "information"
	 * @param {String} description optional
	 * @param {String} title optional
	 * @param {object} buttons Default: Close button
	 *
	 * @return {temui.popupMessage}
	 */
	temui.createPopup = $.temui.popupMessage.createPopup;
	
  
	/** 
	 * @class
	 * @memberOf temui
	 * @name filterInput 
	 * 
	 * @description filterInput is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).filterInput()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).filterInput()</code> function takes one argument, 
	 * an object literal with properties used in the creation of the filterInput. 
	 * The properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">data</span>: A Slick.Data.DataView object</li>
	 * 	<li><span style="font-weight:bold">filterPrompt</span>: A String that will be used as the initial prompt text in the in text input <b>(optional)</b></li>
	 * 	<li><span style="font-weight:bold">filterFunction</span>: A Function with the following signature:
	 * <code>function testFilter(item, args)</code> Where item is a "row" object in the dataView and 
	 * args is an object literal that has a "searchString" property and can be overloaded to have additional
	 * properties.
	 * <p>The filter function would look something like this:</p>
	 * <pre>
	 * function testFilter(item, args) {
	 * 	var filterString = args.searchString;
	 * 	if(filterString == null || filterString == "") {
	 * 		return true;
	 * 	}
	 * 	return (item[GridFixlet.NAME].toLowerCase().indexOf(filterString.toLowerCase()) != -1); 
	 * }
	 * </pre>
	 * </li>
	 * </ul>
	 * 
	 */ 
	$.widget("temui.filterInput", {
		options: {
			data: null,
			filterPrompt: temui.l10n.search,
			filterFunction:null
		},
		
		_create: function(){
			if(this.options.data == null) {
				tem.logging.error("No data specified for filterInput");
				return;
			} else if(this.options.data.setFilterArgs == null) {
				// TODO: add support for other types
				tem.logging.error("Filter only works for Slick.Data.DataView");
				return;
			}		

			this._initializeFilter();
		},
		
		_initializeFilter: function() {
			var timer;
			var self = this;			
			this.element.on('keyup.temui', function(e) {
					timer && clearTimeout(timer);
					timer = setTimeout(function(){
					self._applyFilter(e)
				}, 100);				
			});

			this._setFilterPrompt();
		},
		
		/** 		
		 * @event applied 
		 * @memberOf temui.filterInput
		 * @description To create a listener for this event, you need to follow the standard guidelines for listening to a 
		 * jquery widget event.
		 * @example 	
		 * $('#filterInput').bind('filterinputapplied', function(event, data){alert('filter applied!')});
		 */					
		_applyFilter: function(e){
			if (e.which == 27) {
				// esc
				this.element.val("");	
			}		
				
			var data = this.options.data;
			var filterFunction = this.options.filterFunction;
			var filterString = this.element.val();
			var args = {};
			args.searchString = filterString;
			args.filterFunction = filterFunction;
			data.setFilterArgs(args);
			data.setFilter(filterFunction);
			data.refresh();
			this._trigger("applied");
		},		
		
		
		_setFilterPrompt: function() {
			var prompt = this.options.filterPrompt;
			
			this.element.val(prompt);
			this.element.addClass("temui-filter-inactive");	

			this.element.on('focus.temui', function(){
				var $input = $(this)
					.removeClass("temui-filter-inactive")
					.addClass("temui-filter-active");
				if(prompt == $.trim($input.val())) {
					$input.val('');
				}
			});	

			this.element.on('blur.temui',function(){
				var $input = $(this);
				if($.trim($input.val()) == '') {
					$input.val(prompt);
					$input
						.removeClass("temui-filter-active")
						.addClass("temui-filter-inactive");
				} else {
					$input
						.removeClass("temui-filter-inactive")
						.addClass("temui-filter-active");
				}
			});	
		},
		
		_setOption: function(key, value) {
			if(key == "filterPrompt"){
				this.element.val(value);
			}
			
			$.Widget.prototype._setOption.apply(this, arguments);
		},
		
		destroy: function() {
			this.element.removeClass('temui-filter-active temui-filter-inactive');
			this.element.off('focus.temui');
			this.element.off('blur.temui');
			this.element.off('keyup.temui');
			$.Widget.prototype.destroy.call(this);
		}

	});

	
	/**
	 * @class 
	 * 
	 * @description gridContainer is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>
	 * so it's not created using the "new" keyword but through the standard jQuery widget convention: 
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).gridContainer()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).gridContainer()</code> function takes one argument, an object literal 
	 * with properties used in the creation of the gridContainer.  Its properties are the following:
	 * </p>
	 * 
	 * <ul>
	 * <li><span style="font-weight:bold">grid:</span> a temui.grid.DataGrid object.</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component:</p>
	 * 
	 * <ul>
	 * 	<li><span style="font-weight:bold">header</span></li>
	 * 	<li><span style="font-weight:bold">toolbar</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">buttonContainer</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">bulkButton</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">exportButton</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">filterContainer</span> (optional)</li>
	 * 	<li><span style="font-weight:bold">filter</span> (optional)</li>
	 * </ul>
	 *
	 * <p>exportButton can have additional attribute 
	 * 
	 * @example
	 * var grid = new temui.grid.DataGrid("#sampleGrid", dataView, columns});
	 * $('#dataGridContainer').gridContainer({grid:grid});
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="dataGridContainer" style="padding:0px; margin-top:5px;" class=""&gt;
	 * 	&lt;h3 data-tem-role="header"&gt;&lt;?hxlat Fixlets?&gt;&lt;/h3&gt;
	 * 	&lt;div data-tem-role="toolbar"&gt;
	 * 		&lt;div data-tem-role="buttonContainer"&gt;
	 * 			&lt;button&gt;&lt;?hxlat Regular Button?&gt;&lt;/button&gt;
	 * 			&lt;button data-tem-role="bulkButton"&gt;&lt;?hxlat Bulk Button?&gt;&lt;/button&gt;
	 * 			&lt;button id="bulkButton" data-tem-role="bulkButton"&gt;
	 * 				&lt;span style="vertical-align: middle;"&gt;&lt;?hxlat Actions?&gt;&lt;/span&gt;
	 * 				&lt;span class="ui-icon ui-icon-triangle-1-s" style="display:inline-block; vertical-align: middle;"&gt;&lt;/span&gt;
	 * 			&lt;/button&gt;
	 * 			&lt;button data-tem-role="exportButton"&gt;&lt;/button&gt;
	 * 		&lt;/div&gt;
	 * 		&lt;div data-tem-role="filterContainer"&gt;
	 * 			&lt;input data-tem-role="filter" type="text"/&gt;
	 * 		&lt;/div&gt;
	 * 		&lt;br clear="all"&gt;
	 * 	&lt;/div&gt;
	 * 	&lt;div id="sampleGrid" style="height:500px;"&gt;&lt;/div&gt;
	 * 	&lt;div id="pager"&gt;&lt;/div&gt;
	 * &lt;/div&gt;
	 *
	 * @example
	 * &lt;button data-tem-role="exportButton" data-tem-columns="exportColumns">&lt;/button>
	 * 
	 * @memberOf temui
	 * @name gridContainer
	 */	 
	$.widget("temui.gridContainer", {
		// TODO: assumption is that these options won't change after initial init
		// need to account for changes in _setOption
		options: {
			grid:null,
			filterOptions:null
		},
				
		_create: function() {
			if(this.options.grid == null) {	
				tem.logging.error("No datagrid specified for gridContainer");
				return;
			}
			
			this.element.addClass('temui-datagrid-container');
			
			this.element.find("*[data-tem-role='header']")
				.addClass("temui-datagrid-header")
				.addClass("ui-widget-header")
				.addClass("ui-corner-all");

			this.element.find("div[data-tem-role='toolbar']")
				.addClass("temui-toolbar");

			this._initializeButtons();
			this._initializeFilter();
		},

		_initializeButtons: function() {
			this.element.find("div[data-tem-role='buttonContainer']")	
				.addClass("temui-toolbar-button");

			this.element.find('button').button();
			var $bulkButtons = this.element.find("button[data-tem-role='bulkButton']");
			if($bulkButtons.length) {
				this._bulkButton($bulkButtons);
			}
			var $exportButtons = this.element.find("button[data-tem-role='exportButton']");
			if($exportButtons.length) {
				this._exportButton($exportButtons);
			}
		},

		_initializeFilter: function() {
			var $filterContainer = this.element.find("div[data-tem-role='filterContainer']")
			if(!$filterContainer.length) {
				return;
			}

			this.element.find("div[data-tem-role='buttonContainer']")	
				.addClass("yui3-u");

			$filterContainer =this.element.find("div[data-tem-role='filterContainer']")
				.addClass("yui3-u")
				.addClass("temui-datagrid-filter-container");
				
			// TODO: externalize this				
			$filterContainer.parent()
				.css("position","relative")	
				
			if(this.options.grid 
					&& this.options.filterOptions 
					&& this.options.grid.getData() 
					&& this.options.filterOptions
					&& this.options.filterOptions.filterFunction) {
				$filterContainer.find("input[data-tem-role='filter']")
					.filterInput({
							data:this.options.grid.getData(), 
							filterPrompt:this.options.filterOptions.filterPrompt, 
							filterFunction:this.options.filterOptions.filterFunction
						});
			} else {
				tem.logging.error("Filter requires that options for grid, filterPrompt and filterFunction are set.");
			}		
		},

		_bulkButton: function(buttons){
			var grid = this.options.grid;			
			buttons.button("option", "disabled", true);
			grid.onSelectedRowsChanged.subscribe(function() {
				if (grid.getSelectedRows().length == 0) {
					buttons.button( "option", "disabled", true );
				} else {
					buttons.button( "option", "disabled", false );
				}
			});
			
			return buttons;
		},

		_exportButton: function(buttons){
			var grid = this.options.grid;
			buttons.each(function(){
				if ($(this).text() == '') {
					$(this).button('destroy').text(temui.l10n.exportToCSV).button();
				}
				$(this).click(function(){
					var csvColumns = null;
					if ($(this).attr('data-tem-columns')) {
						try {
							eval('csvColumns = ' + $(this).attr('data-tem-columns'));
						} catch (e) {
							tem.logging.error(e.message);
							return false;
						}
					}
					grid.exportToCSV(csvColumns);
				});
			});
			return buttons;
		}
		
	});


	/** 
	 * @class
	 * @memberOf temui
	 * @name healthCheck 
	 * 
	 * @description healthCheck is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>.
	 * A healthCheck widget is initilized as follows:
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).healthCheck()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).healthCheck()</code> function can take an argument, 
	 * an object literal with properties used in the creation of the widget. 
	 * The properties are the following:
	 * </p>
	 * 
	 * <ul>
	 *  <li><span style="font-weight:bold">severity</span> (defaults to "medium") A String indicating severity of the check, possible values: "critical", high", medium", "low".</li>
	 *  <li><span style="font-weight:bold">ignored</span> (defaults to false) If set to true, this check always show Ignored as its status. Its status is also ignored from health check group's status.</li>
	 *  <li><span style="font-weight:bold">configurable</span> (defaults to true) If set to true, user is allowed to ignore the check. If set to false, the option is not avaiable to user.</li>
	 *  <li><span style="font-weight:bold">template</span> A String used as UI template for the health check. Default template is used if the option is not set. Any custom template should have all the elements whose data-tem-role is available in the deault template.</li>
	 *  <li><span style="font-weight:bold">expandedIcon</span> (defaults to "temui-icon-expanded") The css class name used for the icon added in front of health check's title when the item is expanded.</li>
	 *  <li><span style="font-weight:bold">collapsedIcon</span> (defaults to "temui-icon-collapsed") The css class name used for the icon added in front of health check's title when the item is collapsed.</li>
	 * </ul>
	 *
	 * <p>
	 * The widget can trigger the following events:
	 * </p>
	 * 
	 * <ul>
	 *  <li><span style="font-weight:bold">refresh</span> is fired when refresh() function is called on this widget. You should listen to this event and update the widget.</li>
	 *  <li><span style="font-weight:bold">statuschanged</span> is fired when health check status is set to a new value.</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component.</p>
	 * 
	 * <ul>
	 *  <li><span style="font-weight:bold">healthCheckTitle</span></li>
	 *  <li><span style="font-weight:bold">healthCheckDescription</span></li>
	 * </ul>
	 * 
	 * <p>
	 * The following attribute can be used on the top level element:
	 * </p>
	 * 
	 * <ul>
	 *  <li><span style="font-weight:bold">data-tem-healthcheck-refresh</span> 'refresh' event listener. You should listen to this event and update the widget.</li>
	 *  <li><span style="font-weight:bold">data-tem-healthcheck-severity</span> Same as 'severity' in widget option. When both are defined, this attribute has higher priority.</li>
	 * </ul>
	 * 
	 * @example
	 * var updateHealthCheckFunction = function(event) {
	 *     var healthCheck = $(event.target).data('healthCheck');
	 *     // add health check logic here and update health check UI accordingly
	 *     healthCheck.setStatus($.temui.healthCheck.fail);
	 *     healthCheck.setResults('<?jxlat Sample results.?>');
	 *     healthCheck.setResolutions('<?jxlat Sample resolutions.?>');
	 * }
	 * 
	 * $("#healthcheck1").healthCheck({
	 *     refresh: updateHealthCheckFunction
	 * });
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="healthcheck1"&gt;
	 *   &lt;div data-tem-role="healthCheckTitle"&gt;Health check title.&lt;/div&gt;
	 *   &lt;div data-tem-role="healthCheckDescription"&gt;This is a more detailed description.&lt;/div&gt;
	 * &lt;/div&gt;
	 *
	 * @see temui.healthCheckGroup
	 * 
	 */
	$.widget("temui.healthCheck", {

	    /**
	     * Default UI template for health check item. 
	     * You can supply a custom template in options to healthCheck widget.
	     * Custom template should keep all elements whose data-tem-role is available in this detault template.
	     * @type {String}
	     * @private
	     */
	    _defaultTemplate:
	        '<div class="temui-healthcheck">\
	            <table width="100%">\
	                <tr>\
	                    <td valign="top">\
	                        <div style="display:block">\
	                            <span data-tem-role="expandIcon"></span>\
	                            <span class="temui-healthcheck-title" data-tem-role="healthCheckNewTitle"></span>\
	                            <div data-tem-role="configIcon"><span class="ui-icon ui-icon-gear"></span></div>\
	                            <div style="clear:both"></div>\
	                        </div>\
	                        <div class="temui-healthcheck-details" data-tem-role="healthCheckDetails">\
	                            <div class="temui-healthcheck-description" data-tem-role="healthCheckNewDescription"></div>\
	                            <div class="temui-healthcheck-results-section" data-tem-role="healthCheckResultsSection">\
	                                <div class="temui-healthcheck-results-title">' + temui.l10n.healthCheck.results + '</div>\
	                                <div class="temui-healthcheck-results" data-tem-role="healthCheckResults"></div>\
	                            </div>\
	                            <div class="temui-healthcheck-resolutions-section" data-tem-role="healthCheckResolutionsSection">\
	                                <div class="temui-healthcheck-resolutions-title">' + temui.l10n.healthCheck.resolutions + '</div>\
	                                <div class="temui-healthcheck-resolutions" data-tem-role="healthCheckResolutions"></div>\
	                            </div>\
	                        </div>\
	                    </td>\
	                    <td valign="top" align="center" width="80">\
	                        <div class="temui-healthcheck-status" data-tem-role="healthCheckStatus"></div>\
	                    </td>\
	                    <td valign="top" align="center" width="80">\
	                        <div class="temui-healthcheck-severity" data-tem-role="healthCheckSeverity"></div>\
	                    </td>\
	                </tr>\
	            </table>\
	        </div>',

	    options: {
	        severity: 'medium',             // critical, high, medium or low
	        ignored: false,                 // ignoring a check excludes it from overall status
	        configurable: true,             // allows users to ignore the check
	        template: null,
	        expandedIcon: 'temui-icon-expanded',
	        collapsedIcon: 'temui-icon-collapsed'
	    },

	    _create: function () {
	        var self = this;
	        this.currentStatus = null;

	        this.$origTitle = this.element.find("*[data-tem-role='healthCheckTitle']").hide();
	        this.$origDescription = this.element.find("*[data-tem-role='healthCheckDescription']").hide();

	        if (!this.options.template) {
	            this.options.template = this._defaultTemplate;
	        }

	        this.$healthCheckItem = $(this.options.template).appendTo(this.element);

	        this.$title = this.$healthCheckItem.find('*[data-tem-role="healthCheckNewTitle"]');
	        this.$expandIcon = this.$healthCheckItem.find("*[data-tem-role='expandIcon']");
	        this.$configIcon = this.$healthCheckItem.find("*[data-tem-role='configIcon']");
	        this.$description = this.$healthCheckItem.find('*[data-tem-role="healthCheckNewDescription"]');
	        this.$status = this.$healthCheckItem.find('*[data-tem-role="healthCheckStatus"]');
	        this.$resultsSection = this.$healthCheckItem.find('*[data-tem-role="healthCheckResultsSection"]');
	        this.$resolutionsSection = this.$healthCheckItem.find('*[data-tem-role="healthCheckResolutionsSection"]');
	        this.$results = this.$healthCheckItem.find('*[data-tem-role="healthCheckResults"]');
	        this.$resolutions = this.$healthCheckItem.find('*[data-tem-role="healthCheckResolutions"]');
	        this.$severity = this.$healthCheckItem.find('*[data-tem-role="healthCheckSeverity"]');

	        this.$title.on('click', function () {
	            var $details = self.$healthCheckItem.find('*[data-tem-role="healthCheckDetails"]');
	            $details.toggle();
	            if($details.is(':hidden')){
	               self.$expandIcon.removeClass(self.options.expandedIcon).addClass(self.options.collapsedIcon);
	            }else{
	               self.$expandIcon.removeClass(self.options.collapsedIcon).addClass(self.options.expandedIcon);
	            }
	        }).click();

	        this.$expandIcon.on('click', function() {
	            self.$title.click();
	        });

	        this.$configIcon.on('click', function() {
	            if (self.$configDialog) {
	                self.$configDialog.dialog('open');
	            }else{
	                self.$configDialog = $('<div class="temui-healthcheck-settings">\
	                                            <div class="temui-healthcheck-settings-description">' + temui.l10n.healthCheck.settingsIgnoredDescription + '</div>\
	                                            <div class="temui-healthcheck-settings-inputs"><label><input data-tem-role="ignoredInput" type="checkbox"/> ' + temui.l10n.healthCheck.settingsIgnoredThisCheck + '</label></div>\
	                                        </div>')
	                .dialog({
	                    title: temui.l10n.healthCheck.settingsIgnoredTitle,
	                    height: 'auto',
	                    buttons: [
	                        {
	                            text: temui.l10n.healthCheck.settingsSave,
	                            click: function() {
	                                self._setOption('ignored', self.$configDialogInput.attr('checked') == 'checked');
	                                $(this).dialog("close");
	                            }
	                        }
	                    ]
	                });
	                self.$configDialogInput = self.$configDialog.find('input[data-tem-role="ignoredInput"]');
	                if (self.options.ignored) {
	                    self.$configDialogInput.attr('checked', 'checked');
	                };
	            }
	        });

	        if (this.element.attr('data-tem-healthcheck-refresh')) {
	            var healthCheckFunction;
	            try {
	                healthCheckFunction = eval(self.element.attr('data-tem-healthcheck-refresh'));
	            } catch(error) {
	                tem.logging.error("Error while evaluting data-tem-healthcheck-refresh: " + error.message);
	                throw new Error(temui.l10n.adfapi.errorInternal);
	            }
	            this.element.bind('healthcheckrefresh', healthCheckFunction);
	        }

	        this.refresh();
	    },

	    /**
	     * @function
	     * @description The function calls checkFunction 
	     * and updates UI according to results returned by checkFunction.
	     * 
	     * @memberOf temui.healthCheck#
	     * @name refresh
	     */
	    refresh: function () {
	        var self = this;
	        this.severity = this.element.attr('data-tem-healthcheck-severity') || this.options.severity;
	        this.$title.html(this.$origTitle.html());
	        this.$description.html(this.$origDescription.html());
	        this.$severity.text(temui.l10n.healthCheck.severity[this.severity]);

	        if (this.options.configurable) {
	            this.$configIcon.show();
	        }else{
	            this.$configIcon.hide();
	        }

	        /**
	         * @event
	         * @description The event is triggered when healthCheck's refresh function is called.
	         * HealthCheck's refresh is also called when its healthCheckGroup is refreshed.
	         * 
	         * @memberOf temui.healthCheck#
	         * @name refresh
	         */
	        this._trigger('refresh');
	    },

	    _setOption: function (name, value) {
	        $.Widget.prototype._setOption.apply(this, arguments);
	        this.refresh();
	    },

	    /**
	     * Set content for the result section
	     * 
		 * @memberOf temui.healthCheck#
		 * @name setResults
	     * @function 
	     * @param {String} results Results in HTML
	     */
	    setResults: function(results) {
	        this.$results.html(results);
	        if (!results) {
	            this.$resultsSection.hide();
	        }else{
	            this.$resultsSection.show();
	        }
	    },


	    /**
	     * Set content for the resolution section
	     * 
		 * @memberOf temui.healthCheck#
		 * @name setResolutions
		 * @function
	     * @param {String} resolutions Resolutions in HTML
	     */
	    setResolutions: function(resolutions) {
	        this.$resolutions.html(resolutions);
	        if (!resolutions) {
	            this.$resolutionsSection.hide();
	        }else{
	            this.$resolutionsSection.show();
	        }
	    },

	    /**
	     * Set health check status.
	     * 
		 * @memberOf temui.healthCheck#
		 * @name setStatus
		 * @function
	     * @param {String} status 
	     * <ul>
	     *     <li><strong>$.temui.healthCheck.pass</strong> Pass</li>
	     *     <li><strong>$.temui.healthCheck.fail</strong> Fail</li>
	     *     <li><strong>$.temui.healthCheck.na</strong> N/A</li>
	     * </ul>
	     */
	    setStatus: function(status) {
	        if (this.options.ignored) {
	            status = $.temui.healthCheck.ignored;
	        }
	        this.$status.removeClass('fail').removeClass('pass');
	        switch (status) {
	            case $.temui.healthCheck.ignored:
	                this.$status.html(temui.l10n.healthCheck.ignored);
	                break;
	            case $.temui.healthCheck.na:
	                this.$status.html(temui.l10n.healthCheck.na);
	                break;
	            case $.temui.healthCheck.pass:
	                this.$status.html(temui.l10n.healthCheck.pass);
	                this.$status.addClass('pass');
	                break;
	            case $.temui.healthCheck.fail:
	                this.$status.html(temui.l10n.healthCheck.fail);
	                this.$status.addClass('fail');
	                break;
	            default:
	                tem.logging.error("Invalid health check status value.");
	                throw new Error(temui.l10n.adfapi.errorInternal);
	        }

	        if (status !== this.currentStatus) {
	            this.currentStatus = status;

	            /**
	             * @event statuschanged 
	             * @memberOf temui.healthCheck
	             * @description The event is triggered when the health check item's status is changed.
	             * @example     
	             * $('#healthCheck').bind('healthcheckstatuschanged', function(event, data){alert('Status changed!')});
	             */
	            this._trigger('statuschanged');
	        }
	    },

	    /**
	     * Returns current status of this check.
	     * 
	     * @function
	     * @memberOf temui.healthCheck#
	     * @name getStatus
	     * @return {String}
	     */
	    getStatus: function() {
	        return this.currentStatus;
	    },

	    /**
	     * Cleans up any modifications made to the DOM
	     * 
	     * @function
	     * @memberOf temui.healthCheck#
	     * @name destroy
	     */
	    destroy: function() {
	        this.$healthCheckItem.remove();
	        this.$origTitle.show();
	        this.$origDescription.show();

	        $.Widget.prototype.destroy.apply(this, arguments);
	    }

	});

	/**
	 * @memberOf temui.healthCheck
	 * @name pass 
	 * @description Static variable for health check status: Pass. 
	 * <pre>$.temui.healthCheck.pass</pre>
	 * @type {String}
	 * @static
	 */
	$.temui.healthCheck.pass        = 'pass';

	/**
	 * @memberOf temui.healthCheck
	 * @name fail 
	 * @description Static variable for health check status: Fail
	 * <pre>$.temui.healthCheck.fail</pre>
	 * 
	 * @type {String}
	 */
	$.temui.healthCheck.fail        = 'fail';

	/**
	 * @memberOf temui.healthCheck
	 * @name na 
	 * @description Static variable for health check status: N/A
	 * <pre>$.temui.healthCheck.na</pre>
	 * @type {String}
	 */
	$.temui.healthCheck.na          = 'na';

	/**
	 * @memberOf temui.healthCheck
	 * @name ignored 
	 * @description Static variable for health check status: Ignored
	 * <pre>$.temui.healthCheck.ignored</pre>
	 * @type {String}
	 */
	$.temui.healthCheck.ignored     = 'ignored';


	/**
	 * @function
	 * @description Utility function that can be used to validate analysis activation requirements.
	 * <br/>
	 * The function needs an array of analysis information <span style="font-weight:bold">analysesInfo</span>. It is an array of Object literals. The individual object literals can have the following properties:
	 *  <ul>
	 *  <li>ids- Array of analysis ids.</li> 
	 *  <li>siteKey (optional)- siteKey that points to list of predefined sites in the tem.config.sites property. If siteKey is not provided, the default site is used.</li> 
	 *  </ul>
	 *
	 * @memberOf temui.healthCheck
	 * @name analysisActivationCheck
	 * @function
	 * @param {jQuery.Event} event refresh event fired by a healthCheck widget
	 * @param {Array} analysesInfo An array of Object literals. See above.
	 *
	 * @example
	 * <pre>
	 * tem.config.sites = [new tem.model.SiteIdentifier('BES_SPRT','BES Support')];
	 * var sampleAnalysisCheck = function(event) {
	 *    var analysesInfo = [{ids:[582, 204, 227]}];
	 *    return $.temui.healthCheck.analysisActivationCheck(event, analysesInfo);
	 * };
	 * </pre>
	 */
	$.temui.healthCheck.analysisActivationCheck = function(event, analysesInfo) {

	    var healthCheck = $(event.target).data('healthCheck');
	    if (!healthCheck) {
	        tem.logging.error("Invalid event is passed to analysisActivationCheck");
	        throw new Error(temui.l10n.adfapi.errorInternal);
	    }

	    var inactivatedAnalysesRelArray = new Array();
	    var activatedAnalysesRelArray = new Array();
	    var analysisActivatedClause = '(exists best activation of it AND active flag of best activation of it)';

	    for (var i = 0; i < analysesInfo.length; i++) {
	        var ids = analysesInfo[i].ids;
	        var siteKey = analysesInfo[i].siteKey;
	        var siteIdentifier = tem.config.getSite(siteKey);
	        var siteRel = 'bes sites whose (name of it contains "' + siteIdentifier.name + '")';

	        var inactivatedAnalysesRel = 'fixlets (' + ids.join(';') + ')' + ' whose (not ' + analysisActivatedClause + ') of ' + siteRel;
	        var activatedAnalysesRel = 'fixlets (' + ids.join(';') + ')' + ' whose (' + analysisActivatedClause + ') of ' + siteRel;

	        inactivatedAnalysesRelArray.push(inactivatedAnalysesRel);
	        activatedAnalysesRelArray.push(activatedAnalysesRel);
	    }

	    var analysisCountRel = 'number of (' + inactivatedAnalysesRelArray.join('; ') + '); number of (' + activatedAnalysesRelArray.join('; ') + ')';
	    var analysisCount = tem.evalRel(analysisCountRel).toArray();

	    if (analysisCount[0] > 0) {
	        var linksRel = 'ul of concatenation of lis of links of (' + inactivatedAnalysesRelArray.join('; ') + ')';
	        var inactivatedAnalysesStr = tem.evalRel(linksRel);

	        var inactivatedAnalysisIdRel = '(id of site of it as string & ":" & id of it as string) of (' + inactivatedAnalysesRelArray.join('; ') + ')';
	        var inactivatedAnalysisIds = tem.evalRel(inactivatedAnalysisIdRel);

	        var results = temui.l10n.healthCheck.analysisActivation.activeAnalyses + " " + analysisCount[1] 
	                    + "<br/>" 
	                    + temui.l10n.healthCheck.analysisActivation.inactiveAnalyses + " " + analysisCount[0];

	        var resolutions = temui.l10n.healthCheck.analysisActivation.activateAnalyses
	                        + "<br/>" 
	                        + inactivatedAnalysesStr 
	                        + "<br/>"
	                        + '<button data-tem-role="activateAllButton">' + temui.l10n.healthCheck.analysisActivation.activateAll + '</button>';

	        healthCheck.setStatus($.temui.healthCheck.fail);
	        healthCheck.setResults(results);
	        healthCheck.setResolutions(resolutions);

	        healthCheck.element.find('button[data-tem-role="activateAllButton"]').button().click(function(){
	            if (tem.content.activateAnalyses(inactivatedAnalysisIds.toArray())) {
	                healthCheck.refresh();
	            }
	        });

	    }else{

	        healthCheck.setStatus($.temui.healthCheck.pass);
	        healthCheck.setResults(temui.l10n.healthCheck.analysisActivation.allActivated);
	        healthCheck.setResolutions(null);
	    }

	};

	/** 
	 * @class
	 * @memberOf temui
	 * @name healthCheckGroup 
	 * 
	 * @description healthCheckGroup is a jQuery widget, set up according to the 
	 * <a href="http://wiki.jqueryui.com/w/page/12138135/Widget%20factory">jQuery Widget Factory API</a>.
	 * <p>
	 * healthCheckGroup represents a group of multiple healthCheck widgets. You can use healthCheckGroup to simplify initilization of 
	 * a group of healthCheck widgets. It initializes its healthCheck widgets and refreshes them when healthCheckGroup's refresh() is called.
	 * </p>
	 * 
	 * <p>A healthCheckGroup widget is initilized as follows:
	 * <code>$(<span style="font-style:italic;">jQuery selector</span>).healthCheckGroup()</code>
	 * </p>
	 * 
	 * <p>
	 * The <code>$(<span style="font-style:italic;">jQuery selector</span>).healthCheckGroup()</code> function can take an argument, 
	 * an object literal with properties used in the creation of the widget. 
	 * The properties are the following:
	 * </p>
	 * 
	 * <ul>
	 *  <li><span style="font-weight:bold">template</span> A String used as UI template for the health check group. Default template is used if the option is not set. Any custom template should have all the elements whose data-tem-role is available in the deault template. (optional)</li>
	 *  <li><span style="font-weight:bold">healthCheckItemTemplate</span> A String used as UI template for the health check items. Default template is used if the option is not set. (optional)</li>
	 * </ul>
	 * 
	 * <p>
	 * The HTML markup can define the following data-tem-role attributes to be used when rendering 
	 * the component.</p>
	 * 
	 * <ul>
	 *  <li><span style="font-weight:bold">healthCheckGroupTitle</span> Title</li> 
	 *  <li><span style="font-weight:bold">healthCheckItem</span> The DOM element to be converted to a healthCheck widget.</li>
	 * </ul>
	 * 
	 * @example
	 * var updateHealthCheckFunction = function(event) {
	 *     var healthCheck = $(event.target).data('healthCheck');
	 *     // add health check logic here and update health check UI accordingly
	 *     healthCheck.setStatus($.temui.healthCheck.fail);
	 *     healthCheck.setResults('<?jxlat Sample results.?>');
	 *     healthCheck.setResolutions('<?jxlat Sample resolutions.?>');
	 * }
	 * 
	 * $("#healthcheckGroup1").healthCheckGroup();
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="healthcheckGroup1"&gt;
	 *   &lt;div data-tem-role="healthCheckGroupTitle"&gt;Health check group title.&lt;/div&gt;
	 *   &lt;div data-tem-role="healthCheckItem" data-tem-healthcheck-refresh="updateHealthCheckFunction"&gt;
	 *       &lt;div data-tem-role="healthCheckTitle"&gt;A sample health check title.&lt;/div&gt;
	 *       &lt;div data-tem-role="healthCheckDescription"&gt;A sample health check description.&lt;/div&gt;
	 *   &lt;/div&gt;
	 * &lt;/div&gt;
	 *
	 * @see temui.healthCheck
	 * 
	 */
	$.widget("temui.healthCheckGroup", {

	    /**
	     * Default UI template for health check group. 
	     * You can supply a custom template in options to healthCheckGroup widget.
	     * Custom template should have all elements whose data-tem-role is available in this detault template.
	     *
	     * @private
		 * @memberOf temui.healthCheckGroup
	     * @type {String}
	     */
	    _defaultTemplate: '<div class="temui-pane">\
	            <div class="temui-pane-header">\
	                <div class="temui-healthcheck-group-header">\
	                    <div class="temui-healthcheck-group-title" data-tem-role="groupTitle"></div>\
	                    <div class="temui-healthcheck-group-status">\
	                        <span>' + temui.l10n.healthCheck.groupOverallStatus + ' </span>\
	                        <span class="temui-healthcheck-status" data-tem-role="groupStatus"></span>\
	                    </div>\
	                    <div style="clear:both"></div>\
	                </div>\
	            </div>\
	            <div class="temui-pane-body">\
	                <div class="temui-healthcheck-column-name">\
	                    <table width="100%">\
	                        <tr>\
	                            <td valign="top">' + temui.l10n.healthCheck.titleName + '</td>\
	                            <td valign="top" align="center" width="80">' + temui.l10n.healthCheck.titleStatus + '</td>\
	                            <td valign="top" align="center" width="80">' + temui.l10n.healthCheck.titleSeverity + '</td>\
	                        </tr>\
	                    </table>\
	                </div>\
	                <div data-tem-role="healthCheckItems"></div>\
	            </div>\
	        </div>',

	    options: {
	        template: null,                 // template used by the group of health checks. Keep as null to use default template
	        healthCheckItemTemplate: null   // template used each health check item. Keep as null to use default template 
	    },

	    _create: function () {
	        var self = this;
	        
	        if (this.options.template === null) {
	            this.options.template =  this._defaultTemplate;   
	        };
	        
	        this.$origTitle = this.element.children('*[data-tem-role="healthCheckGroupTitle"]').hide();

	        this.$healthCheckItems = this.element.children('*[data-tem-role="healthCheckItem"]');
	        this.$healthCheckGroup = $(this.options.template).appendTo(this.element);
	        this.$healthCheckItemContainer = this.element.find('*[data-tem-role="healthCheckItems"]');
	        this.$healthCheckItems.appendTo(this.$healthCheckItemContainer);
	        this.$title = this.element.find('*[data-tem-role="groupTitle"]');
	        this.$overallStatus = this.element.find('*[data-tem-role="groupStatus"]');

	        // initialize health check items if they have not been initilized
	        this.$healthCheckItems.each(function(i, e) {
	            var $e = $(e);
	            if (!$e.data('healthCheck')) {
	                var healthCheckFunction = null;
	                if ($e.attr('data-tem-healthcheck-refresh')) {
	                    try {
	                        healthCheckFunction = eval($e.attr('data-tem-healthcheck-refresh'));
	                    } catch(error) {
	                        tem.logging.error("Error while evaluting data-tem-healthcheck-refresh: " + error.message);
	                        throw new Error(temui.l10n.adfapi.errorInternal);
	                    }
	                }
	                $e.healthCheck({
	                    refresh: healthCheckFunction,
	                    template: self.options.healthCheckItemTemplate
	                });
	            }
	            $e.bind('healthcheckstatuschanged', function() {
	                self._refreshStatus();
	            });
	        });

	        this.refresh();
	        this._refreshStatus();
	    },

	    /**
	     * Refresh its title and call refresh on its healthCheck items
	     *
		 * @memberOf temui.healthCheckGroup#
	     */
	    refresh: function() {
	        this.$title.html(this.$origTitle.html());
	        this.$healthCheckItems.healthCheck('refresh');
	    },

	    _refreshStatus: function() {
	        var existsFail = false,
	            existsPass = false,
	            existsNA = false;

	        this.$healthCheckItems.each(function(i, e) {
	            var $e = $(e);
	            var status = $e.healthCheck('getStatus');
	            switch (status) {
	                case $.temui.healthCheck.na:
	                    existsNA = true;
	                    break;
	                case $.temui.healthCheck.pass:
	                    existsPass = true;
	                    break;
	                case $.temui.healthCheck.fail:
	                    existsFail = true;
	                    break;
	            }
	        });

	        if (existsFail) {
	            overallStatus = $.temui.healthCheck.fail;
	        }else if (existsPass) {
	            overallStatus = $.temui.healthCheck.pass;
	        }else if (existsNA) {
	            overallStatus = $.temui.healthCheck.na;
	        }else{
	            overallStatus = $.temui.healthCheck.ignored;
	        }

	        this.$overallStatus.removeClass('pass').removeClass('fail');
	        switch (overallStatus) {
	            case $.temui.healthCheck.ignored:
	                this.$overallStatus.html(temui.l10n.healthCheck.ignored);
	                break;
	            case $.temui.healthCheck.na:
	                this.$overallStatus.html(temui.l10n.healthCheck.na);
	                break;
	            case $.temui.healthCheck.pass:
	                this.$overallStatus.html(temui.l10n.healthCheck.pass);
	                this.$overallStatus.addClass('pass');
	                break;
	            case $.temui.healthCheck.fail:
	                this.$overallStatus.html(temui.l10n.healthCheck.fail);
	                this.$overallStatus.addClass('fail');
	                break;
	        }
	    },

	    /**
	     * Cleans up any modifications made to the DOM
	     * 
	     * @function
	     * @memberOf temui.healthCheckGroup#
	     * @name destroy
	     */
	    destroy: function() {
	        this.$healthCheckItems.healthCheck('destroy').appendTo(this.element);
	        this.$healthCheckGroup.remove();
	        this.$origTitle.show();
	        $.Widget.prototype.destroy.apply(this, arguments);
	    }
	});
  
	
	/**
	 * @description Add a custom input validation method. 
	 * This is a wrapper for <a href='http://docs.jquery.com/Plugins/Validation/Validator/addMethod'>$.validator.addMethod</a>.
	 */
	temui.addValidationMethod = function(name, method, message){
		$.validator.addMethod(name, method, message);
	}
	 
	/**
	 * @class
	 * 
	 * @description <span style="font-weight:bold;">dataGrid</span> is the standard UI data grid component. It
	 * extends the Slick.Grid component from the <a href="https://github.com/mleibman/SlickGrid">SlickGrid</a> 
	 * jQuery library.  Included with the ADF under libs is the version of the SlickGrid library used by the
	 * ADF along with its sample code. Please refer to its online/included documentation for details about the 
	 * Slick.Grid component on which dataGrid based.
	 * @augments Slick.Grid
	 * 
	 * @param {Slick.Data.DataView|Array} data 
	 * @param {Object[]} columns An array of object literals, that define the columns of the dataGrid.
	 * <code>var columns = [{id:"name", name:"Name", field:GridFixlet.LINK, sortable: true}]</code>
	 * 
	 * The "columns" object can have the following properties (refer to SlickGrid documentation for more details):
	 * <ul>
	 * <li>id</li>
	 * <li>name</li>
	 * <li>field</li>
	 * <li>toolTip</li>
	 * <li>width</li>
	 * <li>minWidth</li>
	 * <li>maxWidth</li>
	 * <li>cssClass</li>
	 * <li>focusable</li>
	 * <li>resizable</li>
	 * <li>sortable</li>
	 * <li>selectable</li>
	 * <li>formatter</li>
	 * <li>editor</li>
	 * <li>validator</li>
	 * <li>groupTotalsFormatter</li>
	 * <li>asyncPostRender</li>
	 * <li>rerenderOnResize</li>
	 * <li>cannotTriggerInsert</li>
	 * </ul>
	 *
	 * @param {Object} gridOptions Options used in configuration of the data grid (refer to SlickGrid documentation for more details):
	 * <ul>      
	 * <li>explicitInitialization: false</li>
	 * <li>rowHeight: 25</li>
	 * <li>defaultColumnWidth: 80</li>
	 * <li>enableAddRow: false</li>
	 * <li>leaveSpaceForNewRows: false</li>
	 * <li>editable: false</li>
	 * <li>autoEdit: true</li>
	 * <li>enableCellNavigation: true</li>
	 * <li>enableColumnReorder: true</li>
	 * <li>asyncEditorLoading: false</li>
	 * <li>asyncEditorLoadDelay: 100</li>
	 * <li>forceFitColumns: false</li>
	 * <li>enableAsyncPostRender: false</li>
	 * <li>asyncPostRenderDelay: 60</li>
	 * <li>autoHeight: false</li>
	 * <li>editorLock: Slick.GlobalEditorLock</li>
	 * <li>showHeaderRow: false</li>
	 * <li>headerRowHeight: 25</li>
	 * <li>showTopPanel: false</li>
	 * <li>topPanelHeight: 25</li>
	 * <li>formatterFactory: null</li>
	 * <li>editorFactory: null</li>
	 * <li>cellFlashingCssClass: "flashing"</li>
	 * <li>selectedCellCssClass: "selected"</li>
	 * <li>multiSelect: true</li>
	 * <li>enableTextSelectionOnCells: false</li>
	 * <li>dataItemColumnValueExtractor: null</li>
	 * <li>fullWidthRows: false</li>
	 * </ul>
	 * </li>
	 * @example
	 * var grid = new temui.grid.DataGrid("#sampleGrid", dataView, columns});	
	 * 
	 * @memberOf temui
	 * @name dataGrid
	 */	  
	temui.grid.DataGrid = function(gridElementId, data, columns, options) {
		try{
			Slick.Grid;
		} catch(e){
			tem.logging.error("temui.grid.DataGrid requires Slick.Grid libraries to be loaded");			
			throw new Error(temui.l10n.adfapi.errorInternal);
		}
		Slick.Grid.call(this, gridElementId, data, columns, options);
		this.$gridEl = $(gridElementId);
		this._init();	
	};

	function tmp() {}
	try {
		tmp.prototype = Slick.Grid.prototype;
	} catch(e) {}
	temui.grid.DataGrid.prototype = new tmp(); 
	 
	temui.grid.DataGrid.prototype._init = function(){
		var prevWidth  = this.$gridEl.width();
		var prevHeight = this.$gridEl.height();
				
		var self = this;
		
		this.autosizeColumns();
		this.render();	
		
		$(window).resize(function () {
			if (prevWidth === self.$gridEl.width() && prevHeight === self.$gridEl.height()) {
				return;
			}
			prevWidth  = self.$gridEl.width();
			prevHeight = self.$gridEl.height();
			self.$gridEl.trigger('resize');
		});
	
		$(this.$gridEl).resize(function () {
			self.resizeCanvas();
			self.autosizeColumns();
		});
		
	
		if(self.getData() && self.getData().onRowsChanged) {
			// make sure sorting changes show up
			self.getData().onRowsChanged.subscribe(function(e,args) {
				self.invalidateRows(args.rows);
				self.render();
			});
			// make sure filter changes show up	
			this.getData().onRowCountChanged.subscribe(function(args) {
				self.updateRowCount();
				self.render();
			});
		}
	};

	/**
	 * @memberOf temui.grid.DataGrid
	 * @name exportToCSV
	 * @description Export grid content to csv format.
	 * 
	 * @param  {array} csvColumns Array of object literals which use the same format as columns parameter to DataGrid constructor.
	 */
	temui.grid.DataGrid.prototype.exportToCSV = function(csvColumns){
		var grid = this;
		var gridData = grid.getData();
		var csvContent = "";
		var cols = csvColumns;
		var defaultFilename = "export.csv";

		if (cols == null) {
			cols = grid.getColumns();
		}
		temui.showPageLoading();
		if(typeof gridData == 'array') {

		}else{
			var start = new Date().getTime();
			csvContent += $.map(cols, function(col){
				return '"' + col.name.replace(/"/g, '\\\"') + '"';
			}).join(",");

			for (var i = 0; i < gridData.getLength(); ++i) {
				var row = gridData.getItem(i);
				var rowContent = $.map(cols, function(col, j){
					var fieldContent = row[col.field];
					var formatter = col.formatter;
					if (formatter) {
						fieldContent = formatter(i, j, fieldContent, col, row);
					}
					if (fieldContent !== null){
						if (typeof fieldContent == 'string'){
							fieldContent = fieldContent.replace(/"/g, '\"\"');
							return '"' + fieldContent + '"';
						}else{
							return fieldContent;
						}
					}else{
						return "";
					}
				}).join(",");
				csvContent += "\n" + rowContent;
			}
			temui.saveToFile(csvContent, defaultFilename);
		}
		temui.hidePageLoading();
	}

	temui.grid.HTMLFormatter = function(row, cell, value, columnDef, dataContext) {
		return value;
	}


	if($ && $.jqplot && $.jqplot.config){
		$.jqplot.config.defaultColors= ["#E47801", "#A5BC4E", "#c5b47f", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", 
			"#d8b83f", "#ff5800", "#0085cc", "#c747a3", "#cddf54", "#FBD178", "#26B4E3", "#bd70c7"];	
	}
		
	/**
	 * @function
	 * @description Function used to create a horizontal bar chart. The ADF uses the 
	 * <a href="http://www.jqplot.com/">jgplot</a> jQuery library to generate its chart 
	 * components.  This function is a wrapper of the $.jqplot function. Included with the 
	 * ADF under libs is the version of the jqPlot library used by the ADF along with its 
	 * sample code. Please refer to its online/included documentation for details about the 
	 * $.jqplot function on which barChart() is based. 
	 * 
	 * @param {String} target Id of target element to render plot into
	 * @param {Array} Array of data series, the structure of these series depends on the type of plot
	 * @param {Object} options User defined options object. (refer to jqPlot documentation for more details)
	 * @returns {jqPlot}
	 * 
	 * @memberOf temui
	 * @name barChart
	 * 
	 * @example
	 * var chartSeries1 = [[27,1],[24,2],[20,3],[3,4],[28,5],[48,6],[11,7],[61,8]];
	 * var chartSeries2 = [[969,1],[964,2],[959,3],[955,4],[953,5],[952,6],[950,7],[939,8]];
	 * 
	 * barPlot = temui.chart.barChart('barChart', 
	 * 	[chartSeries2, chartSeries1],
	 * 	{	
	 * 		highlighter: {
	 * 			show: true,
	 * 			showTooltip: true,
	 * 			tooltipAxes: 'x',
	 * 			formatString:'&lt;table class="jqplot-highlighter"&gt;&lt;tr&gt;&lt;td&gt;&lt;?jxlat Endpoints:?&gt;&lt;/td&gt;&lt;td&gt;%s&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;'
	 * 		},
	 * 		series: [{label:"&lt;?jxlat Unpatched?&gt;", color:"#cd1717"}, {label:"&lt;?jxlat Patched?&gt;", color:"#A5BC4E"}],				
	 * 			axes: {
	 * 				yaxis: {
	 * 					ticks: ticks
	 * 				},
	 * 				xaxis: {
	 * 					label:'&lt;?jxlat # of Patched/Unpatched Endpoints?&gt;'
	 * 				}
	 * 			},
	 * 			stackSeries: true,
	 * 			legend: {
	 * 				show: true,
	 * 				placement:"outside",
	 * 				location:"sw"
	 * 			}
	 * 		}
	 * 	);
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="barChart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * 
	 */
	temui.chart.barChart = function(target, data, options) {
		$("#" + target).empty();
	
		var mergedOptions = {};
		$.extend(true, mergedOptions, getBarChartDefaults(), options);
		var plot = $.jqplot(target, data, mergedOptions);
	
		return plot;
	}


	/**
	 * @function
	 * @description Function used to create a column chart. The ADF uses the 
	 * <a href="http://www.jqplot.com/">jgplot</a> jQuery library to generate its chart 
	 * components.  This function is a wrapper of the $.jqplot function. Included with the 
	 * ADF under libs is the version of the jqPlot library used by the ADF along with its 
	 * sample code. Please refer to its online/included documentation for details about the 
	 * $.jqplot function on which columnChart() is based. 
	 * 
	 * @param {String} target Id of target element to render plot into
	 * @param {Array} Array of data series, the structure of these series depends on the type of plot
	 * @param {Object} options User defined options object. (refer to jqPlot documentation for more details)
	 * @returns {jqPlot}
	 * 
	 * 
	 * @example
	 * var chartSeries1 = [[1,189029],[2,360279],[3,303117],[4,64213],[5,15229]];
	 * var chartSeries2 = [[1,183840],[2,380156],[3,301518],[4,62200],[5,17151]];
	 * 
	 * var ticks = ["Other","Important","Critical","Moderate","Low"];
	 * 
	 * colPlot1 = temui.chart.columnChart('columnChart', 
	 * 	[chartSeries1, chartSeries2], 
	 * 	{
	 * 		series: [{label:"<?jxlat Patched?>", color:"#A5BC4E"},{label:"<?jxlat Unpatched?>", color:"#cd1717"}],
	 * 		seriesDefaults: {
	 * 			rendererOptions: {highlightMouseOver: false}
	 * 		},
	 * 		axes:{
	 * 			xaxis: {
	 *				ticks: ticks,
	 *				renderer: $.jqplot.CategoryAxisRenderer
	 *			},
	 *			yaxis: {
	 *				label:'# of Patched/Unpatched Endpoints',
	 *				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
	 *			}
	 *		},
	 *		legend: {
	 *			show: true,
	 *			placement:"outsideGrid",
	 *			location:"s"
	 *		}
	 * });
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="columnChart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * 
	 * @memberOf temui 
	 * @name columnChart
	 */
	temui.chart.columnChart = function(target, data, options) {
		$("#" + target).empty();
		var mergedOptions = {};
		$.extend(true, mergedOptions, getColumnChartDefaults(), options);
		var plot = $.jqplot(target, data, mergedOptions);
	
		return plot;
	}
	
	
	/**
	 * @function
	 * @description Function used to create a pie chart. The ADF uses the 
	 * <a href="http://www.jqplot.com/">jgplot</a> jQuery library to generate its chart 
	 * components.  This function is a wrapper of the $.jqplot function. Included with the 
	 * ADF under libs is the version of the jqPlot library used by the ADF along with its 
	 * sample code. Please refer to its online/included documentation for details about the 
	 * $.jqplot function on which pieChart() is based. 
	 * 
	 * @param {String} target Id of target element to render plot into
	 * @param {Array} Array of data series, the structure of these series depends on the type of plot
	 * @param {Object} options User defined options object. (refer to jqPlot documentation for more details)
	 * @returns {jqPlot}
	 * 
	 * 
	 * @example
	 * var patchedComputers = 966909;
	 * var unpatchedComputers = 925551;
	 * var totalCriticalPatches = 1193;
	 * var totalPatches = 3717;
	 * 
	 * var data = [ ['Patched', patchedComputers],['Unpatched', unpatchedComputers] ];
	 * var labels = ['<?jxlat Patched:?> ' + patchedComputers, '<?jxlat Unpatched:?> ' + unpatchedComputers]
	 * 
	 * var options = {
	 * 	seriesColors: ["#A5BC4E", "#cd1717"],
	 * 	legend: {
	 * 		labels:labels,
	 * 		show:true
	 * 	}
	 * }
	 * piePlot = temui.chart.pieChart('pieChart', [data],options);
	 * 
	 * @example
	 * <b>(HTML Markup)</b>
	 * &lt;div id="pieChart" style="height:350px; width:100%;"&gt;&lt;/div&gt;
	 * 
	 * @function
	 * @memberOf temui 
	 * @name pieChart
	 */
	temui.chart.pieChart = function(target, data, options) {
		$("#" + target).empty();
		var mergedOptions = {};
		$.extend(true, mergedOptions, getPieChartDefaults(), options);
		
		var plot = $.jqplot(target, data, mergedOptions);
	
		return plot;
	}

	function getPieChartDefaults(){
		var pieChartOptions = {
			grid: {
				drawGridLines: false, 
				borderWidth: 0,
				shadow: false
			},
			legend: {
				placement: 'insideGrid',
				location: 's',
				show: true
			},
			seriesDefaults: {
				renderer: $.jqplot.PieRenderer
			}
		};
		
		return $.extend(true, getChartDefaults(), pieChartOptions);
	}


	function getChartDefaults() {
		return {
			grid: {
				drawGridLines: true, 
				gridLineColor: '#eeeeee', 
				background: '#ffffff', 
				borderColor: '#CCCCCC',
				borderWidth: 0.5, 
				shadow: true, 
				shadowAngle: 45, //Clockwise from x axis.
				shadowOffset: 1.5,
				shadowWidth: 3, 
				shadowDepth: 3, 
				shadowAlpha: 0.03 
			},
			
			noDataIndicator: {
				show: true,
				indicator: "",
				
				axes: {
					xaxis: {
						min: 0,
						max: 5,
						tickInterval: 1,
						showTicks: false
					},
					yaxis: {
						min: 0,
						max: 8,
						tickInterval: 2,
						showTicks: false
					}
				}
			},
			legend: {
				show: true,
				placement:"outsideGrid",
				location:"ne"
			}
		}	
	}

	
	function getBarChartDefaults() {
		var barChartOptions = {
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer,
				rendererOptions: {
					barDirection: 'horizontal'
				}
			},
			axes: {
				yaxis: {
					renderer: $.jqplot.CategoryAxisRenderer
				}
			}
		};
		
		return $.extend(true, getChartDefaults(), barChartOptions);
	}


	function getColumnChartDefaults(options) {
		var columnChartOptions = {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer
			},
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer
			}
		};
		
		return $.extend(true, getChartDefaults(), columnChartOptions);
	}


	/**
	 * Custom events for printing
	 */
	var triggerBeforePrint = function(){
		$(window).trigger('beforeprint.temui');
	}

	var triggerAfterPrint = function(){
		$(window).trigger('afterprint.temui');
	}

	temui.print = function() {
		window.print();
	};

	if (window.matchMedia) {
		// IE 10
		var mediaQueryList = window.matchMedia('print');
		mediaQueryList.addListener(function(mql) {
			if (mql.matches) {
				triggerBeforePrint();
			} else {
				triggerAfterPrint();
			}
		});
	}else{
		// IE 6-9
		if (window.addEventListener) {
			window.addEventListener("beforeprint", triggerBeforePrint, false);
			window.addEventListener("afterprint", triggerAfterPrint, false);
		}else if (window.attachEvent){
			attachEvent("onbeforeprint", triggerBeforePrint);
			attachEvent("onafterprint", triggerAfterPrint);
		}else{
			window.onbeforeprint = triggerBeforePrint;
			window.onafterprint = triggerAfterPrint;
		}
	}
	
	$(window).on('beforeprint.temui', function(e) {
		$('body').addClass('temui-print-media');
		$('*[data-tem-printable-class]').each(function(){
			if ($(this).attr('data-tem-nonprintable-class') == null) {
				$(this).attr('data-tem-nonprintable-class', $(this).attr('class')?$(this).attr('class'):"");
				$(this).removeClass();
				$(this).addClass($(this).attr('data-tem-printable-class'));
			}
		});
		$(window).resize();
	});
	
	$(window).on('afterprint.temui', function(e) {
		$('body').removeClass('temui-print-media');
		$('*[data-tem-printable-class]').each(function(){
			if ($(this).attr('data-tem-nonprintable-class') != null) {
				$(this).removeClass();
				$(this).addClass($(this).attr('data-tem-nonprintable-class'));
				$(this).removeAttr('data-tem-nonprintable-class');
			}
		});
		$(window).resize();
	});


	/*********************************************
	 * Custom logging functions.
	 * 
	 */
	var GLOBAL_LOG = [];

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
		if(logLevel < tem.config.logLevel) {
			return;
		}	
	
		try {
			if(GLOBAL_LOG.length > 1500) {
				GLOBAL_LOG = GLOBAL_LOG.slice(-1000);
			}
		
			var levelDisplayName;		
			switch(logLevel) {
				case tem.config.DEBUG:
					levelDisplayName = "DEBUG";
				break;
				default:
					levelDisplayName = "ERROR";
			}
		
			GLOBAL_LOG.push([new Date().getTime(), message, levelDisplayName]);
		} catch(e) {
			// TODO: what should be the fallback here?
			// fail silently...
		}
	}

	var $dialog;
	var $logText;

	function onLogSettingsChange(event) {
		var id = $dialog.find("input[@name=logLevel]:checked").attr('id');
		if(id=="debugLevel") {
			tem.config.logLevel = tem.config.DEBUG;
		} else {
			tem.config.logLevel = tem.config.ERROR;
		}
		
		if (tem.context.isInConsole()) {
			tem.dataStore.storeVariable(tem.config.loggingLevelPreference, tem.config.logLevel, true);
		}
	}

	temui.$loadingDialog = null;

	/**
	 * @function
	 * @memberOf temui
	 * @name showPageLoading 
	 * 
	 * @description Displays a page loading message
	 * 
	 * <pre>
	 * temui.showPageLoading();
	 * </pre>
	 *
	 * @param {String} message custom loading message (optional)
	 */
	temui.showPageLoading = function(message) {
		if (!temui.$loadingDialog) {
			if (message == null) {
				message = temui.l10n.loading;
			}
			var loadingIcon = $('<div class="temui-pageloading-icon"/>');
			var loadingText = $('<div class="temui-pageloading-text" data-role="temui-loading-text"/>').text(message);
			var contentDiv = $('<div class="temui-pageloading"/>').append(loadingIcon).append(loadingText);
			temui.$loadingDialog = $('<div/>').append(contentDiv);
			temui.$loadingDialog.dialog({
				width: 180,
				height: 80,
				modal: true,
				position: "center",
				closeOnEscape: false,
				open: function(event, ui) { $(".ui-dialog-titlebar", $(this).parent()).hide() },
				dialogClass: 'alert',
				resizable:false
			});
		}
		temui.$loadingDialog.dialog('open');
		$('body').css('cursor', 'wait');
	}

	/**
	 * @function
	 * @memberOf temui
	 * @name hidePageLoading 
	 * 
	 * @description Removes the page loading message
	 * 
	 * <pre>
	 * temui.hidePageLoading();
	 * </pre>
	 *
	 */
	temui.hidePageLoading = function() {
		if (temui.$loadingDialog) {
			temui.$loadingDialog.dialog('close');
			$('body').css('cursor', 'auto');
		}
	};


	/**
	 * <p>Save content to a file.</p>
	 * <p>In HTML5 supported browsers, it works the same way as clicking on a download link. 
	 * In other browsers, the exported content is displayed in a popup textarea. 
	 * In Console, it displays a "Save File As" dialog to let user select download folder and type in filename.</p>
	 * 
	 * @memberOf temui
	 *
	 * @function
	 * @param {String} fileContent File Content
	 * @param {String} defaultFilename Default filename
	 * @param {String} defaultFolder Default folder. If not provided, MyDocuments folder is used. (optional)
	 */
	temui.saveToFile = function(fileContent, defaultFilename, defaultFolder) {

		// Using HTML5 local file download if possible
		if ((typeof Blob == "function") && (window.URL && (typeof window.URL.createObjectURL == "function"))) 
		{
			var fileParts = [fileContent];
			var fileBlob = new Blob(fileParts, { "type" : "text\/csv" });
			if (window.navigator.msSaveOrOpenBlob) {
				// IE10
				window.navigator.msSaveOrOpenBlob(fileBlob, defaultFilename);
			}else{
				// Chrome and Firefox
				var url = window.URL.createObjectURL(fileBlob);
				var $link = $('<a href="'+url+'" />').appendTo($('body')).hide();
				$link.attr('download', defaultFilename);
				var clickEvent = document.createEvent("MouseEvents");
				clickEvent.initEvent("click", true, false);
				$link.get(0).dispatchEvent(clickEvent);
				$link.remove();	
			}
			return;
		}

		if (tem.context.isInConsole()) {
			var shell = new tem.shell.ShellWrapper();
			if (!defaultFolder) {
				defaultFolder = shell.SpecialFolders('MyDocuments');
			}
			var $exportFilenameInput = $('<input temui-data-role="exportFilenameInput"/>').val(defaultFilename);
			var $exportFolderInput = $('<input temui-data-role="exportFolderInput"/>').val(defaultFolder);
			var $folderBrowseButton = $('<button/>').text("Browse");
			var $exportDialog = $('<div/>').append($('<div class="temui-export-dialog" />')
								.append($('<div class="temui-form-item"/>')
									.append($('<div class="temui-form-item-name"/>').text(temui.l10n.saveDialog.filename))
									.append($('<div class="temui-form-item-value"/>').append($exportFilenameInput))
								)
								.append($('<div class="temui-form-item"/>')
									.append($('<div class="temui-form-item-name"/>').text(temui.l10n.saveDialog.folder))
									.append($('<div class="temui-form-item-value temui-toolbar-button"/>').append($exportFolderInput).append($folderBrowseButton))
								));

			var dialogButtons = {};

			dialogButtons[temui.l10n.save] = function () {
				var filename = $exportFilenameInput.val();
				var folderpath = $exportFolderInput.val();
				var filepath = folderpath + '\\' + filename;

				if (tem.file.FileSystem.verifyFileExists(filepath)) {
					if (!confirm(temui.l10n.saveDialog.replaceConfirm)){
						return;
					}
				}
				$exportDialog.dialog('close');
				try{
					var fso = new ActiveXObject("Scripting.FileSystemObject");
					var fos = fso.OpenTextFile(filepath, 2, true);
					fos.Write(fileContent);
					fos.Close();

					var buttons = {};
					buttons[temui.l10n.saveDialog.openFile] = function(){
						shell.Run("explorer.exe /e," + filepath);
						this.popupMessage('close');
					};
					buttons[temui.l10n.saveDialog.openFolder] = function(){
						shell.Run("explorer.exe /e," + folderpath);
						this.popupMessage('close');
					};
					buttons[temui.l10n.dialogClose] = function(){
						this.popupMessage('close');
					};
					$.temui.popupMessage.createPopup(temui.l10n.saveDialog.fileSaved, 'information', temui.l10n.saveDialog.fileSavedAs + filepath, null, buttons);
				}catch(e){
					$.temui.popupMessage.createPopup(temui.l10n.saveError, 'error', temui.l10n.error + e.message + "<br/>" + temui.l10n.saveDialog.fileLocation + filepath);
					tem.logging.error("Can not export content to file " + filepath);
					tem.logging.error(e.message);
				}
			};

			dialogButtons[temui.l10n.cancel] = function () {
				$exportDialog.dialog('close');
			};

			$exportDialog.dialog({
				title: temui.l10n.saveDialog.saveFileDialogTitle,
				width: '420px',
				modal: true,
				buttons: dialogButtons
			});

			$folderBrowseButton.button().click(function(){
				var path = tem.file.browseForFolder();
				if (path) {
					$exportFolderInput.val(path);	
				}
			});

		}else{
			var writeToTextarea = function() {
				var $contentDialog = $('<div><textarea/></div>').addClass('temui-cvs-content');
				var contentTextarea = $contentDialog.find('textarea').get(0);
				var htmlContent = fileContent.replace(/</g, "&lt;");
				contentTextarea.innerHTML = htmlContent;
				$contentDialog.dialog({
					title: temui.l10n.csvExportDialogTitle,
					width:'auto',
					resizable:false,
					close: function(event, ui) {
						$(this).remove();
					}
				});
				contentTextarea.focus();
				contentTextarea.select();
			}

			if (fileContent.length > 3000000) {
				var buttons = {};
				buttons[temui.l10n.saveDialog.continueSaving] = function(){
					this.popupMessage('close');
					writeToTextarea();
				};
				buttons[temui.l10n.cancel] = function(){
					this.popupMessage('close');
				};
				$.temui.popupMessage.createPopup(temui.l10n.saveDialog.largeSizeWarningTitle, 'warning', temui.l10n.saveDialog.largeSizeWarning, null, buttons);
			}else{
				writeToTextarea();
			}
		}
	};
	
	
	/**
	 * Utility function to trigger log popup dialog.
	 */
	temui.showLogDialog = function() {
		if($dialog == null) {
			$logText = $('<textarea></textarea>');
			
			var $refreshButton = $("<button>" + temui.l10n.refresh + "</button>")
				.click(function(){
					$logText.text(getLogContents());	
				});

			$dialog = $('<div></div>')
				.append('<div><span>' + temui.l10n.logLevel + '</span>'
					+ '<input id="debugLevel" type="radio" name="logLevel"></input><label for="debugLevel">Debug</label>' 
					+ '<input id="errorLevel" type="radio" name="logLevel"></input><label for="errorLevel">Error</label></div>')
				.append($logText)
				.append($refreshButton);
			$dialog.dialog({
				title: temui.l10n.logTitle, 
				height: 400,
				width: 500
			});	

			// TODO: calculate these based on padding, margins rather than hard coded
			$logText.height($dialog.height() - 50);
			$logText.width($dialog.width() - 20);	

			// TODO: debounce this
			$dialog.bind("dialogresize", function(event, ui) {
				$logText.height($dialog.height() - 50);
				$logText.width($dialog.width() - 20);
			});
			$dialog.find('input[name=logLevel]')
				.change(onLogSettingsChange)
				.attr("checked", function(i,val) {
					if(this.id == "debugLevel" && tem.config.logLevel == tem.config.DEBUG){
						return "checked"
					}
					if(this.id == "errorLevel" && tem.config.logLevel == tem.config.ERROR){
						return "checked"
					}
				
					return;
				});
		} else {
			$dialog.dialog("open")
		}	
		
		$logText.text(getLogContents());	
	}	

	// add ctrl-shft-d listener
	$(document).keyup(function(e) {
		if (e.keyCode == 68 && e.ctrlKey && e.shiftKey) {
			temui.showLogDialog();
		}
	});
		
	var $errorLog;
	/**
	 * Utility function to trigger error dialog. This is the default error handler, set up automatically
	 * as window.onerror handler on application startup.
	 * 
	 * @param {String} message
	 * @param {String} uri
	 * @param {String} line
	 * 
	 */	
	temui.showErrorDialog = function(message, uri, line) {
		$errorLog = $('<textarea style="height:150px;">' + getLogContents() + '</textarea>');

		var $errorLink = $('<a href="">'+ temui.l10n.showLogContents + '</a>')
			.click(function(){
				$errorLink.hide();
				$errorHideLink.show();
				$errorPopUp.append($errorLog);
				return false;
			});
			
		var $errorHideLink = $('<a style="display:none;" href="">'+ temui.l10n.hideLogContents + '</a>')
			.click(function(){
				$errorLink.show();
				$errorHideLink.hide();
				$errorLog.remove();
				return false;
			});				
			
		var $errorDiv = $('<div></div>');
		
		var $errorMessage = $("<p></p>")
			.css("word-wrap", "break-word")
			.html(tem.l10n.format(temui.l10n.errorMessage, 
				'"' + message.replace(/"/gi, '%22').replace("<", "&lt;").replace(">", "&gt;") + '<br/><br/>"', 
				'"' + uri + '<br/>"', 
				'"' + line + '"'));
		
		$errorDiv.append('<div class="temui-error-dialog-icon"/>')
			.append($errorMessage)
			.append($errorLink)
			.append($errorHideLink)

		var $errorPopUp = $errorDiv.dialog({
			title:temui.l10n.errorTitle,
			width:400
			});	
			
		//$errorLog.height($errorPopUp.height() - ($errorMessage.height() + 40));
		$errorLog.width($errorDiv.width() - 10);	

		// TODO: debounce this
		$errorPopUp.bind("dialogresize", function(event, ui) {
			$errorLog.height($errorDiv.height() - ($errorMessage.height()+ 40));
			$errorLog.width($errorDiv.width() - 10);
		});
	}

   $(function() {
		tem.logging.debug = function(message) {
			logJSTarget(message, tem.config.DEBUG);
			if (typeof console !== "undefined" && console.debug) {
				console.debug(message);
			}
		};
		tem.logging.error = function(message) {
			logJSTarget(message, tem.config.ERROR); 
			if (typeof console !== "undefined" && console.error) {
				console.error(message);
			}
		};

		var oldOnError = window.onerror;

		window.onerror = function(message, uri, line) {
			if(oldOnError) {
				oldOnError(message, uri, line);
			}
			temui.showErrorDialog(message, uri, line);			
		}

	});	

	$(function(){
		var $topNav = $("*[data-tem-role='topNav']").first().temTopNav();
		
		if($topNav.length == 0) {
			$("body").addClass("temui-body-no-header");
		}
		
		$("*[data-tem-role='header']").first().temHeader();
	});

}(jQuery));

