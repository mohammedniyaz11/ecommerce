const router= require('express').Router();
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('./verifyToken')
const {createCart,updateCart,getallcarts,deletecart,getUsercarts}=require('../controller/cart')

router.post('/',verifyTokenAndAuthorization,createCart)
router.put('/:id',verifyTokenAndAuthorization,updateCart)
router.get('/',verifyTokenAndAdmin,getallcarts)
router.delete('/:id',verifyTokenAndAuthorization,deletecart)
router.get('/find/:userId',verifyTokenAndAuthorization,getUsercarts)



module.exports=router;