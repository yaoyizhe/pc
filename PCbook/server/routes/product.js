const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
let router=express.Router();
router.get("/search",(req,res)=>{
	pool.query('select * from kf_product ',(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
router.get("/detail",(req,res)=>{
	var $pid=req.query.pid;
	pool.query('select * from kf_product where pid=?',[$pid],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//加入购物车
router.post("/insert",(req,res)=>{
	let obj=req.body;
	pool.query('INSERT INTO kf_car SET ?',[obj],(err,result)=>{
	if(err) throw err;
	res.send(result);
}); 
});
router.get("/inquery",(req,res)=>{
	var $uid=req.query.uid;
	pool.query('select s.sid,s.shopname from kf_store as s inner join kf_car as c on s.sid=c.sid where c.uid=? ',[$uid],(err,result)=>{
		if(err) throw err;
		store=result;
	});
	pool.query('select p.pid,p.title,p.author,p.pic,p.price,p.sid from kf_product as p inner join kf_car as c on p.pid=c.pid where c.uid=? ',[$uid],(err,result)=>{
		if(err) throw err;
		res.send({message:'查询成功',code:200,product:result,store:store});
	});
});
router.get("/class",(req,res)=>{
	var $id=req.query.id;
	var $count=parseInt(req.query.count);
	var $pno=parseInt(req.query.pno);
	let start=($pno-1)*$count;
	pool.query('select * from kf_product where id=? LIMIT ?,?',[$id,start,$count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});	
});
router.get("/contont",(req,res)=>{
	var $id=req.query.id;
	pool.query('select count (*) as kkk from kf_product where id=? ',[$id],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
module.exports=router;