const { ObjectId } = require('mongodb');
const db = require('../db/db');
var Category = require('../models/categoryModel');

/**
 * categoryController.js
 *
 * @description :: Server-side logic for managing categorys.
 */
 module.exports.getOneCategory = async function (req, res) {
    const id=req.params.id;
    const category = await Category.findById(ObjectId(id));
    res.send(category);
}


module.exports.getAllCategories = async function (req, res) {
    const categories = await Category.find();
    res.send(categories);//
}


module.exports.postCategory = async function (req, res,next) {
    const {name}  =  req.body;
    let category=  new Category({
        name 
    })
    let newCategory;
    try{
        newCategory = await category.save();
    }
    catch(e){
        console.error('error while data insert')
        next(e)   
 }
    console.log('inserted');
    
  //  const u = await db.getDB().collection('users').insertOne(user);
    res.send(`add category "${newCategory.name}" by id ${newCategory._id}`);
}


