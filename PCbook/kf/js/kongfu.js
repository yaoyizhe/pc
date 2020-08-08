
$("#head").load("header.html", function(){
});
/*选项卡*/
$(function(){
    function tab(fen,menus,conts){
        $(fen).on("mouseenter",menus,function(){
            var index=$(this).index();
            $(this).addClass("cul").siblings().removeClass("cul");
            $(conts).eq(index).addClass("cur").siblings().removeClass("cur");
        });
    };
    tab(".book-list",".tabTit>a",".book-list>.tabCon");
    tab(".hot_sale",".hotNav li",".hotCon>ul");
    tab(".hot_saleInner",".hotCon li");
});
/*轮播图*/
window.addEventListener("load",function(){
	var imgBox=document.querySelector("#banner-box>.img-box");
	var data = [{url:"img/banner/3604e13932f.jpg"},{url:"img/banner/327277b496.jpg"},
						 {url:"img/banner/b0a1aa96c.jpeg"},{url:"img/banner/d6e37c6f5d.png"}];
		   for (var i = 0; i < data.length; i++) {
			var myDiv = document.createElement('a');
			imgBox.appendChild(myDiv);
			myDiv.innerHTML ='<li>'+'<img src = "'+data[i].url+'">'+'</li>';}
            var myImg=imgBox.getElementsByTagName("img");
            var cur=0;
            setInterval(function(){
               for(var i=0; i<myImg.length;i++){
                myImg[i].style.display="none";
               }
               myImg[cur].style.display="block";
               cur++;
               if(cur>=myImg.length){
                   cur=0;
               }
            },5000);
		});
$.ajax({
	type:"get",
	async:true, 
	url:"http://127.0.0.1:8080/product/search",
	dataType:"json",	
	success:function(result){
    for(var i=0;i<result.length;i++){
			var $tabbook=$(
				'<li>'
				+'<a href="book.kongfu.html?booksId='+result[i].pid+'">'+'<img src="'+result[i].pic+'">'+'</a>'
				+'<div class="name">'
					+'<p>'+'<a href="book.kongfu.html?booksId='+result[i].pid+'">'+result[i].title+'</a>'+'</p>'
					+'<span>￥'+result[i].price+'</span>'
				+'</div>'
			+'</li>');
			if(result[i].id==1){
				$(".b1").append($tabbook);
			}else if(result[i].id==2){
				$(".b2").append($tabbook);
			}else if(result[i].id==3){
				$(".b3").append($tabbook);
			}else if(result[i].id==4){
				$(".b4").append($tabbook);
			}
	};
	for(var i=0;i<10;i++){
		 var $wenxue=$(
			'<li>'+'<i>'+i+'</i>'+'<p>'+result[i].title+'</p>'+'<div class="bookCur">'+
			'<div class="bpic">'+'<a href=""><img src="'+result[i].pic+'" alt=""></a>'+'</div>'+
            '<div class="bDetai">'+'<div class="bName">'+'<a href="">'+result[i].title+'</a></div>'+'<div class="bPrice">'+
			'<span class="price">￥'+result[i].price+'</span>'+'</div>'+'</div></div></li>');
			if(result[i].id==5){
				$(".a2").append($wenxue);
			}else{
				$(".a1").append($wenxue);}
	 }
	 $(".hotCon li:first").addClass("cul");
	}
});

