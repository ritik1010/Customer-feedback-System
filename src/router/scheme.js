const feedbacks =require('../models/scheme')
const express=require('express')
const multer=require('multer')
const upload=multer({
    limits:{
        fileSize:1000000,

    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Please upload images'))

        }
        // cb(new Error('Please upload only image'))
         cb(undefined,true)
        // cb(undefined,false)
    }
})
const router=new express.Router()
const auth=require('../middleware/auth')
const Schemes=require('../models/scheme')
const app=express()
router.get('/schemeDetails/:schemeName',async(req,res)=>{
    const name=req.params.schemeName
    console.log(name)
    const scheme= await Schemes.findOne({name})
    console.log(scheme)
    
    if(scheme){
        res.send(scheme)
        
    }
    else{
        res.status(404).send("NO scheme Found")
    }
})
router.get('/schemeImage/:schemeName',async(req,res)=>{
    try{
    const scheme= await Schemes.findOne({name:req.params.schemeName})
    if(!scheme||!scheme.image){
        throw new Error("No image Found")
    }
    res.set('Content-Type','image/jpg')
    res.send(scheme.image)

    }
    catch(e){

    }

})
router.post('/scheme',async(req,res)=>{
    const scheme=new Schemes(req.body)
    try{
        await scheme.save()
        res.send(scheme)
    }
    catch(e){
        res.status(400).send(e)

    }
    
})
router.post('/schemeImage/:schemeName',upload.single('image'),async(req,res)=>{
    const scheme= await Schemes.findOne({name:req.params.schemeName})
    if(scheme){
        scheme.image=req.file.buffer
        await scheme.save()
        res.send("File Uploaded")
    }
    else{
    res.status(404).send("File was not uploaded")}

})


module.exports=router