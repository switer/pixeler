var colors = require('colors'),
    _ = require('underscore');
var points = create2dArray(52,52);
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
    // console.log(x,y)
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
function rect (x, y, width, height, color) {
    for (var i = 0; i <= width; i ++) {
        putPoint(x + i, y, color);
        putPoint(x + i, y + height, color);
    }
    for (var i = 0; i <= height; i ++) {
        putPoint(x, y + i, color);
        putPoint(x + width, y + i, color);
    }
}
function lineBresenham(x1, y1, x2, y2, color)
{
    var x = x1,
        y = y1,
        dx = Math.abs(x2 - x1),
        dy = Math.abs(y2 - y1),
        s1 = x2 > x1 ? 1 : -1,
        s2 = y2 > y1 ? 1 : -1;
    
    var interchange = false;    // 默认不互换 dx、dy
    if (dy > dx)                // 当斜率大于 1 时，dx、dy 互换
    {
        var temp = dx;
        dx = dy;
        dy = temp;
        interchange = true;
    }
    
    var p = 2 * dy - dx;
    for(var i = 0; i < dx; i++)
    {
        putPoint(x, y, color);
        if (p >= 0)
        {
            if (!interchange)       // 当斜率 < 1 时，选取上下象素点
                y += s2;
            else                    // 当斜率 > 1 时，选取左右象素点
                x += s1;
            p -= 2 * dx;
        }
        if (!interchange)
            x += s1;                // 当斜率 < 1 时，选取 x 为步长
        else
            y += s2;                // 当斜率 > 1 时，选取 y 为步长
        p += 2 * dy;
    }
}

function getPt(n1, n2, perc)
{
    var  diff = n2 - n1;
    return n1 + ( diff * perc );
}    
function bezier(x1, y1, x2, y2, x3, y3, color ) {
    for( var i = 0 ; i < 1 ; i += 0.01 )
    {
        // The Green Line
        var xa = getPt( x1 , x2 , i );
        var ya = getPt( y1 , y2 , i );
        var xb = getPt( x2 , x3 , i );
        var yb = getPt( y2 , y3 , i );

        // The Black Dot
        var x = getPt( xa , xb , i );
        var y = getPt( ya , yb , i );

        putPoint( Math.round(x) , Math.round(y) , color );
    }
}
function cubicBezier(x1, y1, x2, y2, x3, y3,x4,y4, color ) {
    for( var i = 0 ; i < 1 ; i += 0.01 )
    {
        // The Green Line
        var xa = getPt( x1 , x2 , i );
        var ya = getPt( y1 , y2 , i );
        var xb = getPt( x2 , x3 , i );
        var yb = getPt( y2 , y3 , i );

        // The Black Dot
        var x = getPt( xa , xb , i );
        var y = getPt( ya , yb , i );

        putPoint( Math.round(x) , Math.round(y) , color );
    }
}
function getBezierPoint(n1, n2, n3, t) {
    return Math.pow((1-t), 2)*n1 + 2*t*(1-t)*n2 + Math.pow(t,2)*n3; 
}
function getCubicBezierPoint(n1,n2,n3,n4, t) {
    return Math.pow((1-t), 3)*n1 + 3*t*Math.pow((1-t),2)*n2 + 3*Math.pow(t,2)*(1-t)*n3 + Math.pow(t,3)*n4;
}
function customBezier (x1, y1, x2, y2, x3, y3, color) {
    for( var i = 0 ; i < 1 ; i += 0.01 )
    {
        var xa = getBezierPoint(x1, x2, x3, i);
        var ya = getBezierPoint(y1, y2, y3, i);

        putPoint( Math.round(xa) , Math.round(ya) , color );
    }
}
function customCubicBezier (x1, y1, x2, y2, x3, y3, x4,y4, color) {
    for( var i = 0 ; i < 1 ; i += 0.01 )
    {
        var xa = getCubicBezierPoint(x1, x2, x3,x4, i);
        var ya = getCubicBezierPoint(y1, y2, y3,y4, i);

        putPoint( Math.round(xa) , Math.round(ya) , color );
    }
}

function factoria(n) {
    if (!n || (n%1) !== 0) return 1;
    else {
        var value = 1;
        while (n) {
            value *= n--;
        }
        return value;
    }
}

function arrangement (n, i) {
    return factoria(n)/(factoria(i)*factoria(n-i));
}
function bezierPoint (n, i, p, t) {
    return arrangement(n,i)*p*Math.pow(1-t,n-i)*Math.pow(t,i);
}
function commonBezier (/*x1,y1,x2,y2,...,xn,yn, color*/) {
    var args = Array.prototype.slice.call(arguments),
        color = args.pop(),
        points = args,
        n = points.length/2 - 1;

    for (var i = 0; i < 1; i += 0.01) {
        var x = 0,
            y = 0;

        for (var j = 0; j < n+1; j ++) {
            x += bezierPoint(n, j, points[j*2], i);
            y += bezierPoint(n, j, points[j*2 + 1], i);
        }
        putPoint( Math.round(x) , Math.round(y) , color );
    }
    // var length = parseInt(points.length/2);

}
// draw_circle(20, 20, 9, false, 'white');
// lineBresenham(0,0, 40,40, 'blue');
// lineBresenham(0,40, 40,0, 'green');
// lineBresenham(0,20, 40,20, 'cyan');
// draw_circle(20, 20, 20, false, 'red');
// rect(10,10,20,20, 'yellow')
// bezier(0,20, 10,0, 50,30, 'yellow');
// customBezier(0,30, 10,10, 50,40, 'grey')
// customCubicBezier(0,20, 10,0,40,15, 50,30, 'yellow');
commonBezier(0,20,10,0,40,15,50,30, 'yellow');
commonBezier(0,20,10,0,40,15,50,30, 50, 40, 'blue');
commonBezier(0,20,10,0,40,15, 'green');
stroke(points);
