var parse = require("./pxxl.bdf-parser.js");
var fs = require("fs");

function pxxl(file, text, draw) {
	console.log("loading", file);
	fs.readFile(file, { encoding: 'ascii'}, function (err, data) {
	  if (err) throw err;

	  var font = parse(data);

	  var pixels = font.getPixels(text);

	  draw(text, pixels, font);
	});
}

module.exports = pxxl;