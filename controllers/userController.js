const express=require('express')
const sendMail=require('../helpers/mailHelper')

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

module.exports={
    landingPage,
    login,
    sendOtp
}