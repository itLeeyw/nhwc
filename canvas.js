var _canvas = document.getElementById("canvas_")//获取画布id

var context = _canvas.getContext('2d')//获取二维上下文

autoSetCanvasSize(_canvas)
listenToUser(_canvas)



var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false;
    pen.classList.add("active");
    eraser.classList.remove("active")
}
eraser.onclick = function(){
    eraserEnabled = true;
    eraser.classList.add("active")
    pen.classList.remove("active")   
}

colors = [red,green,blue]

red.onclick = function(){
    onColor(red);
    
}
green.onclick = function(){
    onColor(green);
}
blue.onclick = function(){
    onColor(blue);
}


function onColor(c){
    context.fillStyle = 'c'
    context.strokeStyle = 'c'
    c.classList.add('active')
    len = colors.length;
    for(i = 0; i < len; i++)
        if(c != colors[i]){
            colors[i].classList.remove('active')
        }
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

function listenToUser(canvas){//监听鼠标动作
    var using = false;//是否使用橡皮差或者别的？
    // var painting = false;//是否绘画
    var lastPoint = {x:undefined, y:undefined}//原先的点
    
    if(document.body.ontouchstart !== undefined){//特性检测
        //支持触屏设备
        canvas.ontouchstart = function(r){
            console.log("ontouchstart");
            var x = r.touches[0].clientX;
            var y = r.touches[0].clientY;
            using = true;
            if(eraserEnabled){
                context.clearRect(x-5, y-5, 10, 10);
            }else{
                //初始化原点
                lastPoint = {x:x, y:y};
            }
        }
        canvas.ontouchmove = function(r){
            console.log("ontouchmove");
            var x = r.touches[0].clientX;
            var y = r.touches[0].clientY;
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
        canvas.ontouchend = function(){
            console.log("ontouchend");
            using = false
        }

    }else{
        //不支持触屏设备
        canvas.onmousedown = function(r){
            console.log("onmousestart");
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
            
            console.log("onmousemove");
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
    }

   

    function drawCircle(x, y, radius) {//当点画圆
        context.beginPath()//代表开始绘制
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
    }
    function drawLine(x1, y1, x2, y2) {//两点之间连线
        context.beginPath()//开始绘制
        context.moveTo(x1, y1);
        context.lineWidth = 10;
        context.lineTo(x2, y2);
        context.stroke();//填充border
        context.closePath();//结束绘制
    }

}