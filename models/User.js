// Importation de la bibliothèque mongoose
const mongoose = require ('mongoose');

//  ???? 
const { boolean } = require('webidl-conversions');

// Création d'un nouveau schéma User avec les paramètres associés et le type de chaque paramètre 
const userSchema = new mongoose.Schema({
  name: String,
  email : String,
  password : String,
  rights: Boolean,
});
// Instanciation du nouveau schéma
const User = mongoose.model('User', userSchema);

// Export du schéma pour l'utiliser dans d'autres fichiers
module.exports = User