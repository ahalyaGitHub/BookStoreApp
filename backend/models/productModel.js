const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    name: { type:String, required: true},
    author: { type: String, required: true},
    discription: {type: String, required: true},
    price: { type: String, required: true},
    postDate: {type: Date},
});

const Product = mongoose.model('Product', ProductSchema, 'products');
module.exports= Product;
