var _canvas = document.getElementById("canvas_")//获取画布id
var _eraser = document.getElementById("eraser")//获取橡皮差
var _brush = document.getElementById("brush")//获取画笔
// var actions = document.getElementsByClassName("actions")//获取画笔
var context = _canvas.getContext('2d')//获取二维上下文

autoSetCanvasSize(_canvas)
listenToMouse(_canvas)



var eraserEnabled = false
_eraser.onclick = function(){
    eraserEnabled = true;
    actions.className = 'actions x';
}
_brush.onclick = function(){
    eraserEnabled = false;
    actions.className = 'actions'
}



function autoSetCanvasSize(canvas){//自动设置canvas大小
    Window_reSize()//更新页面窗口大小

    window.onresize = function(){//如果用户窗口重新改变大小
        Window_reSize();//更新页面窗口大小
    }
    function Window_reSize(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        
        // 将画布的宽高动态设置成为获取到的client的宽高
        canvas.width = pageWidth;
        canvas.height = pageHeight;
        
    }
}

function listenToMouse(canvas){//监听鼠标动作
    var using = false;//是否使用橡皮差或者别的？
    // var painting = false;//是否绘画
    var lastPoint = {x:undefined, y:undefined}//原先的点
    
    canvas.onmousedown = function(r){
        //首先获取到client当前鼠标位置
        var x = r.clientX;
        var y = r.clientY;
        using = true;
        if(eraserEnabled){
            context.clearRect(x-5, y-5, 10, 10);
        }else{
            //初始化原点
            lastPoint = {x:x, y:y};
        }
    
    }  
    canvas.onmousemove = function(r){
        var x = r.clientX;
        var y = r.clientY;
        if(!using){ return ; }
        if(eraserEnabled){
                context.clearRect(x-5, y-5, 10, 10);
        }else{
                var newPoint = {x:x, y:y};
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                //重置原点
                lastPoint = newPoint
        }
        
    }
    canvas.onmouseup = function (z) {
        using = false
    }

    function drawCircle(x, y, radius) {//当点画圆
        context.beginPath()//代表开始绘制
        context.fillStyle = "black";
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
    }
    function drawLine(x1, y1, x2, y2) {//两点之间连线
        context.beginPath()//开始绘制
        context.strokeStyle = "red";
        context.moveTo(x1, y1);
        context.lineWidth = 10;
        context.lineTo(x2, y2);
        context.stroke();//填充border
        context.closePath();//结束绘制
    }

}