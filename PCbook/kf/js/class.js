$("#head").load("header.html", function(){
});
const urlParams = new URLSearchParams(window.location.search);
$(function(){
	var count=2;
	$.ajax({
		type:"get",
		url:"/product/class",
		dataType:"json",
		data:{id:urlParams.get('classId'),count:count,pno:urlParams.get('pno')},
		success:function(result){
			for(var i=0;i<result.length;i++){
			var $class=$('<li>'+
				'<div class="cover">'+
					'<a href="book.kongfu.html?booksId='+result[i].pid+'">'+'<img src="'+result[i].pic+'" alt="">'+'</a>'+
				'</div>'+
				'<div class="item-infor">'+
					'<div class="title"><a>'+result[i].title+'</a></div>'+
					'<div class="isbn-info">'+
						'<span>黄书泉 著</span>'+
						'<span>/ 安徽文艺出版社</span>'+
						'<span>/ 2011-11</span>'+
						'<span>/ 平装</span>'+
					'</div>'+
					'<div class="info-box">'+
						'<div class="text"><a href=""><span>博研书店</span></a></div>'+
						'<div class="text user-place">北京市通州区</div>'+
					'</div>'+
				'</div>'+
				'<div class="item-other-info">'+
					'<div class="first-info">'+
						'<span>￥</span>'+
						'<span>'+result[i].price+'</span>'+
					'</div>'+
					'<div class="ship-fee-box">'+
						'<span>快递</span>'+
						'<span>￥8.00</span>'+
					'</div>'+
					'<div class="add-time-box">'+
						'<span>2020-03-30</span>'+
						'<span>上书</span>'+			
					'</div>'+
				'</div>'+
				'<div class="btns-group">'+
					'<button>立即购买</button>'+
					'<button>加入购物车</button>'+
				'</div>'+
			'</li>')
			$(".bookList>ul").append($class);
			}
		}
	})
});
$.ajax({
	type:"get",
	url:"/product/contont",
	dataType:"json",
	data:{id:urlParams.get('classId')},
	success:function(result){	
		var cont=Math.ceil(result[0].kkk/2);
		for(var i=1;i<cont+1;i++){
			var $mont=$('<li>'+'<a href="?classId=5&pno='+i+'">'+i+'</a>'+'</li>')
			$(".next").before($mont);
			};
		$('.next').click(function(){
			var pno=parseInt (urlParams.get('pno'))+1;
			if(pno<=cont){
			$('.next a').attr('href','?classId=5&pno='+pno+'')
			}
		});
		$('.prevs').click(function(){
			var pno=parseInt(urlParams.get('pno'))-1;
			$('.prevs a').attr('href','?classId=5&pno='+pno+'')
		});
		$('.p-skip b').text(cont);
        $(".paging li").each(function(){
            if($(this).text()==urlParams.get('pno')){
                $(this).addClass("current");
            }
		});
		$('.p-skip>a').click(function(){
			var inputv=$('.p-skip>input').val();
			if(inputv>0 && inputv<=count){
			$('.p-skip>a').attr('href','?classId=5&pno='+$('.p-skip>input').val()+'');};
		});
	}
});
$(function(){
	if(parseInt(urlParams.get('pno'))==1){
		$('.prevs').css('display','none');
		};
		$('.p-skip>input').val(urlParams.get('pno'));
})