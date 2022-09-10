const router= require('express').Router();
const  CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const{midllewareforemail,midllewereforpassword}=require('../routes/verifyToken')


const {userLogin,userReg}=require('../controller/auth')

router.post('/userReg',midllewereforpassword,userReg)
router.post('/userlogin',userLogin)




module.exports=router;







