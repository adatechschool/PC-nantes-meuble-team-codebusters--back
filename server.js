// Import mongoose library
const mongoose = require("mongoose");
// Import file Furniture.js with schema of Furnitures
const Furniture = require("./models/Furniture.js");
// Imoprt file User.js with schema of Users
const User = require("./models/User.js");

// Permet d'envoyer la requête dans le body 
var bodyParser = require("body-parser");
// Import express library and start instance
const express = require("express");
const app = express();
const port = 3000;
// Convert bodyParser on json format 
app.use(bodyParser.json());
//  ???? 
app.use(bodyParser.urlencoded({ extended: false }));

// create connexion with MongoDB
mongoose
  .connect(
    "mongodb+srv://codebusters:MdpBidon@codebusters.b64gatj.mongodb.net/codeBuster?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.error(err);
  });

// allow CORS from all
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

////////////////// FURNITURES REQUESTS //////////////////////////
app.get("/furnitures", async (req, res) => {
  const request = req.query;
  console.log(request);
  if (request != null) {
    res.json(await Furniture.find(request));
  } else {
    res.json(await Furniture.find());
  }
});

// Requête POST avec les conditions de non fonctionnement
app.post("/furnitures", async (req, res) => {
  const request = req.body;

  if (request.date == null) {
    // Si absence de date par l'utilisateur -> Date du jour par défaut 
    request.date = new Date();
  }
  if (request.price == null) {
    res.status(400).send("Merci d'indiquer un prix");
    return;
  }
  if (typeof request.price != "number") {
    res.status(400).send("Indiquer un Nombre");
    return;
  }
  if (request.category == null) {
    res.status(400).send("Merci d'indiquer une catégorie");
    return;
  }
  if (request.type == null) {
    res.status(400).send("Merci d'indiquer un type");
    return;
  }
  if (request.description == null) {
    res.status(400).send("Merci de décrire votre meuble");
    return;
  }
  if (request.photos == null) {
    res.status(400).send("Merci de rajouter une photo");
    return;
  }
  // Passer la valeur de "availability" par défaut en false
  request.availability = false;

  const furniture = new Furniture(request);
  await furniture.save();
  res.json(furniture);
});

 ///////////////// USER REQUESTS //////////////////////////

app.get("/users", async (req, res) => {
  const request = req.query;
  if (request != null) {
    res.json(await User.find(request));
  } else {
    res.json(await User.find());
  }
});

// Requête POST avec les conditions de non fonctionnement
app.post("/users", async (req, res) => {
  const request = req.body;
  if (request.name == null) {
    res.status(400).send("Merci de remplir le nom");
    return;
  }
  if (request.email == null) {
    res.status(400).send("Merci de remplir l'email");
    return;
  }
  if (request.password == null) {
    res.status(400).send("Merci de remplir le password");
    return;
  }

  // Rights mis en false par défaut
  request.rights = false;

  const user = new User(request);
  await user.save();
  res.status(200).json(user);
});

// Requête pour écouter le port et l'indiquer
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
