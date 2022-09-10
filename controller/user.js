const CryptoJs=require('crypto-js');

const User = require('../models/User');


module.exports.update=async(req,res)=>{
if(req.body.password){
    req.body.password=CryptoJs.AES.encrypt(
        req.body.password,
        process.env.JWT_SEC
    ).toString();
}
try{
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        $set:req.body

    },({new:true}))
    res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json({msg:err})

}

}
module.exports.deleted=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleted=await User.findByIdAndDelete(id)
        res.json("user is deleted") 

    }catch(err){
        res.status(500).json({msg:err})
    }

}

module.exports.getUser=async(req,res)=>{

    try{
      
        const {id}=req.params;
    
        const oneUSER=await User.findById(id)
        res.json(oneUSER) 

    }catch(err){
        res.status(500).json({msg:err})
    }

}


module.exports.allUser=async(req,res)=>{
    const query = req.query.new;

    try{
        const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    
      
     

    }catch(err){
        res.status(500).json({msg:err})
    }

}
//get usser stats
module.exports.stats=async(req,res)=>{
    const date=new Date();
    const lastyear=new Date(date.setFullYear(date.getFullYear()-1))
    try{
        
        
        const data=await User.aggregate([{$match:{createdAt:{$gte:lastyear}}},{$project:{month:{$month:"$createdAt"}}},{$group:{_id:"$month",total:{$sum:1}}}])
         res.json(data)
    }catch(err){
        res.status(500).json({msg:"json erorrr"})
    }



}




