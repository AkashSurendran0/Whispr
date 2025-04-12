const express=require('express')
const router=express.Router()
const userRoutes=require('../controllers/userController.js')
const chatRoutes=require('../controllers/chatController.js')

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

router.route('/sendForgotOtp')
    .post(userRoutes.sendForgotOtp)

router.route('/changePassword')
    .post(userRoutes.changePassword)

router.route('/chats/:id')
    .get(chatRoutes.loadChat)  

module.exports=router