const express=require('express')
const router=express.Router()
const userRoutes=require('../controllers/userController.js')

router.route('/')
    .get(userRoutes.landingPage)

module.exports=router