// Importation de la bibliothèque mongoose
const mongoose = require ('mongoose')

// Création d'un nouveau schéma Furnitures avec les paramètres associés et le type de chaque paramètre 
const furnitureSchema = new mongoose.Schema({
    date: Date,
    category: String,
    type: String,
    price: Number,
    photos: Array,
    description: Array,
    availability: Boolean,
});
// Instanciation du nouveau schéma
const Furniture = mongoose.model('Furniture', furnitureSchema);

// Export du schéma pour l'utiliser dans d'autres fichiers
module.exports = Furniture
