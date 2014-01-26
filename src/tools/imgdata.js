'use strict';

module.exports =  {

    /**
     *  create a two-dimensional array
     **/
    create2d: function (row, col, value) {
        var imageData = [],
        rowArray = [];

        for (var i =0 ; i < col; i ++) {
            var rowArray = [];
            for (var j =0 ; j < row; j ++) {
                rowArray.push(value);
            }
            imageData.push(rowArray);
        }
        return imageData;
    },
    /**
     *  convert pixels which from pxxl to image data 2d-array 
     **/
    pixelsto2d: function (width, height, pixels, options) {
        options = options || {};

        var idata = createImageData(width, height, options.whitespace ||　'  ');
        for (var i = pixels.length - 1; i >= 0; i--) {
            var pix = pixels[i];
            idata[pix.y][pix.x] = options.pixel || '▇';
        };
        return idata;
    }
};