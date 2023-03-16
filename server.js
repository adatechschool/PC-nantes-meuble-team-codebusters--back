const mongoose = require("mongoose");
const Furniture = require("./models/Furniture.js");
const User = require("./models/User.js");

var bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
