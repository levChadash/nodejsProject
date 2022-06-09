const { ObjectId } = require('mongodb');
const db = require('../db/db');
const { $where } = require('../models/userModel');
const User=require('../models/userModel')
//const Address=require('../models/address')
module.exports.getOneUser = async function (req, res) {
    const id=req.params.id;
    const user = await User.findById(ObjectId(id)).populate('orders');
    res.send(user);
}
module.exports.logInUser = async function (req, res) {
    const email=req.params.email;
    const password=req.params.password;
    const user = await User.findOne({email:email,password:password});
    res.send(user);
}
module.exports.getAllUsers = async function (req, res) {
    const users = await User.find();
    res.send(users);
}

module.exports.postUser = async function (req, res,next) {
    const {firstName,lastName,email,password } = req.body;
    let user=  new User({
        firstName,
        lastName,
        email,
        password
        
    })
    let newUser;
    try{
        newUser = await user.save();
    }
    catch(e){
     next(e)
     res.send(e);
        // throw new Error();
    }
    console.log('inserted');
    
  //  const u = await db.getDB().collection('users').insertOne(user);
    res.send(newUser);
}

module.exports.putUser = async function (req, res) {
    const {firstName,lastName,email,password} = req.body;
    let user= {$set:{
        firstName,
        lastName,
        email,
        password
        
    }}
    let id1=req.params.id;
    const nid = await User.updateOne({_id:id1},user);
    res.send(`update user "${user.$set.name}" by id ${id1}`);
}

module.exports.deleteUser = async function (req, res) {
    let id1=req.params.id;
    const nid = await User.deleteOne({_id:ObjectId(id1)});
    res.send(`delete user id ${id1}`);

}