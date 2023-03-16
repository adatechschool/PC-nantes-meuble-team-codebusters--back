// Import mongoose library
const mongoose = require("mongoose");
// Import file Furniture.js with schema of Furnitures
const Furniture = require("./models/Furniture.js");
// Imoprt file User.js with schema of Users
const User = require("./models/User.js");
const {auth, secret} = require("./middleware/auth.js")
const jwt = require('jwt-simple');

const userController = require("./controllers/userController.js")
const furnitureController = require("./controllers/furnitureController.js")

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
app.get("/furnitures", auth, furnitureController.findFurnitures);

app.get("/users/furnitures", auth, furnitureController.findUserFurnitures);

// Requête POST avec les conditions de non fonctionnement
app.post("/furnitures", auth, furnitureController.createFurniture);

 ///////////////// USER REQUESTS //////////////////////////
app.get("/users", userController.getAllUsers);

// Requête POST avec les conditions de non fonctionnement
app.post("/users", userController.createUser);

//login routes 
app.post('/login', userController.loginUser);

// Requête pour écouter le port et l'indiquer
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
