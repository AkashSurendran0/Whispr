const express=require('express')
const sendMail=require('../helpers/mailHelper')
const users=require('../model/userSchema')
const bcrypt=require('../helpers/bcrypt')

const landingPage = async (req,res)=>{
    try {
        res.render('landing')
    } catch (error) {
        console.log(error)
        res.send('error')
    }
}

const login = async (req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
        res.send('error')
    }
}

const sendOtp = async (req,res)=>{
    try {
        const email=req.body.email
        const user=await users.findOne({email:email})
        if(user) return res.json({success:false, message:'Looks like this user already exists'})
        const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(email.trim()=='') return res.json({success:false, message:'Email Required'})
        else if(!emailPattern.test(email)) return res.json({success:false, message:'Invalid Email'})
        
        const otp=generateOtp()
        await sendMail({
            from:'Whispr',
            to:email,
            subject:'Verification Mail',
            text:`Hi User,\n\nYour One-Time Password (OTP) for verification is: ${otp} .\n\n This OTP is valid for the next 1 minute.\n\n Please do not share this code with anyone for security reasons.\n\n If you did not request this, please ignore this email.\n\n Thank You, Whispr`
        })
        
        res.json({success:true, otp:otp, message:'Otp Send Successfully'})
    } catch (error) {
        console.log(error)
        res.send('error')
    }
}

function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000)
}

const signUpUser = async (req,res)=>{
    try {
        const {name, email, password}=req.body
        const hashedPass=await bcrypt.hashPassword(password)
        const data={
            name:name,
            email:email,
            password:hashedPass
        }
        try {
            await users.insertMany(data)
            res.json({success:true, message:'Whoo! Please login with new credentials'})
        } catch (error) {
            res.json({success:false, message:'Oops! looks like server issue. Please try after some time'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Oops! looks like some server error'})
    }
}

const signInUser = async (req,res)=>{
    try {
        const {email, password}=req.body
        const user=await users.findOne({email:email})
        if(!user) return res.json({success:false, message:'Invalid Credentails. Please try again'})
        const checkPass=await bcrypt.checkPass(password, user.password)
        if(!checkPass) return res.json({success:false, message:'Invalid Credentails. Please try again'})
        res.json({success:true, id:user._id})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Oops! looks like some server error'})
    }
}

const sendForgotOtp = async (req,res)=>{
    try {
        const {email}=req.body
        const user=await users.findOne({email:email})
        if(!user) return res.json({success:false, message:'Seems like the user doesnt exist'})
        const otp=generateOtp()
        await sendMail({
            from:'Whispr',
            to:email,
            subject:'Verification mail',
            text:`Hi User,\n\nYour One-Time Password (OTP) for verification is: ${otp} .\n\n This OTP is valid for the next 1 minute.\n\n Please do not share this code with anyone for security reasons.\n\n If you did not request this, please ignore this email.\n\n Thank You, Whispr`
        })
        res.json({success:true, otp:otp, message:'OTP send successfully'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Oops! Seems like server is busy'})
    }
}

const changePassword = async (req,res)=>{
    try {
        const {email, password}=req.body
        const hashedPass=await bcrypt.hashPassword(password)
        await users.updateOne(
            {email:email},
            {password:hashedPass}
        )
        res.json({success:true, message:'Password changed successfully'})
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    landingPage,
    login,
    sendOtp,
    signUpUser,
    signInUser,
    sendForgotOtp,
    changePassword
}