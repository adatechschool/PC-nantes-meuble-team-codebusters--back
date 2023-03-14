const mongoose = require("mongoose");
const Kitten = require("./models/Kitten.js");
const User = require("./models/User.js");

mongoose
  .connect(
    "mongodb+srv://codebusters:MdpBidon@codebusters.b64gatj.mongodb.net/codeBuster?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Mongoose connected");
    const juliette = new User({
      name : "Juliette",
      email : "juliette@ada.com",
      password : "clovis"
    })
    juliette.save()
  })
  .catch((err) => {
    console.error(err);
  });

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
