define(['require', 'module'], function(require, module) {

  var nodeRequire = requirejsVars.nodeRequire;
  var fs = nodeRequire('fs');

  var slashes = /([^:])\/+/g
  var removeDoubleSlashes = function(uri) {
    return uri.replace(slashes, '$1/');
  }

  if (!global.cssImgCache)
    global.cssImgCache = {};
  
  /**
   * Copy images discovered in the css file to new image directory and correct the css.
   * Assuming all image base directory is requirejs baseUrl
   */
  var flattenImgs = function(source, imgBase, newImgDir, imagePrefix) {

    if(!imagePrefix)
      imagePrefix = "";

    imgBase = removeDoubleSlashes(imgBase);
    newImgDir = removeDoubleSlashes(newImgDir);

    var urlRegEx = /@import\s*("([^"]*)"|'([^']*)')|url\s*\(\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/ig;
    var result, url, source;

    while (result = urlRegEx.exec(source)) {
        url = result[3] || result[2] || result[5] || result[6] || result[4];
        if (url.substr(0,5) == 'data:')
          continue;
        var imgPath = require.toUrl(url);
        var cache = global.cssImgCache;
        if (!cache[imgPath]) {
            var filename = imagePrefix + imgPath.replace(/^.*[\\\/]/, '');
            var newUrl = removeDoubleSlashes(newImgDir+"/"+filename);
            var newImgPath = require.toUrl(newUrl);
            var i = 1;
            while (fs.existsSync(newImgPath)) {
                var newFileName = filename.replace(/\.[a-zA-Z0-9]+$/, function(extension){
                    return '_' + (++i) + extension;
                });
                newUrl = removeDoubleSlashes(newImgDir+"/"+newFileName);
                newImgPath = require.toUrl(newUrl);
            }
            cache[imgPath] = newUrl;
        }
        var newUrl = cache[imgPath];
        var newImgPath = require.toUrl(newUrl);
        fs.createReadStream(imgPath).pipe(fs.createWriteStream(newImgPath));
        var quoteLen = result[5] || result[6] ? 1 : 0;
        source = source.substr(0, urlRegEx.lastIndex - url.length - quoteLen - 1) + newUrl + source.substr(urlRegEx.lastIndex - quoteLen - 1);
        urlRegEx.lastIndex = urlRegEx.lastIndex + (newUrl.length - url.length);
    }
    
    return source;
  };
  
  return flattenImgs;
});
