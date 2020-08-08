
$("#head").load("header.html", function(){
});
//点击商品按钮
$("#cart_list_box").on("click",".select",function() { 
    var goods = $(this).parents(".shop_box").find(".select"); //获取本店铺的所有商品
    var goodsC = $(this).parents(".shop_box").find(".select:checked"); //获取本店铺所有被选中的商品
    var Shops = $(this).parents(".shop_box").find(".select-shop"); //获取本店铺的全选按钮
    if (goods.length == goodsC.length) { //如果选中的商品等于所有商品
      Shops.prop('checked', true); //店铺全选按钮被选中
      if ($(".select-shop").length == $(".select-shop:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
        $(".select-all").prop('checked', true); //全选按钮被选中
        TotalPrice();
      } else {
        $(".select-all").prop('checked', false); //else全选按钮不被选中 
        TotalPrice();
      }
    } else { //如果选中的商品不等于所有商品
      Shops.prop('checked', false); //店铺全选按钮不被选中
      $(".select-all").prop('checked', false); //全选按钮也不被选中
      TotalPrice();
    }
  });
  // 点击店铺按钮
  $("#cart_list_box").on("click",".select-shop",function() {
    if ($(this).prop("checked") == true) { //如果店铺按钮被选中
      $(this).parents(".shop_box").find(".select").prop('checked', true); //店铺内的所有商品按钮也被选中
     
      if ($(".select-shop").length == $(".select-shop:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
        $(".select-all").prop('checked', true); //全选按钮被选中
        TotalPrice();
      } else {
        $(".select-all").prop('checked', false); //else全选按钮不被选中
        TotalPrice();
      }
    } else { //如果店铺按钮不被选中
      $(this).parents(".shop_box").find(".select").prop('checked', false); //店铺内的所有商品也不被全选
      $(".select-all").prop('checked', false); //全选按钮也不被选中
    
      TotalPrice();
    }
  });
  // 点击全选按钮
  $(".select-all").click(function() {
    if ($(this).prop("checked") == true) { //如果全选按钮被选中
			$(".select-all").prop('checked', true); //所有按钮都被选中
			$(".select-shop").prop('checked', true);
      $(".select").prop('checked', true);
      
      TotalPrice();
    } else {
			$(".select-all").prop('checked', false); //else所有按钮不全选
			$(".select-shop").prop('checked', false);
      $(".select").prop('checked', false);
    
      TotalPrice();
    }
  });
  //价格
  function TotalPrice() {
    var allprice = 0; //总价
    $(".shop_box").each(function() { 
      var oprice = 0; //店铺总价
      $(this).find(".select").each(function() { 
        var num = parseInt($(this).parents(".order_content").find(".btn_book_minus").val()); 
        var price = parseFloat($(this).parents(".order_content").find(".th-price").text()); 
        var total = price * num; 
        $(this).parents(".order_content").find(".th-price-rig").text(total.toFixed(2));
        if ($(this).is(":checked")) {  
          oprice += total;
        };
        $(this).parents(".shop_box").find(".ShopTotal").text(oprice.toFixed(2));
      });
      var oneprice = parseFloat($(this).find(".ShopTotal").text()); 
      allprice += oneprice; 
    });
    $("#AllTotal").text(allprice.toFixed(2));
  };
  TotalPrice() ;
   // 数量减
   $("#cart_list_box").on("click",".minus",function() {
    var t = $(this).parent().find('.btn_book_minus');
    t.val(parseInt(t.val()) - 1);
    if (t.val() <= 1) {
      t.val(1);
    }
    TotalPrice();
  });
  // 数量加
  $("#cart_list_box").on("click",".plus",function() {
    var t = $(this).parent().find('.btn_book_minus');
    t.val(parseInt(t.val()) + 1);
    TotalPrice();
  });
  //点击删除
  $('.ALLdel').click(function(){
    $(".select:checked").each(function() { 
      var goods = $(this).parents(".shop_box").find(".select"); //获取本店铺的所有商品
      var goodsC = $(this).parents(".shop_box").find(".select:checked"); //获取本店铺所有被选中的商品
      var Shops = $(this).parents(".shop_box").find(".select-shop");  
        if (goods.length == goodsC.length) { 
           Shops.prop('checked', true);
           $(this).parents(".shop_box").remove();
           TotalPrice();
        } else { 
         $(this).parents('.order_content').remove(); 
           TotalPrice();
        };
    });
 });
 $('.del').click(function(){
   $(this).parents('.order_content').remove();
 });
 $.ajax({
	type:"post",
	url:"/pro/session",
	dataType:"json",
	success:function(result){
    var uid=result[0].uid;
 $.ajax({
  type:"get",
  url:"/product/inquery",
  dataType:"json",
  data:{uid:uid},
  success:function(result){
var arr=result.store;
var product=result.product;
var hash = {};
    arr = arr.reduce(function(item, next) {
        hash[next.sid] ? '' : hash[next.sid] = true && item.push(next);
        return item
    }, [])
for(var i=0;i<arr.length;i++){
  var $shop=$('<div class="shop_box" shop="'+arr[i].sid+'">'+'<div class="shop_name_tit">'+'<ul>'+'<li class="iconfont_cart"><input type="checkbox" class="select-shop"></li>'+
      '<li class="bold"><a href="">'+arr[i].shopname+'</a></li>'+'<li class="gray"><a href="">'+'</a></li></ul>'+
    '<div class="Shop_summary">本店小计：￥<span class="ShopTotal"></span></div></div></div>')
        $("#cart_list_box").append($shop)
};
for(var k=0;k<product.length;k++){
  var shop=parseInt(product[k].sid);
   if(product[k].sid==shop){
      var $car=$(
              '<div class="order_content"><ul><li class="iconfont_cart"><input type="checkbox" class="select"></li><li class="td_item">'+
              '<div class="cart_pic"><a href="book.kongfu.html?booksId='+product[k].pid+'"><img src="'+product[k].pic+'" alt=""></a></div>'+
              '<div class="text_box"><a href="book.kongfu.html?booksId='+product[k].pid+'">'+product[k].title+'</a></div></li>'+
            '<li class="th-pin">九品</li><li class="th-price">'+product[k].price+'</li>'+
            '<li class="th-num"><a href="javascript:;" class="minus">-</a><input type="text" value="1" class="btn_book_minus"><a href="javascript:;" class="plus">+</a></li>'+
            '<li class="th-price-rig"></li><li class="th-edit"><a href="javascript:;" class="del">删除</a></li></ul></div>');
            $("div[shop="+shop+"]").append($car); }   
    }
}
})
  }
 });