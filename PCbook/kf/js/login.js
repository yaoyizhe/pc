$(".registBtn input").click(function(){
	var data={"uphone":$("#phone").val(),"upwd":$("#upwd").val()};
		$.ajax({
			type:"get",
			url:"/pro/login",
			dataType:"json",
			data:data,
			success:function(result){
		if(result==1){$('.alert').html('正在登陆').addClass('alert-success').show().delay(1500).fadeOut();
		window.setTimeout(function(){
			$('.alert').html('登陆成功').addClass('alert-success').show();
			location.href="../kongfu.html";},2000);
		}else{alert("账号出错")}
		}
		}).done().fail(function(){alert('网络不行，请求错误')})
	
});