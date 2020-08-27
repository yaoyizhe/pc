const express=require('express');
const app=express();

const cors = require('cors');
app.use(cors({
  origin:'http://127.0.0.1:5500',
}));

app.use(express.static('./public'))


const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({
  extended:false
}));

const proRouter=require('./routes/user.js');
app.use('/pro',proRouter);

const productRouter=require('./routes/product.js');
app.use('/product',productRouter);

app.listen(8080);

app.use((err,req,res,next)=>{
  res.status(500)
  res.send({
    code:500,
    msg:'Sorry! Server tmp error! Please retry later!',
    err:err
  })
})
