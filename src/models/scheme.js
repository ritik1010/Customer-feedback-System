const mongoose=require('mongoose')

const schemeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    eligibilty:{
        type:String
    },
    short_discription:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true,

    },
    departmentName:{
        type:String,
        required:true,

    },
    image:{
        type:Buffer

    },
    age_lr:{
        type:Number,
        required:true},
    age_ur:{
        type:Number,
        required:true
    },
    gov_res:{
        type:String,
        required:true
    },
    area_served:{
        type:String,
        required:true
    },
    keywords:{
        type:String,
        required:true
    }
    
})
schemeSchema.methods.toJSON= function(){
    const scheme=this
    const schemeObject=scheme.toObject()
    delete schemeObject.image
    delete schemeObject.keywords
   
    
    return schemeObject
}
const Schemes=mongoose.model('Schemes',schemeSchema)
module.exports=Schemes