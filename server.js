const express=require('express')
const path=require('path')
const userRoutes=require('./routes/userRoutes')
const session=require('express-session')
const app=express()

app.use(session({
    secret:'Batman',
    saveUninitialized:false,
    resave:true,
    cookie:{
        maxAge: 86400000
    }
}))
app.set('view engine', 'ejs')
app.set('views', [path.join(__dirname,'views/user')])
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public/user')))

app.use('/', userRoutes)

app.listen(6969, ()=>{
    console.log('Server connected')
})