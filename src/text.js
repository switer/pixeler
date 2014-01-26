var pxxl = require("../lib/pxxl/pxxl"),
    imgdata = require('../tools/imgdata');


function draw(img) {
    var str = '';
    for (var i =0 ; i < img.length; i ++) {

        for (var j =0 ; j < img[i].length; j ++) {
            str += img[i][j];
        }
        str += '\n';
    }

    console.log(str);
}

function max (pixels) {
    var maxHeight = 0,
        maxWidth = 0;
    for (var i =0 ; i < pixels.length; i ++) {
        
        var pix = pixels[i];
        if (pix.x > maxWidth) maxHeight = pix.x;
        if (pix.y > maxHeight) maxWidth = pix.y;
    }

    return {
        height: maxWidth + 1,
        width: maxHeight + 1
    }
}
pxxl('hello', function(text, pixels, font) {
    var maxSize = max(pixels);
    var img = imgdata.pixelsto2d(maxSize.width, maxSize.height, pixels);
    draw(img);
});
