const express=require('express')
const Users=require('../models/users')
const router =new express.Router()
const passport=require('passport')
router.post('/users',async(req,res)=>{
   
    const user=new Users(req.body)
    
    try{
        
        await user.save()
        res.status(201).send({user})

    }
    catch(e){
        console.log(e)
        res.sendStatus(400).send(e)
    } 
})
// require('../config/passport')
router.post('/users/login',async(req,res)=>{

    try{console.log(req.body)
        const user=await Users.findByCredentials(req.body.email,req.body.password)
        
        const token=await user.generateAuthToken()

        res.status(200).send({user:user,token:token})


    }
    catch(e){
        
        console.log(e)
        res.status(200).send("Invalid password or username")
    }    
})
router.post('/users/logout',async(req,res)=>{
    console.log("log req")
    try{
        req.user.tokens= req.user.tokens.filter((token)=>{
                return token.token!==req.token
        })
        await req.user.save()
        res.send("logged out")
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})
router.post('/users/checkEmail',async(req,res)=>{
    try{
    
        const user=await Users.findOne({email:req.body.email})
        if(user==null){
            res.send({"availability":"true"})
        }
        else{
            res.send({"availability":"false"})
        }
    }
    catch(e){
        res.send(e)}
    
})


module.exports=router