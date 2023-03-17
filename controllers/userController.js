const User = require("../models/User.js");


exports.getAllUsers = async (req, res) => {
 const request = req.query;
  if (request != null) {
    res.json(await User.find(request));
  } else {
    res.json(await User.find());
  }
};

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
      const token = jwt.encode(context, secret)
      console.log(token)
      res.json({ token });
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