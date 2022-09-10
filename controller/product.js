const router= require('express').Router();
const Product = require('../models/Product');



//create product
module.exports.create=async(req,res)=>{
    const newproduct=new Product(req.body)
   
    try{
        const savedProduct=await newproduct.save()
        res.status(200).json(savedProduct)

    }catch(err){
        res.status(500).json({msg:err.message})
    }
    

}


module.exports.updateProdut=async(req,res)=>{
   
    try{
      const{id}=req.params
      const updateproduct=await Product.findByIdAndUpdate(id,req.body)

        res.status(200).json(updateproduct)

    }catch(err){
        res.status(500).json({msg:err.message})
    }
    

}


module.exports.deleteProduct=async(req,res)=>{
   
    try{
      const{id}=req.params
      const deleteProduct=await Product.findByIdAndDelete(id)

        res.status(200).json("your product is deleted")

    }catch(err){
        res.status(500).json({msg:err.message})
    }
    

}



module.exports.getAllproduct=async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    const title=req.query.title
   
    try{
        let products;

        if (qNew) {
          products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
          products = await Product.find({
            categories: {
              $in: [qCategory],
            },
          });
          
        }
        else if(title){
            products=await Product.find({title:req.query.title})
        }
        
        else {
          products = await Product.find();
        }
    
        res.status(200).json(products);

    }catch(err){
        res.status(500).json({msg:err.message})
    }
    

}





