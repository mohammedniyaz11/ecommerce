const router= require('express').Router();
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('./verifyToken')
const {update,deleted,getUser,allUser,stats}=require('../controller/user');

const User = require('../models/User');


router.put('/:id',verifyTokenAndAuthorization,update)


router.delete('/:id',verifyTokenAndAdmin,deleted)
router.get('/find/:id',verifyTokenAndAdmin,getUser)
router.get('/alluser',verifyTokenAndAdmin,allUser)
router.get('/stats',verifyTokenAndAdmin,stats)



module.exports=router;