const express=require('express')
const users=require('../model/userSchema')

const loadChat = async (req,res) =>{
    try {
        res.render('chats')
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    loadChat,
}