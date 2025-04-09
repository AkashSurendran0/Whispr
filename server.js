const express=require('express')
const path=require('path')
const userRoutes=require('./routes/userRoutes')
const session=require('express-session')
const app=express()
const env=require('dotenv').config()
const nocache=require('nocache')

app.use(session({
    secret:'Batman',
    saveUninitialized:false,
    resave:true,
    cookie:{
        maxAge: 86400000
    }
}))
app.use(express.json())
app.use(nocache())
app.set('view engine', 'ejs')
app.set('views', [path.join(__dirname,'views/user')])
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public/user')))

app.use('/', userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server connected')
})