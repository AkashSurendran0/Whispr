const express=require('express')

const landingPage = async (req,res)=>{
    try {
        res.render('landing')
    } catch (err) {
        res.send('error')
    }
}

module.exports={
    landingPage
}