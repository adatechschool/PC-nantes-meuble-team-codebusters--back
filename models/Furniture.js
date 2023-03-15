const mongoose = require ('mongoose')

const furnitureSchema = new mongoose.Schema({
    date: Date,
    category: String,
    type: String,
    price: Number,
    photos: Array,
    description: Array,
    availability: Boolean,
});
const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture
