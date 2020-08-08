const express=require('express');
const app=express();

const cors = require('cors');
app.use(cors({
  origin:'http://127.0.0.1:5500',
}));

app.use(express.static('./public'))

const proRouter=require('./routes/user.js');
const productRouter=require('./routes/product.js');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({
  extended:false
}));



app.use('/pro',proRouter);
app.use('/product',productRouter);

app.listen(8080);
