const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    DOB: { type: Date, required: true }, 
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phone: { type: Number, required: true, match: /^[0-9]{10}$/, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
});

SellerSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    try {
        const salt= await bcrypt.genSalt(10);
        console.log("Generated Salt:", salt);
        this.password = await bcrypt.hash(this.password);
        next();
    } catch (error) {
        console.log("Hashing Error:", error);
        next(error);
    }
});

const Seller = mongoose.model('Seller', SellerSchema, 'sellers');
module.exports = Seller;