const router= require('express').Router();
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('./verifyToken')
const {getallOrder,deleteOrder,createOrder,updateOrder,finduserorder,income}=require('../controller/order')

router.post('/',verifyToken,createOrder)
router.put('/:id', verifyTokenAndAdmin,updateOrder)
router.delete('/:id',verifyTokenAndAdmin,deleteOrder)
router.get("/find/:userId",verifyTokenAndAuthorization,finduserorder)
router.get('/',verifyTokenAndAdmin,getallOrder)
router.get('/income',verifyTokenAndAdmin,income)


module.exports=router;