const Furniture = require("../models/Furniture.js");
const {auth, secret} = require("../middleware/auth")
const jwt = require('jwt-simple');
const { db } = require("../models/Furniture.js");


exports.findFurnitures = async (req, res) => {
    const request = req.query;
    console.log(request);
    if (request != null) {
      res.json(await Furniture.find(request));
    } else {
      res.json(await Furniture.find());
    }
  }

// On récupère les données d'un seul meuble grâce à son id.
exports.findOneFurniture = async (req, res) => {
  // Récupère le paramètre id de l'URL.
  const idFurniture = req.params;
    try{
      // On compare l'id de l'url et celui de la BDD et si ok on affiche le meuble;
      const furniture = await Furniture.findById(idFurniture);
      res.json(furniture);
    } catch(err) {
      res.status(400).send("Le meuble que vous recherchez n'existe pas.");
    };
}

// On récupère les meubles de l'utilisateur connecté.
exports.findUserFurnitures = async (req, res) => {
    //concept = "destructuring"
    const {userId} = req.headers.context
    const user = {userId : userId}
    res.status(200).json(await Furniture.find(user));
    
  }

// Formulaire de création d'un nouveau meuble
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


  // Suppression d'un meuble posté par l'utilisateur
  exports.deleteFurniture = async (req, res) => {
    const idFurniture = req.params;
      try{
        // On compare l'id de l'url et celui de la BDD et si ok on supprime le meuble;
        const furniture = await Furniture.deleteOne(idFurniture);
        res.json(furniture);
      } catch(err) {
        res.status(400).json({message: "La suppression n'a pas fonctionné"});
      };
  }

  // Modification d'un meuble posté par l'utilisateur
  exports.updateFurniture = async (req, res) => {
    const request = req.body;
    console.log(request)
    const idFurniture = req.params;
    console.log(idFurniture)
      try{
        // On compare l'id de l'url et celui de la BDD et si ok on modifie le meuble;
        const furniture = await Furniture.updateOne(idFurniture, request);
        res.json(furniture);
      } catch(err) {
        res.status(400).json({message: "La modification n'a pas fonctionné"});
      };
  }





  /////////////////// ADMINCONTROLLER ///////////////////////

  // Suppression d'un meuble posté par un utilisateur
  exports.adminDeleteFurniture = async (req, res) => {
    const idFurniture = req.params;
      try{
        // On compare l'id de l'url et celui de la BDD et si ok on supprime le meuble;
        const furniture = await Furniture.deleteOne(idFurniture);
        res.json(furniture);
      } catch(err) {
        res.status(400).json({message: "La suppression n'a pas fonctionné"});
      };
  }

  // Modification d'un meuble posté par un utilisateur
  exports.adminUpdateFurniture = async (req, res) => {
    const request = req.body;
    const idFurniture = req.params;
      try{
        // On compare l'id de l'url et celui de la BDD et si ok on modifie le meuble;
        const furniture = await Furniture.updateOne(idFurniture, request);
        res.json(furniture);
      } catch(err) {
        res.status(400).json({message: "La modification n'a pas fonctionné"});
      };
  }