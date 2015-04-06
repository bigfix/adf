var connect = require('connect');
connect.createServer(
    connect.static(__dirname + "/../docs")
).listen(8080).on('error', function(err){
	console.error('Error starting http server for docs.\nMake sure the port is not in use.');
	throw err;
})
console.log("Server started at http://localhost:8080");
