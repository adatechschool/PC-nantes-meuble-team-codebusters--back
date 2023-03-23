const User = require("../models/User.js");
const jwt = require('jwt-simple');
const {auth, secret} = require("../middleware/auth.js")



exports.getAllUsers = async (req, res) => {
 const request = req.query;
  if (request != null) {
    res.json(await User.find(request));
  } else {
    res.json(await User.find());
  }
};

// On récupère les données d'un seul utilisateur grâce à son id.
exports.getOneUser = async (req, res) => {
  // Récupère le paramètre id de l'URL.
  const idOneUser = req.params.id;
    try{
      // On compare l'id de l'url et celui de la BDD et si ok on affiche l'utilisateur;
      const OneUser = await User.findById(idOneUser);
      res.json(OneUser);
    } catch(err) {
      res.status(400).send("Ce profil n'existe pas.");
    };
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const isPasswordValid = user.password === password;
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const context = {userId : user._id, email : user.email}
      const rights = {rights : user.rights}
      const token = jwt.encode(context, secret)
      
      res.json({ token, rights });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

exports.createUser = async (req, res) => {
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
  }