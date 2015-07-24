/************************
   astonesh-BUPT  
***************************/
//获取鼠标位置 
function getMousePos(e){ 
return { 
x : e.pageX || e.clientX + document.body.scrollLeft, 
y : e.pageY || e.clientY + document.body.scrollTop 
} 
}
//获取元素位置 
function getElementPos(el){ 
	return { 
	x : el.offsetParent ? el.offsetLeft + arguments.callee(el.offsetParent)['x'] : el.offsetLeft, 
	y : el.offsetParent ? el.offsetTop + arguments.callee(el.offsetParent)['y'] : el.offsetTop 
	} 
} 
//获取元素尺寸 
function getElementSize(el){ 
return { 
width : el.offsetWidth, 
height : el.offsetHeight 
} 
} 


var outer_wrap = $('outer_wrap'); 
outer_wrap.onmousedown = function(event){ 
//获取列表顺序 
var lis = outer_wrap.getElementsByTagName('li'); 
for(var i = 0; i < lis.length; i++){ 
lis[i]['pos'] = getElementPos(lis[i]); 
lis[i]['size'] = getElementSize(lis[i]); 
} 
event = event || window.event; 
var t = event.target || event.srcElement; 
if(t.tagName.toLowerCase() == 'li'){ 
var p = getMousePos(event); 
var el = t.cloneNode(true); 
el.style.position = 'absolute'; 
el.style.left = t.pos.x + 'px'; 
el.style.top = t.pos.y + 'px'; 
el.style.width = t.size.width + 'px'; 
el.style.height = t.size.height + 'px'; 
el.style.border = '1px solid #d4d4d4'; 
el.style.background = '#d4d4d4'; 
el.style.opacity = '0.7'; 
document.body.appendChild(el); 
document.onmousemove = function(event){ 
event = event || window.event; 
var current = getMousePos(event); 
el.style.left =t.pos.x + current.x - p.x + 'px'; 
el.style.top =t.pos.y + current.y - p.y+ 'px'; 
document.body.style.cursor = 'move'; 
