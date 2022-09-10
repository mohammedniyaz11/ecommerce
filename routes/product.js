const router= require('express').Router();
const {create,updateProdut,deleteProduct,getAllproduct}=require('../controller/product')
const {verifyTokenAndAdmin, verifyTokenAndAuthorization}=require('./verifyToken')


router.post('/',verifyTokenAndAdmin,create)
router.put('/:id',verifyTokenAndAdmin,updateProdut)
router.delete('/:id',verifyTokenAndAdmin,deleteProduct)
router.get('/',verifyTokenAndAdmin,getAllproduct)




module.exports=router;