var OrderModel = require('../models/orderModel.js');

/**
 * orderController.js
 *
 * @description :: Server-side logic for managing orders.
 */
 module.exports.postOrder = async function (req, res,next) {
    const {user,products,sum,date } = req.body;
    let order =  new OrderModel({
        user,
       products,
       sum ,
       date
    })
    let newOrder;

    try{
        newOrder = await order.save();
        throw new Error()
    }
    catch(e){
        next(e);
    }
    console.log('inserted');
    
    res.send(newOrder);
}