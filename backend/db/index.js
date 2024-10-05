const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongoUrl } = require("../config");

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new Schema({
  username: {
    //USN
    type: String,
    required: true,
  },
  password: {
    //DOB
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

const adminSchema = new Schema({
  username: {
    //mailId
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { User, Admin };
