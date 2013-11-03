var SubPath = function () {
	points: [],
	isClosed : false
}
var Path = {}

function create2dArray (col, row) {
    var rows = new Array(col);
    for (var i = 0 ; i < row; i ++) {
        rows[i] = new Array(col);
    }
    return rows;
}