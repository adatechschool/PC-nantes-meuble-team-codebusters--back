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
  console.log(request)
  if (request != null) {
  res.json(await Furniture.find(request));
  } else {
    res.json(await Furniture.find());
  }
});

app.post("/furnitures", async (req, res) => {
  const request = req.body;
  const furniture = new Furniture(request);
  if (request.date == null){
    request.date = 25
  }else if (request.price == null) {
    res.send("Merci d'indiquer un prix")
  } else if (request.price == NaN){
    res.send("Merci d'indiquer un prix valide")
  }
  await furniture.save();
  res.json(furniture); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
