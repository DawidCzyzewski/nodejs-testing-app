// It is my routing. Folder also could be named routes
const express = require("express");
const router = express.Router();
const Dog = require("../models/dog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// setting up dotenv
require("dotenv").config();
const secret = process.env.SECRET_JWT;
// const secret = "goitisawesome";

// console.log(secret);

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "bad request",
      message: "Incorrect login/password",
    });
  }
  // In payload I shouldn't send more info than is necessary, becouse it could be stolen, so informations like name, surname, pesel etc shhould be sent in anouther get with JWT not here
  const payload = {
    id: User.id,
  };
  // Option is for example expiresIn: "1h" or "1w" or "1m"
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  // And if everything is ok, return info
  return res.json({
    status: "success",
    code: 200,
    data: { token },
  });
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  // this also should be in another file. If I want to search by findOne, this in schema should be unique: true!
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      data: "conflict",
      message: "User already exist",
    });
  }
  // If there is no user (so I can register this one:)
  try {
    // here I don't save password! Firstly I need to encrypt this
    const newUser = new User({
      username,
      email,
      // when I want to have roles like admin etc
      // roles: []
    });
    // here is password encrypted by func setPassword from schema:
    newUser.setPassword(password);

    await newUser.save();

    res.json({
      status: "success",
      code: 201,
      // data: "good",
      // message: "User registered",
      data: {
        message: "Register complete!",
      },
    });
  } catch (error) {
    next(error);
  }
});

// I shouldn't do like this (function find in get). I should write other folder and for example service index.js and there functions
// I could add "auth" to check if I am checked 
router.get("/dogs", auth, async (req, res, next) => {
  const dogs = await Dog.find();
  res.json({
    status: "success",
    code: 200,
    data: { dogs: dogs || [] },
  });
});

module.exports = router;
