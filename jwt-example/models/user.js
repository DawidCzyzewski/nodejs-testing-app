const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

// add backcypting password. Instead of saving password of my user in my database, I want to encrypt this and then save
userSchema.methods.setPassword = function (password) {
  // bCrypt has build in function genSaltSync to generate salt
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(5));
};

// this is to compare (check) password
userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

// here small letters:
const User = mongoose.model("user", userSchema);

module.exports = User;
