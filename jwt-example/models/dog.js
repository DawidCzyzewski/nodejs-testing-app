const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// second way to create schema, first is model like in exp

const dogSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  age: Number,
  owner: { name: String },
});

// here with small letters:
const Dog = mongoose.model("dog", dogSchema);

module.exports = Dog;
