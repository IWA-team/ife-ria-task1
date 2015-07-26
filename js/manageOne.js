// JavaScript Document
//定义全局变量
var arr={};
//第二期任务主要代码
//由传入照片的id 创建一个动态的div  并利用css实现遮罩效果
function editPhoto(photoid){
	
	}

//根据当前的列表生成json  第一期任务主要代码
function arrToString(newList,str){
	str+="{"+"\""+"photo"+"\""+":[" + "";
	for(var i=0;i<newList.length;i++){
		if(i==newList.length-1){
			str+="{"+"\"id\":"+newList[i][0]+",\"name\":"+"\""+newList[i][1]+"\""+",\"number\":"+newList[i][3]+",\"index\":"+(newList[i][2]+1)+"}";
			}else{
			str+="{"+"\"id\":"+newList[i][0]+",\"name\":"+"\""+newList[i][1]+"\""+",\"number\":"+newList[i][3]+",\"index\":"+(newList[i][2]+1)+"},";
			}
		}
		str+="]}";
	var json = eval('(' + str + ')'); 
		console.log(json.photo);
		return json;
	}
//发出ajax请求 把json 抛给服务器 重写photo.js
function changeAjax(json,url){
$.ajax({
            //提交数据的类型 POST GET
            type:"POST",
            //提交的网址
            url:url,
            //提交的数据
            data:json,
            //返回数据的格式
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            //成功返回之后调用的函数             
            success:function(data){
				//alert("well done");
            }   ,
            //调用执行后调用的函数
            complete: function(XMLHttpRequest, textStatus){
              // alert(XMLHttpRequest.responseText);
               alert(textStatus);
                //HideLoading();
            },
            //调用出错执行的函数
            error: function(){
                //请求出错处理
				alert("something wrong");
            }         
         });	
	}
//获取当前图片元素数组
function getImgListNow(arrList){
	$.each($(".content ul "),function(i,val){
						var classid=val.id;
						$.each($(".content ul").eq(i).children(),function(i,val){
						var id=val.id;
						var addr=val.getAttribute("addr");
						var tag=val.getAttribute("tag");
						var name=val.getAttribute("name");
						var index=(i+1);
						var oclass=classid;
						arrList.push([id,addr,name,tag,index,oclass])												 
						} );
										
						});
	console.log(arrList);
	return arrList;	
	}
//根据当前的图片列表生成json
function arrToStringImg(newList,str){
	str+="{"+"\""+"detail"+"\""+":[" + "";
	for(var i=0;i<newList.length;i++){
		if(i==newList.length-1){
			str+="{"+"\"id\":"+"\""+newList[i][0]+"\""+",\"addr\":"+"\""+newList[i][1]+"\""+",\"name\":"+"\""+newList[i][2]+"\""+",\"tag\":"+"\""+newList[i][3]+"\""+",\"index\":"+"\""+newList[i][4]+"\""+",\"oclass\":"+"\""+newList[i][5]+"\""+"}";
			}else{
			str+="{"+"\"id\":"+"\""+newList[i][0]+"\""+",\"addr\":"+"\""+newList[i][1]+"\""+",\"name\":"+"\""+newList[i][2]+"\""+",\"tag\":"+"\""+newList[i][3]+"\""+",\"index\":"+"\""+newList[i][4]+"\""+",\"oclass\":"+"\""+newList[i][5]+"\""+"},";
			}
		}
		str+="]}";
	//console.log(str);
	var json = eval('(' + str + ')'); 
		//console.log(json);
		return json;
	}
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
				$(".content ul").eq(i).append(moveList);
				}		
		});		
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
						oli.setAttribute("number",val.number);
					 	oli.addEventListener("dragstart", function(ev) {
						ev.dataTransfer.setData("Text",ev.target.id);},false);
						var ospan1= document.createElement("span"); 
						 ospan1.setAttribute("class","sort-list-spanOne");
					    var otext1 = document.createTextNode(val.name);
						 ospan1.appendChild(otext1);
						 oli.appendChild(ospan1);
						 var ospan=document.createElement("span");
						  ospan.setAttribute("class","sort-list-spanTwo");
						 var onum= document.createTextNode("("+val.number+")");
						 ospan.appendChild(onum);
						 oli.appendChild(ospan);
					 	document.getElementById("outer_wrap").appendChild(oli); 
							}
						})
					 }
		return 	firstListName;
}
//得到当前的图片数列表[id,name,i,num]
function GetArrNum(arrList){
	$.each($("#outer_wrap li"),function(i,val){
						var num=val.getAttribute("number");
						var name=val.getAttribute("value");
						
						arrList.push([val.id,name,i,num])
						});
	return arrList;
	}
//移动分类改变数据
function changNumList(arrList,add_name,minu_name){
	for(var i=0;i<arrList.length;i++){
		if(arrList[i][1]==add_name){
			arrList[i][3]++;
			}else	if(arrList[i][1]==minu_name){
			arrList[i][3]--;	
				};
		}
		return arrList;
	}
//清除所有的li列表
function clearList(){
	$("#outer_wrap li").remove();
	}
//重画li列表dpaintList(arrList)
function dpaintList(arrList){
	for(var k=0;k<arrList.length;k++){
		var oli= document.createElement("li"); 
		  oli.setAttribute("id",arrList[k][0]);
		  oli.setAttribute("index",arrList[k][2]);
		  oli.setAttribute("draggable",true);
		  oli.setAttribute("value",arrList[k][1]);
		  oli.setAttribute("number",arrList[k][3]);
		  oli.addEventListener("dragstart", function(ev) {
			ev.dataTransfer.setData("Text",ev.target.id);},false);
		   var ospan1= document.createElement("span"); 
		   ospan1.setAttribute("class","sort-list-spanOne");
			var otext1 = document.createTextNode(arrList[k][1]);
			 ospan1.appendChild(otext1);
			 oli.appendChild(ospan1);
			 var ospan=document.createElement("span");
			 ospan.setAttribute("class","sort-list-spanTwo");
			 var onum= document.createTextNode("("+arrList[k][3]+")");
			 ospan.appendChild(onum);
			  oli.appendChild(ospan);
			document.getElementById("outer_wrap").appendChild(oli); 		
		}
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
			var arrList=[];
			// GetArrNum(arrList)拿到当前的图片数列表[id,num]
			GetArrNum(arrList);
			//console.log(arrList);
			//改变列表数据changNumList(arrList,add_name,minu_name)
			changNumList(arrList,listName,imgName);
			//console.log(arrList);
			//清除所有的li
			clearList();
			//重画li列表dpaintList(arrList)
			dpaintList(arrList);
			//给相册帮上点击动作
			$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});
			
			
		  var arrListOne=[];
		  //getImgListNow(arrList)   arrToStringImg(newList,str)
		  getImgListNow(arrListOne);
		  var str="";
		  var json=arrToStringImg(arrListOne,str);
		  	//changeAjax(json,url) 上传给服务器php
		 var url="../php/manage1.php";
		 changeAjax(json,url);
		  var newList=[];
		  GetArrNum(newList) 
		  //新的列表的排序  [id name index number ] index 从0开始
		  var str_sort="";
		  var json1=arrToString(newList,str_sort);
		  //changeAjax(json,url) 上传给服务器php
		  var url_1="../php/manage.php";
		  changeAjax(json1,url_1);
		}
	}else if (ev.target.tagName.toLowerCase() == 'li'&&ev.target.parentNode.id=="outer_wrap"){
		var imgName=document.getElementById(data).parentNode.id;
		var listName=ev.target.getAttribute("value");
		if(listName!==imgName){
			changeImgList(listName,document.getElementById(data));
			var arrList=[];
			// GetArrNum(arrList)拿到当前的图片数列表[id,num]
			GetArrNum(arrList);
			//console.log(arrList);
			//改变列表数据changNumList(arrList,add_name,minu_name)
			changNumList(arrList,listName,imgName);
			//console.log(arrList);
			//清除所有的li
			clearList();
			//重画li列表dpaintList(arrList)
			dpaintList(arrList);
			//给相册帮上点击动作
			$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});	
		   var arrListOne=[];
		   //getImgListNow(arrList)   arrToStringImg(newList,str)
		   getImgListNow(arrListOne);
		   var str="";
		   var json=arrToStringImg(arrListOne,str);
		   //changeAjax(json,url) 上传给服务器php
		 	var url="../php/manage1.php";
		 	changeAjax(json,url);
		  	 var newList=[];
		 	 GetArrNum(newList) 
		  //新的列表的排序  [id name index number ] index 从0开始
		  // arrToString(newList,str)
		  //alert(newList);
		  var str_sort="";
		  var json1=arrToString(newList,str_sort);
		  //changeAjax(json,url) 上传给服务器php
		 var url_1="../php/manage.php";
		 changeAjax(json1,url_1);
		}
	}else if(ev.target.tagName.toLowerCase() == 'span'&&ev.target.parentNode.tagName.toLowerCase() == 'li'){
		var imgName=document.getElementById(data).parentNode.id;
		var listName=ev.target.parentNode.getAttribute("value");
		if(listName!==imgName){
			changeImgList(listName,document.getElementById(data));
			var arrList=[];
			// GetArrNum(arrList)拿到当前的图片数列表[id,num]
			GetArrNum(arrList);
			//console.log(arrList);
			//改变列表数据changNumList(arrList,add_name,minu_name)
			changNumList(arrList,listName,imgName);
			//console.log(arrList);
			//清除所有的li
			clearList();
			//重画li列表dpaintList(arrList)
			dpaintList(arrList);
			//给相册帮上点击动作
			$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});	
		   var arrListOne=[];
		  //getImgListNow(arrList)   arrToStringImg(newList,str)
		  getImgListNow(arrListOne);
		  var str="";
		  var json=arrToStringImg(arrListOne,str);
		  //changeAjax(json,url) 上传给服务器php
		 var url="../php/manage1.php";
		 changeAjax(json,url);
		  var newList=[];
		  GetArrNum(newList) 
		  //新的列表的排序  [id name index number ] index 从0开始
		  // arrToString(newList,str)
		  //alert(newList);
		  var str_sort="";
		  var json1=arrToString(newList,str_sort);
		  //changeAjax(json,url) 上传给服务器php
		 var url_1="../php/manage.php";
		 changeAjax(json1,url_1);
			}
		};
}
//放的位置为类别下面的空白 并且是来自于类别的li 
else if(document.getElementById(data).parentNode.className=="list-sort"){
	if(ev.target.tagName.toLowerCase() == 'ul'&&ev.target.className == 'list-sort'){
		
		document.getElementById("outer_wrap").appendChild(document.getElementById(data));
		//GetArrNum(arrList) 
		var newList=[];
		GetArrNum(newList) 
		//新的列表的排序  [id name index number ] index 从0开始
		// arrToString(newList,str)
		//alert(newList);
		var str="";
		var json1=arrToString(newList,str);
		//changeAjax(json,url) 上传给服务器php
		var url="../php/manage.php";
		changeAjax(json1,url);
		
	}else if(ev.target.tagName.toLowerCase() == 'li'&&ev.target.parentNode.className == 'list-sort'){
		ev.target.parentNode.insertBefore(document.getElementById(data),ev.target);
		var newList=[];
		GetArrNum(newList) 
		//新的列表的排序  [id name index number ] index 从0开始
		// arrToString(newList,str)
		//alert(newList);
		var str="";
		var json1=arrToString(newList,str);
		//changeAjax(json,url) 上传给服务器php
		var url="../php/manage.php";
		changeAjax(json1,url);
	  }else if(ev.target.className == 'sort-list-span'){
		ev.target.parentNode.parentNode.insertBefore(document.getElementById(data),ev.target.parentNode);
		var newList=[];
		GetArrNum(newList) 
		//新的列表的排序  [id name index number ] index 从0开始
		// arrToString(newList,str)
		//alert(newList);
		var str="";
		var json1=arrToString(newList,str);
		//changeAjax(json,url) 上传给服务器php
		var url="../php/manage.php";
		changeAjax(json1,url);
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
	var arrList=[];
	//getImgListNow(arrList)   arrToStringImg(newList,str)
	getImgListNow(arrList);
	//console.log(arrList);
	var str="";
	var json1=arrToStringImg(arrList,str);
	//changeAjax(json,url) 上传给服务器php
	var url="../php/manage1.php";
	changeAjax(json1,url);
	
}else  if(ev.target.tagName.toLowerCase()=="li"&&ev.target.parentNode.className=="list-img"&&document.getElementById(data).parentNode.className=="list-img"){
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target);
		var arrList=[];
		//getImgListNow(arrList)   arrToStringImg(newList,str)
		getImgListNow(arrList);
		//console.log(arrList);
		var str="";
		var json1=arrToStringImg(arrList,str);
		//changeAjax(json,url) 上传给服务器php
		var url="../php/manage1.php";
		changeAjax(json1,url);
		}else if(ev.target.tagName.toLowerCase() == "div"&&ev.target.parentNode.tagName.toLowerCase()=="li"&&document.getElementById(data).parentNode.className=="list-img"){
		
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target.parentNode);
		var arrList=[];
		//getImgListNow(arrList)   arrToStringImg(newList,str)
		getImgListNow(arrList);
		//console.log(arrList);
		var str="";
		var json1=arrToStringImg(arrList,str);
		//changeAjax(json,url) 上传给服务器php
		var url="../php/manage1.php";
		changeAjax(json1,url);

	}else if((ev.target.tagName.toLowerCase() == 'img'||ev.target.tagName.toLowerCase() == 'span'||ev.target.tagName.toLowerCase() == 'button')&&document.getElementById(data).parentNode.className=="list-img"){	
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target.parentNode.parentNode);
		var arrList=[];
		//getImgListNow(arrList)   arrToStringImg(newList,str)
		getImgListNow(arrList);
		//console.log(arrList);
		var str="";
		var json1=arrToStringImg(arrList,str);
		//changeAjax(json,url) 上传给服务器php
		var url="../php/manage1.php";
		changeAjax(json1,url);
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
						// oli.setAttribute("oclass",val.oclass);
						 oli.setAttribute("addr",val.addr);
						 oli.setAttribute("name",val.name);
						 oli.setAttribute("tag",val.tag);
						 //oli.setAttribute("index",val.index);
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
