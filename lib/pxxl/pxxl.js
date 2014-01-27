var parse = require("./pxxl.bdf-parser.js"),
    fs = require("fs"),
    path = require('path');

/**
 *  call pxxl for creating text pixel data
 **/
function pxxl(text, draw) {
	fs.readFile( __dirname + '/fonts/c64.bdf', { encoding: 'ascii'}, function (err, data) {
	  if (err) throw err;

	  var font = parse(data);  

	  var pixels = font.getPixels(text);

	  draw(text, pixels, font);
	});
}

module.exports = pxxl;