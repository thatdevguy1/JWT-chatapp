const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

async function checkToken(req, res) {
  console.log("req.user -> ", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  //req.body = {email, password}
  try {
    //look in the database for a matching email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("No user found");
    //check if the password matches
    const matchedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!matchedPassword) throw new Error("Password incorrect");
    //if it does I want to create a token and respond with it
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = {
  checkToken,
  login,
  create,
};
