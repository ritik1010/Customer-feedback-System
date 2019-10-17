const mongoose =require('mongoose')
const feedbackSchema=new mongoose.Schema({

age:{
    type:Number,
    required:true
},
annualIncome:{
    type:Number,

},
gender:{
    type:String,
    required:true
},
pincode:{
    type:Number
},
state:{
    type:String
},
city:{
    type:String
},

schemeName:{
    type:String,
    required:true
},
description:{
    type:String
    
},
rating:{
    type:String,
    required:true
}

},{timestamps:true})
const feedbacks=new mongoose.model('feedbacks',feedbackSchema)
module.exports=feedbacks