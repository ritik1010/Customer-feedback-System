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
    
    try{

        const feedback=await feedbacks.find({schemeName:req.params.schemeName}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip)).sort({createdAt:-1});
        

        
        if(!feedback){
            return res.send(404).send('No feedbacks Found')
        }
        res.send(feedback)
    }
    catch(e){
        res.status(500).send(e)
    }

})
router.get('/getFeedbacksByWord/:schemeName/:word',async (req,res)=>{
    try{
        const feedback=await feedbacks.find({schemeName:req.params.schemeName,description : {$regex: req.params.word, $options: "$i"}}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip)).sort({createdAt:-1})
        
        res.send(feedback)

    }
    catch(e){
        console.log(e)

        res.status(500).send(e)
    }
})

router.get('/getAverage',async (req,res)=>{
    const match={}
    if(req.query.schemeName){
        match.schemeName=req.query.schemeName

    }
    if(req.query.city){
        match.city=req.query.city
    }
    if(req.query.gender){
        match.gender=req.query.gender
    }
    if(req.query.state){
        match.gender=req.query.state
    }
    if(req.query.pincode){
        match.pincode=req.query.pincode
    }
    
    try{
        const feedback =await feedbacks.find(match,{_id:0,rating:1});
        var len=feedback.length
        var sum=0
        var i=0
        for( i=0;i<len;i++){
            sum+=parseInt(feedback[i].rating)}
        res.send({average:(sum/len)})
    }
    catch(e){
        
        res.status(400).send(e)
    }
})
module.exports=router