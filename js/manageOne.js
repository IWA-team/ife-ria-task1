// JavaScript Document
//����ȫ�ֱ���
var arr={};
//�ڶ���������Ҫ����
//�ɴ�����Ƭ��id ����һ����̬��div  ������cssʵ������Ч��
function editPhoto(photoid){
	
	}

//���ݵ�ǰ���б�����json  ��һ��������Ҫ����
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
//����ajax���� ��json �׸������� ��дphoto.js
function changeAjax(json,url){
$.ajax({
            //�ύ���ݵ����� POST GET
            type:"POST",
            //�ύ����ַ
            url:url,
            //�ύ������
            data:json,
            //�������ݵĸ�ʽ
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            //�ɹ�����֮����õĺ���             
            success:function(data){
				//alert("well done");
            }   ,
            //����ִ�к���õĺ���
            complete: function(XMLHttpRequest, textStatus){
              // alert(XMLHttpRequest.responseText);
               alert(textStatus);
                //HideLoading();
            },
            //���ó���ִ�еĺ���
            error: function(){
                //���������
				alert("something wrong");
            }         
         });	
	}
//��ȡ��ǰͼƬԪ������
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
//���ݵ�ǰ��ͼƬ�б�����json
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
				$(".content ul").eq(i).append(moveList);
				}		
		});		
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
//�õ���ǰ��ͼƬ���б�[id,name,i,num]
function GetArrNum(arrList){
	$.each($("#outer_wrap li"),function(i,val){
						var num=val.getAttribute("number");
						var name=val.getAttribute("value");
						
						arrList.push([val.id,name,i,num])
						});
	return arrList;
	}
//�ƶ�����ı�����
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
//������е�li�б�
function clearList(){
	$("#outer_wrap li").remove();
	}
