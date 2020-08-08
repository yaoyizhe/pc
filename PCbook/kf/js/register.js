$(function(){
	var ok1=false;
	var ok2=false;
	var ok3=false;
	var ok4=false;
  $("#uname").blur(function(){
		var $input=$(this);
		var $span=$input.next();
		var value=$input.val().trim();
		if(value==""||value==null){
			$span.html("用户名不能为空");
		}else if(value.length<2 || value.length>9){
			$span.html("用户名必须在2到9位之间");
		}else{
			$span.html("用户名输入正确");
			ok1= true;
		}
	});
	$("#upwd").blur(function(){
		var $input=$(this);
		var $span=$input.next();
		var value=$input.val().trim();
		if(value==""||value==null){
			$span.html("密码不能为空");
		}else if(/^\d{6,15}$/.test(value)){
			$span.html("密码强度低");
			ok2= true;
		}else if(/^[a-zA-Z]{6,15}$/.test(value)){
			$span.html("密码强度中");
			
		}else if(/^\w{6,15}$/.test(value)){
			$span.html("密码强度高");
	
		}else{
			$span.html("密码必须在6到15位之间");
		}
	});
	$("#upwdconfirm").blur(function(){
		var $input=$(this);
		var $span=$input.next();
		var value=$input.val().trim();
		var upwd=$("#upwd").val().trim();
		if(value==""||value==null){
			$span.html("确认密码不能为空");
		}else if(value!=upwd){
			$span.html("两次密码输入不正确");
			$input.val("");
		}else{
			$span.html("密码正确")
			ok3= true;
		}
	});
	$("#phone").blur(function(){
		var $input=$(this);
		var $span=$input.next();
		var value=$input.val().trim();
		if(/^1[3-9]\d{9}$/.test(value)){
			$span.html("手机号格式正确");
			ok4= true;
		}else{
			$span.html("手机号格式不正确");
		}
	});
$(".registBtn button").click(function(){
	if(ok1 && ok2 && ok3 && ok4){
		var data={uname:$("#uname").val(),uphone:$("#phone").val(),upwd:$("#upwd").val()};
		$.ajax({
			type:"post",
			url:"/pro/regist",
			dataType:"json",
			data:data,
			success:function(result){
			if(result==1){
				alert("手机号已存在");
			}else{alert("注册成功");}}
		});
	}
});
});