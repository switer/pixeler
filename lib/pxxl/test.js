var pxxl = require("./pxxl");

function pix2imagedata (width, height, pixels) {
	var idata = createImageData(width, height, '  ');
	for (var i = pixels.length - 1; i >= 0; i--) {
		var pix = pixels[i];
		idata[pix.y][pix.x] = '▇';
	};
	return idata;
}
function createImageData (row, col, value) {
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
}

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
// ascii art demo
pxxl('./fonts/c64.bdf', 'hello', function(text, pixels, font) {

    var maxSize = max(pixels);
    // return;
    var img = pix2imagedata(maxSize.width, maxSize.height, pixels);

	draw(img);
	// initialize buffer, 8 columns wide for each character
	// var buffer = [];
	// for(var line=0 ; line<8; line++)
	// 	buffer.push(new Array(text.length*8).join(" "));

	// // draw pixels to buffer
	// for (var i=0 ; i<pixels.length ; i++)
	// {
	// 	var p = pixels[i];

	// 	// for every pixel, replace a character in the buffer
	// 	var tmp=buffer[p.y].split("");
	// 	tmp.splice(p.x,1,"#");
	// 	buffer[p.y] = tmp.join("");
	// }
	
	// // write buffer to screen
	// for(var line=0 ; line<8; line++)
	// 	console.log(buffer[line]);
});