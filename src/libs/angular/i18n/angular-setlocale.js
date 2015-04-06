/**
 * Combining all locales in a single function to set locale
 */
define([], function(){

	return function(locale){
		switch(locale){
			case "en-us":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["January","February","March","April","May","June","July","August","September","October","November","December"],"SHORTMONTH":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"DAY":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"SHORTDAY":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"AMPMS":["AM","PM"],"medium":"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a","fullDate":"EEEE, MMMM d, y","longDate":"MMMM d, y","mediumDate":"MMM d, y","shortDate":"M/d/yy","mediumTime":"h:mm:ss a","shortTime":"h:mm a"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"(\u00A4","negSuf":")","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"$"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"en-us"});
					}]);
				})();
				break;
			case "zh-cn":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"SHORTMONTH":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"DAY":["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],"SHORTDAY":["周日","周一","周二","周三","周四","周五","周六"],"AMPMS":["上午","下午"],"medium":"yyyy-M-d ah:mm:ss","short":"yy-M-d ah:mm","fullDate":"y年M月d日EEEE","longDate":"y年M月d日","mediumDate":"yyyy-M-d","shortDate":"yy-M-d","mediumTime":"ah:mm:ss","shortTime":"ah:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"\u00A4-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"¥"},"pluralCat":function (n) {  return PLURAL_CATEGORY.OTHER;},"id":"zh-cn"});
					}]);
				})();
				break;
			case "ja":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"SHORTMONTH":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"DAY":["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],"SHORTDAY":["日","月","火","水","木","金","土"],"AMPMS":["午前","午後"],"medium":"yyyy/MM/dd H:mm:ss","short":"yy/MM/dd H:mm","fullDate":"y年M月d日EEEE","longDate":"y年M月d日","mediumDate":"yyyy/MM/dd","shortDate":"yy/MM/dd","mediumTime":"H:mm:ss","shortTime":"H:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"\u00A4-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"¥"},"pluralCat":function (n) {  return PLURAL_CATEGORY.OTHER;},"id":"ja"});
					}]);
				})();
				break;
			case "es":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],"SHORTMONTH":["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],"DAY":["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],"SHORTDAY":["dom","lun","mar","mié","jue","vie","sáb"],"AMPMS":["a.m.","p.m."],"medium":"dd/MM/yyyy HH:mm:ss","short":"dd/MM/yy HH:mm","fullDate":"EEEE d 'de' MMMM 'de' y","longDate":"d 'de' MMMM 'de' y","mediumDate":"dd/MM/yyyy","shortDate":"dd/MM/yy","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":".","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4 ","posSuf":"","negPre":"\u00A4 -","negSuf":"","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"€"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"es"});
					}]);
				})();
				break;
			case "it":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],"SHORTMONTH":["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],"DAY":["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],"SHORTDAY":["dom","lun","mar","mer","gio","ven","sab"],"AMPMS":["m.","p."],"medium":"dd/MMM/y HH:mm:ss","short":"dd/MM/yy HH:mm","fullDate":"EEEE d MMMM y","longDate":"dd MMMM y","mediumDate":"dd/MMM/y","shortDate":"dd/MM/yy","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":".","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4 ","posSuf":"","negPre":"\u00A4 -","negSuf":"","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"€"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"it"});
					}]);
				})();
				break;
			case "fr":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],"SHORTMONTH":["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],"DAY":["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],"SHORTDAY":["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],"AMPMS":["AM","PM"],"medium":"d MMM y HH:mm:ss","short":"dd/MM/yy HH:mm","fullDate":"EEEE d MMMM y","longDate":"d MMMM y","mediumDate":"d MMM y","shortDate":"dd/MM/yy","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":" ","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"","posSuf":" \u00A4","negPre":"-","negSuf":" \u00A4","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"€"},"pluralCat":function (n) {  if (n >= 0 && n < 2) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"fr"});
					}]);
				})();
				break;
			case "de":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],"SHORTMONTH":["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],"DAY":["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],"SHORTDAY":["So.","Mo.","Di.","Mi.","Do.","Fr.","Sa."],"AMPMS":["vorm.","nachm."],"medium":"dd.MM.yyyy HH:mm:ss","short":"dd.MM.yy HH:mm","fullDate":"EEEE, d. MMMM y","longDate":"d. MMMM y","mediumDate":"dd.MM.yyyy","shortDate":"dd.MM.yy","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":".","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"","posSuf":" \u00A4","negPre":"-","negSuf":" \u00A4","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"€"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"de"});
					}]);
				})();
				break;
			case "zh-tw":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"SHORTMONTH":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"DAY":["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],"SHORTDAY":["週日","週一","週二","週三","週四","週五","週六"],"AMPMS":["上午","下午"],"medium":"yyyy/M/d ah:mm:ss","short":"yy/M/d ah:mm","fullDate":"y年M月d日EEEE","longDate":"y年M月d日","mediumDate":"yyyy/M/d","shortDate":"yy/M/d","mediumTime":"ah:mm:ss","shortTime":"ah:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"\u00A4-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"NT$"},"pluralCat":function (n) {  return PLURAL_CATEGORY.OTHER;},"id":"zh-tw"});
					}]);
				})();
				break;
			case "ko":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],"SHORTMONTH":["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],"DAY":["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],"SHORTDAY":["일","월","화","수","목","금","토"],"AMPMS":["오전","오후"],"medium":"yyyy. M. d. a h:mm:ss","short":"yy. M. d. a h:mm","fullDate":"y년 M월 d일 EEEE","longDate":"y년 M월 d일","mediumDate":"yyyy. M. d.","shortDate":"yy. M. d.","mediumTime":"a h:mm:ss","shortTime":"a h:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"\u00A4-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"₩"},"pluralCat":function (n) {  return PLURAL_CATEGORY.OTHER;},"id":"ko"});
					}]);
				})();
				break;
			case "pt-br":
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"SHORTMONTH":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"DAY":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"SHORTDAY":["dom","seg","ter","qua","qui","sex","sáb"],"AMPMS":["AM","PM"],"medium":"dd/MM/yyyy HH:mm:ss","short":"dd/MM/yy HH:mm","fullDate":"EEEE, d 'de' MMMM 'de' y","longDate":"d 'de' MMMM 'de' y","mediumDate":"dd/MM/yyyy","shortDate":"dd/MM/yy","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":".","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"(\u00A4","negSuf":")","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"R$"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"pt-br"});
					}]);
				})();
				break;
			default:
				(function(){
					angular.module("ngLocale", [], ["$provide", function($provide) {
					var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
					$provide.value("$locale", {"DATETIME_FORMATS":{"MONTH":["January","February","March","April","May","June","July","August","September","October","November","December"],"SHORTMONTH":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"DAY":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"SHORTDAY":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"AMPMS":["AM","PM"],"medium":"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a","fullDate":"EEEE, MMMM d, y","longDate":"MMMM d, y","mediumDate":"MMM d, y","shortDate":"M/d/yy","mediumTime":"h:mm:ss a","shortTime":"h:mm a"},"NUMBER_FORMATS":{"DECIMAL_SEP":".","GROUP_SEP":",","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"\u00A4","posSuf":"","negPre":"(\u00A4","negSuf":")","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"$"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"id":"en-us"});
					}]);
				})();

		}
	}
	
});