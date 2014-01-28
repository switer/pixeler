var parse = require("./pxxl.bdf-parser.js"),
    fs = require("fs"),
    path = require('path'),
    fontFile = __dirname + '/fonts/c64.bdf';


/**
 *  call pxxl for creating text pixel data
 **/

function pxxl(text, callback) {

    fs.readFile(fontFile, {
        encoding: 'ascii'
    }, function(err, data) {
        if (err) throw err;

        var font = parse(data),
            pixels = font.getPixels(text);

        callback(text, pixels, font);
    });
}
/**
 *  call pxxl for creating text pixel data in sync.
 **/

function pxxlSync(text) {
    var fontText = fs.readFileSync(fontFile, 'ascii'),
        font = parse(fontText),
        pixels = font.getPixels(text);

    return {
        text: text,
        pixels: pixels,
        font: font
    };
}

module.exports = {
    parse: pxxl,
    parseSync: pxxlSync
};
