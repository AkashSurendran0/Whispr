const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        default: null
    }
})

const users=new mongoose.model('users', userSchema)

module.exports=users