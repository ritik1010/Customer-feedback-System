const feedbacks =require('../models/feedbacks')
const express=require('express')
const router=new express.Router()
const auth=require('../middleware/auth')
router.post('/feedbacks',auth,async (req,res)=>{
    const match={}
    
    const feedback=new feedbacks({
        ...req.body
    })
    try {
        await feedback.save()
        res.send(feedback)
    }
    catch(e){
        console.log(e)
        
        res.status(404).send()
    }
    return res.status(201).send(req.body.name)
})
router.get('/feedbacks/:scheme',async(req,res)=>{
    console.log("get feeedback")
    try{
        const feedback=await feedbacks.find({SchemeName:req.body.SchemeName})
        res.send(feedback)
        if(!feedback){
            return res.send(404).send()
        }
        
    }
    catch(e){
        res.status(500).send()
    }

})

module.exports=router