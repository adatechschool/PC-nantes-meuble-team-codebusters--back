const mongoose = require("mongoose");
const Furniture = require("./models/Furniture.js");
const User = require("./models/User.js");
var bodyParser = require('body-parser')


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

const express = require("express");
const app = express();
const port = 3000;

app.get("/Furnitures", async (req, res) => {
  const request = req.query
  if(request.availability == "true"){
    const furnitures = await Furniture.find({availability:true})
    res.json(furnitures)
    }
 });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
