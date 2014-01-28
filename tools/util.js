var sutils = require('sutils');

module.exports = {
    /**
     *  Get height and width bound from pixels data
     **/
    bound: function(pixels) {

        var maxHeight = 0,
            maxWidth = 0;

        sutils.each(pixels, function(pix, index) {
            if (pix.x > maxWidth) maxHeight = pix.x;
            if (pix.y > maxHeight) maxWidth = pix.y;
        });

        return {
            height: maxWidth + 1,
            width: maxHeight + 1
        }
    },

    /**
     *  Use console.log to draw image data(2d-array) to terminal
     **/
    draw: function(imageData) {
        var str = '';

        sutils.each(imageData, function(row, rindex) {
            sutils.each(row, function(col, cindex) {
                str += col;
            });
            str += '\n';
        });

        console.log(str);
    }
}
