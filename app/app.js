const express = require('express');
const dotenv=require('dotenv');
dotenv.config();
//const router=express.Router();
const user = require('./routes/userRoutes')
const product = require('./routes/productRoutes')
const order = require('./routes/orderRoutes')
const category = require('./routes/categoryRoutes')
const db=require('./db/db');
const app = express();
const port = 2002;
const host = "localhost";
const path=require('path');
const logger = require('./static/Scripts/logger');
db.connect();
app.use(express.static('./app/static'))
app.use(express.json());

app.use('/api/user',user);
app.use('/api/product',product);
app.use('/api/order',order);
app.use('/api/category',category);
app.use((err,req,res,next)=>{
    logger.error('somthing broke')

    res.status(500).send("somthing broke")
})
app.use((req,res)=>{
res.status(404).sendFile(path.join(__dirname,'static/404.html'))
});



app.listen(port,()=>{
    console.log(`server up your port is ${process.env.PORT}`);
    logger.info(`Server started and running on http://${host}:${port}`)
});