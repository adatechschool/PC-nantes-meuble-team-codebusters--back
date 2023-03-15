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
  await furniture.save();
  res.json(furniture);
});

app.get("/users", async (req, res) => {
  const request = req.query;
  if (request != null) {
  res.json(await User.find(request));
  } else {
    res.json(await User.find());
  }
});

app.post("/users", async (req, res) => {
  const request = req.body;
  const user = new User(request);
  await user.save();
  res.status(200).json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
