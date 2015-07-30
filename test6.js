////disable scroll 滚动条滚动控制
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}
////深度克隆
function cloneObject(src) {
  var objClone;
  if (src.constructor == Object){
    objClone = new src.constructor();
  }else{
    objClone = new src.constructor(src.valueOf());
  }
  for(var key in src){
    if ( objClone[key] != src[key] ){
      if ( typeof(src[key]) == "object" ){
        objClone[key] = cloneObject(src[key]);
    }else{
    objClone[key]= src[key];
      }
    }
  }
  objClone.toString = src.toString;
  objClone.valueOf = src.valueOf;
  return objClone;
}
//clone1
function cloneObject1(obj){
var o = obj.constructor === Array ? [] : {};
for(var i in obj){
if(obj.hasOwnProperty(i)){
o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
}
}
return o;
} 
//
//
////图片点击全屏
var currentImg;
$('.pic').click(function (){
  $(".wall").show();
  $(".ctrcontent").show();
  disable_scroll();//锁定滑块
	currentImg=$(this);//获取点击的图片
  var image=new Image();//新建图片
  image.src=currentImg.attr('src');//获取点击图片的src
//图片加载完毕后
  image.onload=function(){
    var w=parseInt(image.width);
    var h=parseInt(image.height);
    var pTop =(($('.picbox').height() - h)/2);
    var pLeft =(($('.picbox').width() - w)/2);
    var canvas=document.getElementById("bigImg");
    canvas.width=w;
    canvas.height=h;
    $('#bigImg').css({top:pTop,left:pLeft});//为了使任意大小图片居中,当图片大小超出picbox大小时出错
    var ctx=canvas.getContext("2d");
    ctx.drawImage(image,0,0);
    var imagedata=ctx.getImageData(0, 0, w, h);//取得canvas像素数据
    //var tempdata=$.extend(true, imagedata, imagedata);
    //点击进行黑白变换
    $('.gray').click(function(){
      canvas=document.getElementById("bigImg");
      ctx=canvas.getContext("2d");
      ctx.drawImage(image,0,0);
      imagedata=ctx.getImageData(0, 0, w, h);
      //恢复原图
      gray(imagedata.data);
      //替换canvas中的像素数据
      ctx.putImageData(imagedata, 0, 0);
      //显示canvas
    });
    //点击进行反色变换
    $('.inverse').click(function(){
      canvas=document.getElementById("bigImg");
      ctx=canvas.getContext("2d");
      ctx.drawImage(image,0,0);
      imagedata=ctx.getImageData(0, 0, w, h);
      //恢复原图
      inverse(imagedata.data);
      ctx.putImageData(imagedata, 0, 0);
    });
    //点击进行模糊变换
    $('.blur').click(function(){
      canvas=document.getElementById("bigImg");
      ctx=canvas.getContext("2d");
      ctx.drawImage(image,0,0);
      imagedata=ctx.getImageData(0, 0, w, h);
      //恢复原图
      blurprocess(imagedata);
      ctx.putImageData(imagedata,0,0);
    });
    //点击进行水平翻转
    $('.horizontalflip').click(function(){
      canvas=document.getElementById("bigImg");
      ctx=canvas.getContext("2d");
      ctx.drawImage(image,0,0);
      imagedata=ctx.getImageData(0, 0, w, h);
      //恢复原图
      horizontalflip(imagedata);
      ctx.putImageData(imagedata,0,0);
    });
    //点击进行垂直翻转
    $('.verticalflip').click(function(){
      canvas=document.getElementById("bigImg");
      ctx=canvas.getContext("2d");
      ctx.drawImage(image,0,0);
      imagedata=ctx.getImageData(0, 0, w, h);
      //恢复原图
      verticalflip(imagedata);
      ctx.putImageData(imagedata,0,0);
    });
  }
});

//退出图标退出
$(".quit").click(function(){
	$(".wall").fadeOut();
	$(".ctrcontent").hide();
	$(".bigImg").attr("src",'#');
	enable_scroll();
});



