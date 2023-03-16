const Furniture = require("../models/Furniture.js");

exports.findFurnitures = async (req, res) => {
    const request = req.query;
    console.log(request);
    if (request != null) {
      res.json(await Furniture.find(request));
    } else {
      res.json(await Furniture.find());
    }
  }

exports.findUserFurnitures = async (req, res) => {
    //concept = "destructuring"
    const {userId} = req.headers.context
    const user = {userId : userId}
    res.status(200).json(await Furniture.find(user));
    
  }

exports.createFurniture = async (req, res) => {
    const furnitureParams = req.body;
  
    //console.log(req.headers.context)
    furnitureParams.userId = req.headers.context.userId
  
    if (furnitureParams.date == null) {
      // Si absence de date par l'utilisateur -> Date du jour par défaut 
      furnitureParams.date = new Date();
    }
    if (furnitureParams.price == null) {
      res.status(400).send("Merci d'indiquer un prix");
      return;
    }
    if (typeof furnitureParams.price != "number") {
      res.status(400).send("Indiquer un Nombre");
      return;
    }
    if (furnitureParams.category == null) {
      res.status(400).send("Merci d'indiquer une catégorie");
      return;
    }
    if (furnitureParams.type == null) {
      res.status(400).send("Merci d'indiquer un type");
      return;
    }
    if (furnitureParams.description == null) {
      res.status(400).send("Merci de décrire votre meuble");
      return;
    }
    if (furnitureParams.photos == null) {
      res.status(400).send("Merci de rajouter une photo");
      return;
    }
    // Passer la valeur de "availability" par défaut en false
    furnitureParams.availability = false;
  
    const furniture = new Furniture(furnitureParams);
    await furniture.save();
    res.json(furniture);
  }