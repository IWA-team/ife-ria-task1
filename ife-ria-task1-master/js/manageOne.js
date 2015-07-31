// JavaScript Document
//定义全局变量
var arr={};
//传入id属性 去改变整个content的样式
function changeDisplay(idName){
	$.each($(".content ul"),function(i,val){
			if(val.id==idName){
				$(".content ul").eq(i).css("display","block");
				}else{
				$(".content ul").eq(i).css("display","none");
					}
			
		});	
	}
//传入id属性 去改变分类
function changeImgList(idName,moveList){
	$.each($(".content ul"),function(i,val){
			if(val.id==idName){
				alert("hello");
				$(".content ul").eq(i).append(moveList);
				}		
		});	
	$.each($(".content ul"),function(i,val){
			console.log(val);	
		});	
	}
//传入uid和arr.x得到列表的index值
function getNewList(newList){
	$.each($("#outer_wrap li"),function(i,val){
		newList.push([i+1,val.id]);	
	});
	console.log(newList);
	return newList;
}
//画出全部相册
//初始话列表头数量
var totalNum=function(arrTwo){
		var ospan= document.createElement("span"); 
		var onum= document.createTextNode("("+arrTwo.length+")");
		ospan.appendChild(onum);
		$("#outer_wrap .list-head").append(ospan);
}
//初始化具体列表
//初始化列表
var totalList=function(arrOne,arrTwo,index){
		var	firstListName;
		var imglist=[]; 
		for(var k=1;k<=arrOne.length;k++){
			 $.each(arrOne, function (i, val) {		
			 		if(parseInt(val.index)===k){
						//获取第一个的类名
						if(k==1){firstListName=val.name};
						var name=val.name;
						var mm=0;
						$.each(arrTwo,function(i,val){
							if(val.oclass==name){mm++;}	
						})
						var oli= document.createElement("li"); 
						 oli.setAttribute("id",val.id);
						 oli.setAttribute("index",val.index);
					 	oli.setAttribute("draggable",true);
						oli.setAttribute("value",val.name);
					 	oli.addEventListener("dragstart", function(ev) {
						ev.dataTransfer.setData("Text",ev.target.id);},false);
						var ospan1= document.createElement("span"); 
						 ospan1.setAttribute("class","sort-list-span");
					    var otext1 = document.createTextNode(val.name);
						 ospan1.appendChild(otext1);
						 oli.appendChild(ospan1);
						 var ospan=document.createElement("span");
						  ospan.setAttribute("class","sort-list-span");
						 var onum= document.createTextNode("("+mm+")");
						 ospan.appendChild(onum);
						 oli.appendChild(ospan);
					 	document.getElementById("outer_wrap").appendChild(oli); 
							}
						})
					 }
		return 	firstListName;
}
//列表拖拽功能的响应
function allowDrop(ev)
{
ev.preventDefault();
}

