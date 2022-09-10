const express=require('express')
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')
const productRoute=require('./routes/product')
const cartRoute=require('./routes/cart')
const orderRoute=require('./routes/order')

dotenv.config()
app.use(express.json())

mongoose.connect( process.env.MONGO_URL, );
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use('/api/user',authRoute)
app.use('/api/auth',userRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)











app.listen(process.env.PORT||5000,(req,res)=>{
    console.log("the port is running ")
})
