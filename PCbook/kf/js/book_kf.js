$("#head").load("header.html", function(){
});
const urlParams = new URLSearchParams(window.location.search);
$.ajax({
	type:"get",
	url:"/product/detail",
  dataType:"json",
  data:{pid:urlParams.get('booksId')},
	success:function(result){
    $(".exhibition>img").attr('src',result[0].pic);
    $(".title-box>h1").text(result[0].title);
    $(".now-price-text").text(result[0].price); 
    var sid=result[0].sid;
	}
});
$(".add-cart").click(function(){
  $.ajax({
	type:"post",
	url:"/pro/session",
	dataType:"json",
	success:function(result){
  if(result==0){
    $('.alert').html('未登陆，不能加入购物车').addClass('alert-success').show().delay(1500).fadeOut();
  }else{
  var uid=result[0].uid;
  $.ajax({
	type:"post",
	url:"/product/insert",
  dataType:"json",
  data:{uid:uid,pid:urlParams.get('booksId'),sid:sid},
	success:function(result){
    $('.alert').html('加入购物车成功').addClass('alert-success').show().delay(1500).fadeOut();
	}
});
}
	}
});
})