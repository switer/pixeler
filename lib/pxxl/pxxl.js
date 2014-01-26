var parse = require("./pxxl.bdf-parser.js"),
    fs = require("fs");

function pxxl(text, draw) {
	fs.readFile('./fonts/c64.bdf', { encoding: 'ascii'}, function (err, data) {
	  if (err) throw err;

	  var font = parse(data);  

	  var pixels = font.getPixels(text);

	  draw(text, pixels, font);
	});
}

module.exports = pxxl;