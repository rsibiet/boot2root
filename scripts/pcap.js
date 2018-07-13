const fs = require('fs');
var sys = require('util')
var exec = require('child_process').exec;

var array = [];

if (process.argv.length > 2)
	path = process.argv[2];
else
	path = "./";

fs.readdir(path, (err, files) => {
	files.forEach(file => {
		if (file.indexOf(".pcap") > -1)
		{
			number = fs.readFileSync(file,'utf8').split("//file")[1];
			array.push({key:parseInt(number),name:file});
		}
	});
	arr = array.sort(function(a, b){
		return a.key - b.key;
	});
	var str = "";
	array.forEach(t => {
		data = fs.readFileSync(t.name,'utf8').split("//file");
		str = str.concat(data[0],"//", t.name, "\n");
	});
	fs.writeFile("./main.c", str , function(err) {
		console.log("./main.c file was saved!");
		console.log("Exec : gcc main.c && ./a.out");
		function puts(error, stdout, stderr) { console.log(stdout) }
		console.log("Launch");
		exec("gcc main.c && ./a.out", puts);
	});
});
