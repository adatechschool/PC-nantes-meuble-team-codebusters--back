const mongoose = require ('mongoose')

const furnitureSchema = new mongoose.Schema({
    date: Date,
    category_id: Array,
    price: Number,
    photos: Array,
    description: Object,
    availability: Boolean,
});
const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture
