var colors = require('colors');
var points = create2dArray(20,20);
var pix = '▇';
function repeat (str, times) {
    var index = 0,
        ctn = '';
    while(index < times) {
        ctn += str;
        index ++;
    }
    return ctn;
}
function create2dArray (col, row) {
    var rows = new Array(col);
    for (var i = 0 ; i < row; i ++) {
        rows[i] = new Array(col);
    }
    return rows;
}

function putPoint(x,y,color) {
    if (y >= points.length || x >= points.length) return;
    if (y < 0 || x < 0) return;
    points[y][x] = color;
    // console.log(x, y);
}
function circle(cx, cy, r, color) {

    var x=0,
        y=r,
        F=3-2*r;

    while(x < y){

        putPoint(cx + x,cy + y,color);
        if(F<0)
            F += 4*x+6;
        else {
            F += 4*(x-y)+10;
            y--;
        }

        x++;
    }
    if (x == y) putPoint(cx + x,cy + y,color);
}


function stroke (points) {
    var ouput = '';

    for (var i = 0; i < points.length; i ++) {
        for (var j = 0; j < points.length; j ++) {
            var color = points[i][j];
            if (!color) {
                ouput += pix.black;
            } else {
                ouput += pix[color]
            }
        }
        ouput += '\n';
    }
    console.log(ouput);
}

// 八对称性
function  _draw_circle_8 (xc, yc, x, y, c) {
    // 参数 c 为颜色值
    putPoint(xc + x, yc + y, c);
    putPoint(xc - x, yc + y, c);
    putPoint(xc + x, yc - y, c);
    putPoint(xc - x, yc - y, c);
    putPoint(xc + y, yc + x, c);
    putPoint(xc - y, yc + x, c);
    putPoint(xc + y, yc - x, c);
    putPoint(xc - y, yc - x, c);
}
 
//Bresenham's circle algorithm
function draw_circle (xc, yc, r, fill, c) {
    // (xc, yc) 为圆心，r 为半径
    // fill 为是否填充
    // c 为颜色值
 
    // 如果圆在图片可见区域外，直接退出
    // if (xc + r < 0 || xc - r >= img->w ||
    //         yc + r < 0 || yc - r >= img->h) return;
 
    var x = 0, y = r, yi, d;
    d = 3 - 2 * r;
 
    if (fill) {
        // 如果填充（画实心圆）
        while (x <= y) {
            for (yi = x; yi <= y; yi ++)
                _draw_circle_8(xc, yc, x, yi, c);
 
            if (d < 0) {
                d = d + 4 * x + 6;
            } else {
                d = d + 4 * (x - y) + 10;
                y --;
            }
            x++;
        }
    } else {
        // 如果不填充（画空心圆）
        while (x <= y) {
            _draw_circle_8(xc, yc, x, y, c);
 
            if (d < 0) {
                d = d + 4 * x + 6;
            } else {
                d = d + 4 * (x - y) + 10;
                y --;
            }
            x ++;
        }
    }
}

draw_circle(0, 0, 10, false, 'red');
stroke(points);