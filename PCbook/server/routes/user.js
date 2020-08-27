const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
let router=express.Router();
//1.登录模块
router.get("/login",(req,res)=>{
	var $uphone=req.query.uphone;
	var $upwd=req.query.upwd;
	pool.query('select * from kf_user where uphone=? and upwd=?',[$uphone,$upwd],(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});

router.post("/regist",(req,res)=>{
	let obj=req.body;
	pool.query('select * from kf_user where uphone=?',[obj.uphone],(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length>0){
			res.send("1");
		}else{
			pool.query('INSERT INTO kf_user SET ?',[obj],(err,result)=>{
			if(err) throw err;}); 
			res.send("0");
		};	
	});
});
module.exports=router;