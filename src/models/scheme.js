const mongoose=require('mongoose')

const schemeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
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
    }
    
})
const Schemes=mongoose.model('Schemes',schemeSchema)
module.exports=Schemes