const express=require('express')
const path=require('path')
const userRoutes=require('./routes/userRoutes')
const app=express()

app.set('view engine', 'ejs')
app.set('views', [path.join(__dirname,'views/user')])
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public/user')))

app.get('/', userRoutes)

app.listen(6969, ()=>{
    console.log('Server connected')
})