//�ػ�li�б�dpaintList(arrList)
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
			var arrList=[];
			// GetArrNum(arrList)�õ���ǰ��ͼƬ���б�[id,num]
			GetArrNum(arrList);
			//console.log(arrList);
			//�ı��б�����changNumList(arrList,add_name,minu_name)
			changNumList(arrList,listName,imgName);
			//console.log(arrList);
			//������е�li
			clearList();
			//�ػ�li�б�dpaintList(arrList)
			dpaintList(arrList);
			//�������ϵ������
			$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});
			
			
		  var arrListOne=[];
		  //getImgListNow(arrList)   arrToStringImg(newList,str)
		  getImgListNow(arrListOne);
		  var str="";
		  var json=arrToStringImg(arrListOne,str);
		  	//changeAjax(json,url) �ϴ���������php
		 var url="../php/manage1.php";
		 changeAjax(json,url);
		  var newList=[];
		  GetArrNum(newList) 
		  //�µ��б������  [id name index number ] index ��0��ʼ
		  var str_sort="";
		  var json1=arrToString(newList,str_sort);
		  //changeAjax(json,url) �ϴ���������php
		  var url_1="../php/manage.php";
		  changeAjax(json1,url_1);
		}
	}else if (ev.target.tagName.toLowerCase() == 'li'&&ev.target.parentNode.id=="outer_wrap"){
		var imgName=document.getElementById(data).parentNode.id;
		var listName=ev.target.getAttribute("value");
		if(listName!==imgName){
			changeImgList(listName,document.getElementById(data));
			var arrList=[];
			// GetArrNum(arrList)�õ���ǰ��ͼƬ���б�[id,num]
			GetArrNum(arrList);
			//console.log(arrList);
			//�ı��б�����changNumList(arrList,add_name,minu_name)
			changNumList(arrList,listName,imgName);
			//console.log(arrList);
			//������е�li
			clearList();
			//�ػ�li�б�dpaintList(arrList)
			dpaintList(arrList);
			//�������ϵ������
			$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});	
		   var arrListOne=[];
		   //getImgListNow(arrList)   arrToStringImg(newList,str)
		   getImgListNow(arrListOne);
		   var str="";
		   var json=arrToStringImg(arrListOne,str);
		   //changeAjax(json,url) �ϴ���������php
		 	var url="../php/manage1.php";
		 	changeAjax(json,url);
		  	 var newList=[];
		 	 GetArrNum(newList) 
		  //�µ��б������  [id name index number ] index ��0��ʼ
		  // arrToString(newList,str)
		  //alert(newList);
		  var str_sort="";
		  var json1=arrToString(newList,str_sort);
		  //changeAjax(json,url) �ϴ���������php
		 var url_1="../php/manage.php";
		 changeAjax(json1,url_1);
		}
	}else if(ev.target.tagName.toLowerCase() == 'span'&&ev.target.parentNode.tagName.toLowerCase() == 'li'){
		var imgName=document.getElementById(data).parentNode.id;
		var listName=ev.target.parentNode.getAttribute("value");
		if(listName!==imgName){
			changeImgList(listName,document.getElementById(data));
			var arrList=[];
			// GetArrNum(arrList)�õ���ǰ��ͼƬ���б�[id,num]
			GetArrNum(arrList);
			//console.log(arrList);
			//�ı��б�����changNumList(arrList,add_name,minu_name)
			changNumList(arrList,listName,imgName);
			//console.log(arrList);
			//������е�li
			clearList();
			//�ػ�li�б�dpaintList(arrList)
			dpaintList(arrList);
			//�������ϵ������
			$("#outer_wrap li").click(function(){
			 	 changeDisplay(this.getAttribute("value"));
			});	
		   var arrListOne=[];
		  //getImgListNow(arrList)   arrToStringImg(newList,str)
		  getImgListNow(arrListOne);
		  var str="";
		  var json=arrToStringImg(arrListOne,str);
		  //changeAjax(json,url) �ϴ���������php
		 var url="../php/manage1.php";
		 changeAjax(json,url);
		  var newList=[];
		  GetArrNum(newList) 
		  //�µ��б������  [id name index number ] index ��0��ʼ
		  // arrToString(newList,str)
		  //alert(newList);
		  var str_sort="";
		  var json1=arrToString(newList,str_sort);
		  //changeAjax(json,url) �ϴ���������php
		 var url_1="../php/manage.php";
		 changeAjax(json1,url_1);
			}
		};
}
//�ŵ�λ��Ϊ�������Ŀհ� ����������������li 
else if(document.getElementById(data).parentNode.className=="list-sort"){
	if(ev.target.tagName.toLowerCase() == 'ul'&&ev.target.className == 'list-sort'){
		
		document.getElementById("outer_wrap").appendChild(document.getElementById(data));
		//GetArrNum(arrList) 
		var newList=[];
		GetArrNum(newList) 
		//�µ��б������  [id name index number ] index ��0��ʼ
		// arrToString(newList,str)
		//alert(newList);
		var str="";
		var json1=arrToString(newList,str);
		//changeAjax(json,url) �ϴ���������php
		var url="../php/manage.php";
		changeAjax(json1,url);
		
	}else if(ev.target.tagName.toLowerCase() == 'li'&&ev.target.parentNode.className == 'list-sort'){
		ev.target.parentNode.insertBefore(document.getElementById(data),ev.target);
		var newList=[];
		GetArrNum(newList) 
		//�µ��б������  [id name index number ] index ��0��ʼ
		// arrToString(newList,str)
		//alert(newList);
		var str="";
		var json1=arrToString(newList,str);
		//changeAjax(json,url) �ϴ���������php
		var url="../php/manage.php";
		changeAjax(json1,url);
	  }else if(ev.target.className == 'sort-list-span'){
		ev.target.parentNode.parentNode.insertBefore(document.getElementById(data),ev.target.parentNode);
		var newList=[];
		GetArrNum(newList) 
		//�µ��б������  [id name index number ] index ��0��ʼ
		// arrToString(newList,str)
		//alert(newList);
		var str="";
		var json1=arrToString(newList,str);
		//changeAjax(json,url) �ϴ���������php
		var url="../php/manage.php";
		changeAjax(json1,url);
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
	var arrList=[];
	//getImgListNow(arrList)   arrToStringImg(newList,str)
	getImgListNow(arrList);
	//console.log(arrList);
	var str="";
	var json1=arrToStringImg(arrList,str);
	//changeAjax(json,url) �ϴ���������php
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
		//changeAjax(json,url) �ϴ���������php
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
		//changeAjax(json,url) �ϴ���������php
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
		//changeAjax(json,url) �ϴ���������php
		var url="../php/manage1.php";
		changeAjax(json1,url);
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
						// oli.setAttribute("oclass",val.oclass);
						 oli.setAttribute("addr",val.addr);
						 oli.setAttribute("name",val.name);
						 oli.setAttribute("tag",val.tag);
						 //oli.setAttribute("index",val.index);
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
