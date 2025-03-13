const express=require('express')

const landingPage = async (req,res)=>{
    try {
        res.render('landing')
    } catch (err) {
        res.send('error')
    }
}

const login = async (req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        res.send('error')
    }
}

module.exports={
    landingPage,
    login
}