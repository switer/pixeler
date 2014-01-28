var pxxl = require("../lib/pxxl/pxxl"),
    imgdata = require('../tools/imgdata'),
    util = require('../tools/util'),
    sutils = require('sutils');

// async
pxxl.parse('hello', function(text, pixels, font) {
    var maxSize = util.bound(pixels);
    var img = imgdata.pixelsto2d(maxSize.width, maxSize.height, pixels);
    util.draw(img);
});


// use in sync
var pxxlObj = pxxl.parseSync('hello');
var maxSize = util.bound(pxxlObj.pixels);
var img = imgdata.pixelsto2d(maxSize.width, maxSize.height, pxxlObj.pixels);
util.draw(img);