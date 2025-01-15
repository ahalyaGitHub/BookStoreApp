const mongoose= required('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId:{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Product',
        required: true,
    },
    status: { type: String, enum: ['Ordered', 'Shipped', 'Delivered', 'Cancelled']},
    orderedDate:{ type: Date},
    shippedDate: { type: Date},
    deliveredDate: {type:Date},
    cancelledDate: { type:Date },
    cancelledReason: { type: String },
});

const Order = new mongoose.model('Order', OrderSchema, 'orders');
module.exports= Order;