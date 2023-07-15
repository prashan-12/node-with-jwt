const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    userId: { type: mongoose.Types.ObjectId, required: true }
},{ timestamps: true });

module.exports = mongoose.model('products', productSchema);