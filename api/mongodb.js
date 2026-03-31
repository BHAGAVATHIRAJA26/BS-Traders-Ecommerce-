const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  useremail: String,
  password: String,
  gender: String,
  phone: String,
  aphone: String,
  address: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  url: String,
  public_id: String,
  desc: String,
  cos: Number,
  dis: Number,
  nop: Number,
  mob: Number,
});

const tdataSchema = new mongoose.Schema({
  uid: String,
  url: String,
  desc: String,
  cos: Number,
  dis: Number,
});

const Users = mongoose.model("usernames", userSchema);
const Products = mongoose.model("products", productSchema);
const tdata = mongoose.model("tdatas", tdataSchema);

module.exports = { Users, Products, tdata };
