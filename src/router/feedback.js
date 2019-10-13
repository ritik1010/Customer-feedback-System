const feedbacks =require('../models/feedbacks')
const express=require('express')
const router=new express.Router()
const auth=require('../middleware/auth')
router.post('/feedbacks',async (req,res)=>{
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
router.get('/feedbacks/:schemeName',async(req,res)=>{
    console.log(req.params.schemeName)
    try{
        const feedback=await feedbacks.find({schemeName:req.params.schemeName})

        
        if(!feedback){
            return res.send(404).send('No feedbacks Found')
        }
        res.send(feedback)
    }
    catch(e){
        res.status(500).send(e)
    }

})

module.exports=router