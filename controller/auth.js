const User=require('../models/User')
const CryptoJs=require('crypto-js')
const jwt=require('jsonwebtoken')

module.exports.userLogin=async(req,res)=>{


  try{
      const user=await User.findOne({email:req.body.email})
      if(!user){
          res.status(401).json("this mailis not loginded")
      }
      else
{     
          const hashedPassword=CryptoJs.AES.decrypt(user.password,process.env.PASS_SEC)
          const Originalpassword=hashedPassword.toString(CryptoJs.enc.Utf8)
          if(Originalpassword!=req.body.password){
              res.json("the password is incorrect")
          }else{
              const accessToken=jwt.sign({
                  id:user._id,
                  isAdmin:user.isAdmin,

              },process.env.JWT_SEC,{expiresIn:"3d"})
              const {password,...others}=user._doc
              res.json({others,h:accessToken})
          }
}

i

      


  }catch(err){
      res.status(500).json({msg:err})
  }
}

//regiester
module.exports.userReg=async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJs.AES.encrypt(req.body.password,process.env.PASS_SEC),
      
    })
try{
const user = await newUser.save()
console.log(user)
res.json(user)
}catch(err){
    res.status(400).json({msg:err.message})
}
    
   
}