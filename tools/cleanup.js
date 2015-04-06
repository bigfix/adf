var stdio = require('stdio');
var fs = require('fs');
var path = require('path');

var ops = stdio.getopt({
    'config': {key: 'c', args: 1, description: 'Build config file', mandatory: true}
});

var contents = fs.readFileSync(ops.config, 'utf8');
eval("var config = " + contents);
var dir = config.dir;
if(!dir){
	throw "Build output directory is not defined.";
}
dir = path.resolve(__dirname, dir);

var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

// delete all sub folders in the built content
fs.readdir(dir, function(err, files){
	files.forEach(function(file){
		if(fs.statSync(dir+"/"+file).isDirectory()){
			deleteFolderRecursive(dir+"/"+file);
		}
	});
    console.log("Cleaned up");
});