const Users = require("../model/user");
const generateToken = require("../utils/generateToken");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json("Invalid email or password !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.registerUser = async (req, res) => {
  try {
    const userExists = await Users.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json("User already exists !");
    }

    const user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json("Invalid user data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};
