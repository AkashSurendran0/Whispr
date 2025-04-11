const mongoose=require('mongoose')
const env=require('dotenv').config()

const dbConnect = async () =>{
    try {
        mongoose.connect(process.env.CONNECT_DB)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('MongoDb connection failed', error)
    }
}

module.exports=dbConnect