const express=require('express')
const router=express.Router()
const userRoutes=require('../controllers/userController.js')

router.route('/')
    .get(userRoutes.landingPage)

router.route('/login')
    .get(userRoutes.login)

router.route('/sendOtp')
    .post(userRoutes.sendOtp)

router.route('/signUpUser')
    .post(userRoutes.signUpUser)

router.route('/signInUser')
    .post(userRoutes.signInUser)

router.route('/chats/:id')
    .get(userRoutes.loadChat)

router.route('/sendForgotOtp')
    .post(userRoutes.sendForgotOtp)

router.route('/changePassword')
    .post(userRoutes.changePassword)

module.exports=router