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

// allow CORS from all
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
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

app.post("/furnitures", async (req, res) => {
  const request = req.body;
  const furniture = new Furniture(request);
  await furniture.save();
  res.json(furniture);
});

// USER PART

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
