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

        var idata = this.create2d(width, height, options.whitespace ||　'  ');
        
        for (var i = pixels.length - 1; i >= 0; i--) {
            var pix = pixels[i];
            idata[pix.y][pix.x] = options.pixel || '▇';
        };
        return idata;
    },
    /**
     *  Create unit8 array from 2d-array image data 
     **/
    unit8form2d: function (imageData, color) {

        var colors = (color || '255,255,255,255').split(','),
            unit8array = [];

        colors[0] = parseInt(colors[0]);
        colors[1] = parseInt(colors[1]);
        colors[2] = parseInt(colors[2]);
        colors[3] = parseInt(colors[3]);

        for (var i =0 ; i < imageData.length; i ++) {
            
            for (var j =0 ; i < imageData[i].length; j ++) {

                unit8array.push(colors[0]);
                unit8array.push(colors[1]);
                unit8array.push(colors[2]);
                unit8array.push(colors[3]);
            }
        }

        return unit8array;
    }
};