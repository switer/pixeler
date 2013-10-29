var CanvasContext = require('./CanvasContext');

var Canvas = function (width, height) {
    var context = new CanvasContext();
    this.width = width || 0;
    this.height = height || 0;
    this.getContext = function () {
        return context;
    }
}