const express = require("express");
const router = express.Router();
// If I want to use mongoose, I must have:
const mongoose = require("mongoose");
// Add this to create JWT
const jwt = require("jsonwebtoken");

// Connection to base should be in app.js but I will do it here to see whole work with mongoose
require("dotenv").config();
const uriDb = process.env.DB_HOST;
// const connection = mongoose.connect(uriDb);
const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.then(() => {
  console.log("connected to MongoDB!");
});

const dogs = [];

// Connection to dogs base and expected types of input
//   const dogs = new mongoose.model("dogs", {
//     name: String,
//     age: Number,
//     owner: {
//       name: String,
//       favourites: [String],
//       birthday: Date,
//       hasMoreDogs: Boolean,
//     },
//   });

//   res.json(dogs);

// even if I write name of base not exacly or with error, it will found the nearest to it or will create new one:
// So instead of this bad writed ("Dog", {...} program will use created "dogs"
const Dog = new mongoose.model("Dog", {
  // If I want to have validation, instead of type I must put object with type and other things:
  // I can put it in other place, creating (EXAMPLE: const dogs = new Schema({
  //     name: String,
  //     age: Number
  // })) and put it as secong argument in model ("Dog", dogs) but this ver with object including all is now better:
  name: {
    type: String,
    unique: true,
    index: 1,
    minLength: 2,
    maxLength: 20,
    required: [true, "Message to show if failed. NAME IS REQUIRED"],
  },
  age: { type: Number, minLength: 30, maxLength: 700 },
  owner: {
    name: String,
    favourites: [String],
    birthday: Date,
    hasMoreDogs: Boolean,
  },
});

// There is also something like prevalidate and I can in it check if some of inputs are like I want:
// const Some = new Schema({ ... })
// Some.pre("validate", (next) => {
//     ...
// })

// In schema I can also add methods, like create fullname from two elements of object:
// const user = new Schema({
//   firstName: String,
//   laseName: String,
// });

// user.methods.fullName = function () {
//   return `${this.firstName} ${this.lastName}`;
// };

/* GET dogs listing. */
router.get("/", function (req, res, next) {
  // In payload I shouldn't have any info except id becouse it can be hacked
  const payload = {
    id: 1,
    name: "Dawid",
    year: 1992,
  };

  // Here I create secret. Of course normally I mustn't write it here, but it is for train
  const secret = "nodejs8";

  // now I create token. As last argument I can give info about algorithm what I used, now I don't want it:
  const token = jwt.sign(payload, secret);

  //  I can check my token: After I send my token, I can verify if it is good when it back from frontend
  const verify = jwt.verify(token, secret);

  // I can also decode token. Here I can put also clear token. It will decode but not check authenticy of token:
  // const decode = jwt.decode(token);
  const decode = jwt.decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRhd2lkIiwieWVhciI6MTk5MiwiaWF0IjoxNjg2NzU3ODcxfQ.GHBzak5tWdVmvopeOcQJoDvOQ73OsLii4nDvv4jBR0Y"
  );

  // now localhost:3000/dogs will return token
  res.json({ token, verify, decode });

  // res.json(dogs);
});

// There is also something like passport-jwt library to use with json. It depends of configure strategy JWT (konspekt)
// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const User = require('../schemas/user');
// require('dotenv').config();
// const secret = process.env.SECRET;

// const ExtractJWT = passportJWT.ExtractJwt;
// const Strategy = passportJWT.Strategy;
// const params = {
//   secretOrKey: secret,
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// };

// // JWT Strategy
// passport.use(
//   new Strategy(params, function (payload, done) {
//     User.find({ _id: payload.id })
//       .then(([user]) => {
//         if (!user) {
//           return done(new Error('User not found'));
//         }
//         return done(null, user);
//       })
//       .catch(err => done(err));
//   }),
// );

// I can use also passport library. It is something else than passport-jwt

// I should have things like adding dog as POST not GET, but now it would be better to not opening Postman or sth, just getting it in browser by link
router.get("/add", function (req, res, next) {
  const dog = new Dog({
    name: "Kunegunda",
    age: 40,
    owner: {
      name: "Kate",
    },
  });

  const result = dog.save().then((response) => {
    console.log("Pies zapisany do bazy", response);
    res.json(response);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const dog = dogs.filter((us) => us.id === id);

  res.status(200).json(dog);
});

module.exports = router;
