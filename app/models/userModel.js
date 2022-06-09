let mongoose=require('mongoose');
const Schema=mongoose.Schema;
//let addressSchema=require('./address')
// const addressSchema=new Schema({
//     city:String,
//     street:String,
//     houseNum:Number
// })

const userSchema = new Schema({
    firstName:String,
    lastName:String,

    email:{
        type:String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        minLength:3
    },
    
})
userSchema.virtual('orders',{
    ref:'order',
    localField:'_id',
    foreignField:'user'
})

userSchema.set('toJSON',{virtuals:true});
module.exports=mongoose.model('User',userSchema)
