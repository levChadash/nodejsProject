var ProductModel = require('../models/productModel.js');
const { ObjectId } = require('mongodb');
/**
 * productController.js
 *
 * @description :: Server-side logic for managing products.
 */
// module.exports.getOneProduct = async function (req, res) {
//     const id=req.params.id;
//     const product = await ProductModel.findById(ObjectId(id));
//     res.send(product);
// }


module.exports.getAllProducts = async function (req, res) {
    const products = await ProductModel.find();
    res.send(products);
}

module.exports.getByCategoriesId = async function (req, res) {
    const ids=Object.values(req.query)
    let products=[];
    for(const id of ids){
            const p=await ProductModel.find({
            category:id
        });
        p.forEach(p=>products.push(p))
    };
    res.send(products);
}

module.exports.postProduct = async function (req, res) {
    const {name,description,price,category,image} = req.body;
    let product=  new ProductModel({
        name,
	    description,
    	price,
    	category,
    	image
    })
    let newProduct;
    try{
        newProduct = await product.save();
    }
    catch{
        console.error('error while data insert')
        throw new Error();
    }
    console.log('inserted');
    
  //  const u = await db.getDB().collection('users').insertOne(user);
    res.send(`add category "${newProduct.name}" by id ${newProduct._id}`);
}