////滤镜代码部分
//黑白滤镜函数  @parameter  imagedata.data[]
function gray(data) {
  var len =data.length;
  var pixels = len/4;
  for(var i=0;i<pixels;i++){
    //取出R,G,B值
    var r = data[i*4];
    var g = data[i*4+1];
    var b = data[i*4+2];
    //黑白变换
    var g=parseInt((11*r+16*g+5*b)/32);
    //将变换后的像素设置到原来数组元素中
    data[i*4] = g;
    data[i*4+1] = g;
    data[i*4+2] = g;
  }
}
//反色滤镜函数 @parameter  imagedata.data[]
function inverse(data) {
  var len =data.length;
  var pixels = len/4;
  for(var i=0;i<pixels;i++){
    //取出R,G,B值
    var r = data[i*4];
    var g = data[i*4+1];
    var b = data[i*4+2];
    //黑白变换
    var r = parseInt(255-r);
    var g = parseInt(255-g);
    var b = parseInt(255-b);
    //将变换后的像素设置到原来数组元素中
    data[i*4] = r;
    data[i*4+1] = g;
    data[i*4+2] = b;
  }
}
//模糊滤镜函数  @parameter  imagedata{}
function blurprocess(imagedata) {
        var tempCanvasData = imagedata;
        var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;
        for ( var x = 0; x < tempCanvasData.width; x++) {
            for ( var y = 0; y < tempCanvasData.height; y++) {

                // Index of the pixel in the array
                var idx = (x + y * tempCanvasData.width) * 4;
                for(var subCol=-2; subCol<=2; subCol++) {
                    var colOff = subCol + x;
                    if(colOff <0 || colOff >= tempCanvasData.width) {
                        colOff = 0;
                    }
                    for(var subRow=-2; subRow<=2; subRow++) {
                        var rowOff = subRow + y;
                        if(rowOff < 0 || rowOff >= tempCanvasData.height) {
                            rowOff = 0;
                        }
                        var idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
                        var r = tempCanvasData.data[idx2 + 0];
                        var g = tempCanvasData.data[idx2 + 1];
                        var b = tempCanvasData.data[idx2 + 2];
                        sumred += r;
                        sumgreen += g;
                        sumblue += b;
                    }
                }

                // calculate new RGB value
                var nr = (sumred / 25.0);
                var ng = (sumgreen / 25.0);
                var nb = (sumblue / 25.0);

                // clear previous for next pixel point
                sumred = 0.0;
                sumgreen = 0.0;
                sumblue = 0.0;

                // assign new pixel value
                imagedata.data[idx + 0] = nr; // Red channel
                imagedata.data[idx + 1] = ng; // Green channel
                imagedata.data[idx + 2] = nb; // Blue channel
                imagedata.data[idx + 3] = 255; // Alpha channel
            }
        }
}
//水平翻转函数  @parameter  imagedata{}
//性能不好
function horizontalflip(canvasData) {
        var tempCanvasData = cloneObject(canvasData.data);
        for ( var x = 0; x < canvasData.width; x++) // column
        {
            for ( var y = 0; y < canvasData.height; y++) // row
            {

                // Index of the pixel in the array
                var idx = (x + y * canvasData.width) * 4;
                var midx = (((canvasData.width -1) - x) + y * canvasData.width) * 4;

                // assign new pixel value
                canvasData.data[midx + 0] = tempCanvasData[idx + 0]; // Red channel
                canvasData.data[midx + 1] = tempCanvasData[idx + 1]; // Green channel
                canvasData.data[midx + 2] = tempCanvasData[idx + 2];  // Blue channel
                canvasData.data[midx + 3] = 255; // Alpha channel
            }
        }
}
//垂直翻转函数  @parameter  imagedata{}
function verticalflip(canvasData) {
        var tempCanvasData = cloneObject(canvasData.data);
        for ( var x = 0; x < canvasData.width; x++) // column
        {
            for ( var y = 0; y < canvasData.height; y++) // row
            {

                // Index of the pixel in the array
                var idx = (x + y * canvasData.width) * 4;
                var midx = (((canvasData.height -1) - y) * canvasData.width+ x ) * 4;

                // assign new pixel value
                canvasData.data[midx + 0] = tempCanvasData[idx + 0]; // Red channel
                canvasData.data[midx + 1] = tempCanvasData[idx + 1]; // Green channel
                canvasData.data[midx + 2] = tempCanvasData[idx + 2];  // Blue channel
                canvasData.data[midx + 3] = 255; // Alpha channel
            }
        }
}






