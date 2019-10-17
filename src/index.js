const express =require('express')
const feedbackRouter=require('../src/router/feedback')
const userRouter=require('../src/router/user')
// const ejs=require('ejs')
const auth=require('../src/middleware/auth')
const bodyparser=require('body-parser')
const schemeRouter=require('./router/scheme')
const port= process.env.PORT||3000
const path = require('path')
const multer=require('multer')

const passport=require('../src/config/passport')
const pubdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
require('./db/mongoose')
const app=express()
const partialspath=path.join(__dirname,'../templates/partials')
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// })
app.use(express.static(pubdir))
// app.set('view engine','html')

app.use(bodyparser.json())
app.use(schemeRouter)
app.use(feedbackRouter)
app.use(userRouter)
app.get("/home",async(req,res)=>{
    res.sendFile(path.join(__dirname,'templates/views/home.html'))
})

app.get("/login",async(req,res)=>{
    res.sendFile(path.join(__dirname,'templates/views/login.html'))
})
app.get("/homepage",async(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/views/homepage.html"))
})
app.get("/register",async(req,res)=>{
    res.sendFile(path.join(__dirname,'/templates/views/home.html'))
})
app.get('/signup',async(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/views/signup.html"))
})
app.get('/submitFeedback/:schemeName',auth,async(req,res)=>{
    response.set('location', '/submitFeedback');
    response.status(301).send()
})
app.get('/hi',async(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/views/agri.html"))
})
app.listen(port,()=>{
    console.log('server is up on port '+port)

})
