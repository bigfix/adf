/**
 * (C) Copyright IBM Corp. 2011-2013.  All Rights Reserved.
 * 
 * To be used in docs.ojo after compilation.
 * 
 */
adf = {};

adf.$BrowserProvider = function() {
  this.$get = function() {
    return new adf.$Browser();
  };
};

var
    slice             = [].slice,
    push              = [].push,
    toString          = Object.prototype.toString;

function concat(array1, array2, index) {
  return array1.concat(slice.call(array2, index));
}

function sliceArgs(args, startIndex) {
  return slice.call(args, startIndex || 0);
}

adf.$Browser = function() {
  var self = this;
  self.$$rootUrl = "http://server/";
  self.$$url = self.$$rootUrl;
  self.$$lastUrl = self.$$url;
  self.pollFns = [],

	setTimeout = window.setTimeout,
	clearTimeout = window.clearTimeout,
	pendingDeferIds = {};

  var outstandingRequestCount = 0;
  var outstandingRequestCallbacks = [];

  self.$$completeOutstandingRequest = completeOutstandingRequest;
  self.$$incOutstandingRequestCount = function() { outstandingRequestCount++; };

  /**
   * Executes the `fn` function(supports currying) and decrements the `outstandingRequestCallbacks`
   * counter. If the counter reaches 0, all the `outstandingRequestCallbacks` are executed.
   */
  function completeOutstandingRequest(fn) {
    try {
      fn.apply(null, sliceArgs(arguments, 1));
    } finally {
      outstandingRequestCount--;
      if (outstandingRequestCount === 0) {
        while(outstandingRequestCallbacks.length) {
          try {
            outstandingRequestCallbacks.pop()();
          } catch (e) {
            $log.error(e);
          }
        }
      }
    }
  }

  var urlChangeListeners = [],
      urlChangeInit = false;

  function fireUrlChange() {
    if (self.$$lastUrl == self.url()) return;
    self.$$lastUrl = self.url();
    for (var i=0; i<urlChangeListeners.length; i++){
		var listener = urlChangeListeners[i];
		listener(self.url());
    }
  }


  // register url polling fn

  self.onUrlChange = function(callback) {
    if (!urlChangeInit) {
      self.addPollFn(fireUrlChange);
      urlChangeInit = true;
    }

    urlChangeListeners.push(callback);
    return callback;
  };

  self.cookieHash = {};
  self.lastCookieHash = {};

  self.defer = function(fn, delay) {
    var timeoutId;
    outstandingRequestCount++;
    timeoutId = setTimeout(function() {
      delete pendingDeferIds[timeoutId];
      completeOutstandingRequest(fn);
    }, delay || 0);
    pendingDeferIds[timeoutId] = true;
    return timeoutId;
  };

  self.defer.cancel = function(deferId) {
    if (pendingDeferIds[deferId]) {
      delete pendingDeferIds[deferId];
      clearTimeout(deferId);
      completeOutstandingRequest(noop);
      return true;
    }
    return false;
  };

  self.$$baseHref = '';
  self.baseHref = function() {
    return this.$$baseHref;
  };
};

adf.$Browser.prototype = {

  poll: function poll() {
    angular.forEach(this.pollFns, function(pollFn){
      pollFn();
    });
  },

  addPollFn: function(pollFn) {
    this.pollFns.push(pollFn);
    return pollFn;
  },

  url: function(url, replace) {
    if (url) {
      this.$$url = url;
      this.poll();
      return this;
    }
    return this.$$url;
  },

  cookies:  function(name, value) {
    if (name) {
      if (angular.isUndefined(value)) {
        delete this.cookieHash[name];
      } else {
        if (angular.isString(value) &&       //strings only
            value.length <= 4096) {          //strict cookie storage limits
          this.cookieHash[name] = value;
        }
      }
    } else {
      if (!angular.equals(this.cookieHash, this.lastCookieHash)) {
        this.lastCookieHash = angular.copy(this.cookieHash);
        this.cookieHash = angular.copy(this.cookieHash);
      }
      return this.cookieHash;
    }
  },

  notifyWhenNoOutstandingRequests: function(fn) {
    fn();
  }
};

angular.module('docsApp').provider({
	$browser: adf.$BrowserProvider
}).directive('mockLink', ['$browser', function($browser){
    return {
        link: function ($scope, element, attr) {
        	$(element).click(function(){
        		$browser.url($browser.$$rootUrl + element.attr('href'));
        	});
        }
    };
}]);