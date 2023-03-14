const mongoose = require ('mongoose')

const furnitureSchema = new mongoose.Schema({
    date: Date,
    category: Object,
    price: Number,
    photos: Array,
    description: Object,
    availability: Boolean,
});
const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture
