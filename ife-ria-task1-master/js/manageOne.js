// JavaScript Document
//����ȫ�ֱ���
var arr={};
//����id���� ȥ�ı�����content����ʽ
function changeDisplay(idName){
	$.each($(".content ul"),function(i,val){
			if(val.id==idName){
				$(".content ul").eq(i).css("display","block");
				}else{
				$(".content ul").eq(i).css("display","none");
					}
			
		});	
	}
//����id���� ȥ�ı����
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
//����uid��arr.x�õ��б��indexֵ
function getNewList(newList){
	$.each($("#outer_wrap li"),function(i,val){
		newList.push([i+1,val.id]);	
	});
	console.log(newList);
	return newList;
}
//����ȫ�����
//��ʼ���б�ͷ����
var totalNum=function(arrTwo){
		var ospan= document.createElement("span"); 
		var onum= document.createTextNode("("+arrTwo.length+")");
		ospan.appendChild(onum);
		$("#outer_wrap .list-head").append(ospan);
}
//��ʼ�������б�
//��ʼ���б�
var totalList=function(arrOne,arrTwo,index){
		var	firstListName;
		var imglist=[]; 
		for(var k=1;k<=arrOne.length;k++){
			 $.each(arrOne, function (i, val) {		
			 		if(parseInt(val.index)===k){
						//��ȡ��һ��������
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
//�б���ק���ܵ���Ӧ
function allowDrop(ev)
{
ev.preventDefault();
}

/*function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);
}*/
//�б�Ķ���
function dropSpe(ev,arr)
{
//console.log(arr.x)
ev.preventDefault();
//console.log(arr);
var data=ev.dataTransfer.getData("Text");
//������ͼ��
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
//�ŵ�λ��Ϊ�������Ŀհ� ����������������li 
else if(document.getElementById(data).parentNode.className=="list-sort"){
	if(ev.target.tagName.toLowerCase() == 'ul'&&ev.target.className == 'list-sort'){
		
		document.getElementById("outer_wrap").appendChild(document.getElementById(data));
		//function getNewList(newList) 
		var newList=[];
		newList=getNewList(newList);
		//�µ��б������  [index id]
		//alert(newList);
		
	}else if(ev.target.tagName.toLowerCase() == 'li'&&ev.target.parentNode.className == 'list-sort'){
		ev.target.parentNode.insertBefore(document.getElementById(data),ev.target);
		
		var uid=document.getElementById(data).id;
		var newList=[];
		newList=getNewList(newList);
		//�µ��б������  [index id]
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
//ͼƬ����ק
function dropSpeImg(ev,arr)
{
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	if(ev.target.tagName.toLowerCase() == 'ul'&&ev.target.className=="list-img"&&document.getElementById(data).parentNode.className=="list-img"){
	//��Ҫ�ҵ���Ӧ��ul
	document.getElementById(data).parentNode.appendChild(document.getElementById(data));
	
}else  if(ev.target.tagName.toLowerCase()=="li"&&ev.target.parentNode.className=="list-img"&&document.getElementById(data).parentNode.className=="list-img"){
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target);
		}else if(ev.target.tagName.toLowerCase() == "div"&&ev.target.parentNode.tagName.toLowerCase()=="li"&&document.getElementById(data).parentNode.className=="list-img"){
		
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target.parentNode);

	}else if((ev.target.tagName.toLowerCase() == 'img'||ev.target.tagName.toLowerCase() == 'span'||ev.target.tagName.toLowerCase() == 'button')&&document.getElementById(data).parentNode.className=="list-img"){	
		document.getElementById(data).parentNode.insertBefore(document.getElementById(data),ev.target.parentNode.parentNode);
		}
}
//����������arr.y ������Ӧ��ͼ
var showImg=function showImg(oclass1 , a2){
		var imgList=[];
		$.each(a2, function (i, val) {
			if(val.oclass==oclass1){
				imgList.push(val);
			}
			return imgList;
		})
		//����һ��oul
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
						//�������ذ���
						var obutton=document.createElement("button");
						obutton.setAttribute("draggable",false);
						obutton.setAttribute("type","hidden");
						oli.appendChild(obutton);
						//ͼƬdiv��
						var odiv1=document.createElement("div");
						odiv1.setAttribute("class","imgAddr");
						var oimg=document.createElement("img");
						oimg.setAttribute("draggable",false);
						oimg.setAttribute("src",val.addr);
						oimg.setAttribute("name",val.name);
						odiv1.appendChild(oimg);
						oli.appendChild(odiv1);
						//footer ��
						var odiv2=document.createElement("div");
						odiv2.setAttribute("class","footer");
						odiv2.setAttribute("draggable",false);
						//dtag��
						var ospan=document.createElement("apan");
						var otext = document.createTextNode(val.tag);
						ospan.appendChild(otext);
						odiv2.appendChild(ospan);
						// button ��
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

//��ʼ������json
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
		//��ʼ��ȫ����������totalNum=function(arrTwo)
		totalNum(arr.y);
		//��ʼ�������б�var totalList=function(arrOne,arrTwo,index) ���õ���index������
		var index=1;
		var firstListName=totalList(arr.x,arr.y,index);
		//��ʼ��content �������е�ul
		$.each(arr.x,function(i,val){
			var sortListDetail=val;
			showImg(sortListDetail.name,arr.y);
							  });
		//��ʼ������changeDisplay(idName)
		changeDisplay(firstListName);
		//�������ϵ������
		$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});
		
		
		})						   
						   
 })