/*function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);
}*/
//列表的动作
function dropSpe(ev,arr)
{
//console.log(arr.x)
ev.preventDefault();
//console.log(arr);
var data=ev.dataTransfer.getData("Text");
//来自于图像
if(document.getElementById(data).parentNode.className=="list-img"){
	if(ev.target.tagName.toLowerCase() == 'ul'&&ev.target.id=="outer_wrap"){	
	   var listName=$("#outer_wrap li:last-child").attr("value");
		var imgName=document.getElementById(data).parentNode.id;
		if(listName!==imgName){
			changeImgList(listName,document.getElementById(data));
		}
	}else if (ev.target.tagName.toLowerCase() == 'li'&&ev.target.parentNode.id=="outer_wrap"){
		var imgName=document.getElementById(data).parentNode.id;
		var listName=ev.target.getAttribute("value");
		if(listName!==imgName){
			changeImgList(listName,document.getElementById(data));
		}
	}else if(ev.target.tagName.toLowerCase() == 'span'&&ev.target.parentNode.tagName.toLowerCase() == 'li'){
		var imgName=document.getElementById(data).parentNode.id;
		var listName=ev.target.parentNode.getAttribute("value");
		if(listName!==imgName){
			changeImgList(listName,document.getElementById(data));
			}
		};
}
//放的位置为类别下面的空白 并且是来自于类别的li 
else if(document.getElementById(data).parentNode.className=="list-sort"){
	if(ev.target.tagName.toLowerCase() == 'ul'&&ev.target.className == 'list-sort'){
		
		document.getElementById("outer_wrap").appendChild(document.getElementById(data));
		//function getNewList(newList) 
		var newList=[];
		newList=getNewList(newList);
		//新的列表的排序  [index id]
		//alert(newList);
		
	}else if(ev.target.tagName.toLowerCase() == 'li'&&ev.target.parentNode.className == 'list-sort'){
		ev.target.parentNode.insertBefore(document.getElementById(data),ev.target);
		
		var uid=document.getElementById(data).id;
		var newList=[];
		newList=getNewList(newList);
		//新的列表的排序  [index id]
		//alert(newList);
	  }else if(ev.target.className == 'sort-list-span'){
		  	ev.target.parentNode.parentNode.insertBefore(document.getElementById(data),ev.target.parentNode);
			var uid=document.getElementById(data).id;
			var newList=[];
			newList=getNewList(newList);
			//alert(newList);
		  }

	}

}
//图片的拖拽
function dropSpeImg(ev,arr)
{
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	if(ev.target.tagName.toLowerCase() == 'ul'&&ev.target.className=="list-img"&&document.getElementById(data).parentNode.className=="list-img"){
	//需要找到对应的ul
	document.getElementById(data).parentNode.appendChild(document.getElementById(data));
	
}else  if(ev.target.tagName.toLowerCase()=="li"&&ev.target.parentNode.className=="list-img"&&document.getElementById(data).parentNode.className=="list-img"){
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target);
		}else if(ev.target.tagName.toLowerCase() == "div"&&ev.target.parentNode.tagName.toLowerCase()=="li"&&document.getElementById(data).parentNode.className=="list-img"){
		
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target.parentNode);

	}else if((ev.target.tagName.toLowerCase() == 'img'||ev.target.tagName.toLowerCase() == 'span'||ev.target.tagName.toLowerCase() == 'button')&&document.getElementById(data).parentNode.className=="list-img"){	
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target.parentNode.parentNode);
		}
}
//根据类名和arr.y 画出对应的图
var showImg=function showImg(oclass1 , a2){
		var imgList=[];
		$.each(a2, function (i, val) {
			if(val.oclass==oclass1){
				imgList.push(val);
			}
			return imgList;
		})
		//创建一个oul
		 var oul=document.createElement("ul");
		 oul.setAttribute("id",oclass1);
	     oul.setAttribute("class","list-img");
			 for(var j=1;j<=imgList.length;j++){
			 	$.each(imgList, function (i, val) {
					if(parseInt(val.index)===j){
						var oli=document.createElement("li");
					     oli.setAttribute("id",val.id);
						 oli.setAttribute("oclass",val.oclass);
						 oli.setAttribute("index",val.index);
						 oli.setAttribute("draggable",true);
					 	 oli.addEventListener("dragstart", function(ev) {
						 ev.dataTransfer.setData("Text",ev.target.id);},false);
						//创建隐藏按键
						var obutton=document.createElement("button");
						obutton.setAttribute("draggable",false);
						obutton.setAttribute("type","hidden");
						oli.appendChild(obutton);
						//图片div块
						var odiv1=document.createElement("div");
						odiv1.setAttribute("class","imgAddr");
						var oimg=document.createElement("img");
						oimg.setAttribute("draggable",false);
						oimg.setAttribute("src",val.addr);
						oimg.setAttribute("name",val.name);
						odiv1.appendChild(oimg);
						oli.appendChild(odiv1);
						//footer 快
						var odiv2=document.createElement("div");
						odiv2.setAttribute("class","footer");
						odiv2.setAttribute("draggable",false);
						//dtag块
						var ospan=document.createElement("apan");
						var otext = document.createTextNode(val.tag);
						ospan.appendChild(otext);
						odiv2.appendChild(ospan);
						// button 块
						var oButtonOne=document.createElement("button");
						var oliButtonContent=document.createTextNode("button1");
						oButtonOne.appendChild(oliButtonContent);
						odiv2.appendChild(oButtonOne);
						var oButtonTwo=document.createElement("button");
						var oliButtonContentTwo=document.createTextNode("button2");
						oButtonTwo.appendChild(oliButtonContentTwo);
						odiv2.appendChild(oButtonTwo);
						
						oli.appendChild(odiv2);
						oul.appendChild(oli);
						
					}
				})
			 }
		$(".content").append(oul);
		
		
		}

//初始化两个json
$(document).ready(function(){
		
	 	$.when(
		$.ajax({url:"../js/photo.json"}),$.ajax({url:"../js/detail.json"})
	).done(function(a1,a2){
		var  arrOne=a1[0].photo;
		var  arrTwo=a2[0].detail;
		//console.log(a1[0].photo);
		//console.log(a2[0].detail);
		arr.x=a1[0].photo;
		arr.y=a2[0].detail;
		//初始化全部相册的数量totalNum=function(arrTwo)
		totalNum(arr.y);
		//初始化具体列表var totalList=function(arrOne,arrTwo,index) 并得到第index个类名
		var index=1;
		var firstListName=totalList(arr.x,arr.y,index);
		//初始化content 画出所有的ul
		$.each(arr.x,function(i,val){
			var sortListDetail=val;
			showImg(sortListDetail.name,arr.y);
							  });
		//初始化界面changeDisplay(idName)
		changeDisplay(firstListName);
		//给相册帮上点击动作
		$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});
		
		
		})						   
						   
 })
