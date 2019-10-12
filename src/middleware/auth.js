const jwt=require('jsonwebtoken')
const Users=require('../models/users')
const auth=async(req,res,next)=>{
    console.log('auth tried')
    try{
        console.log(req.body.email)
        const email=req.body.email
        const user=await Users.findOne({email:email})
        req.body.age=user.age
        req.body.city=user.city
        req.body.gender=user.gender
        req.body.state=user.state
        req.body.annualIncome="10000"
        req.body.user_id=user._id
        req.body.pincode=user.pincode
        if(!user){
            throw new Error()

        }
        console.log(req.body)
        next()
    }
    catch(e){
       res.send('Unauthorized User')

    }

}
module.exports=auth