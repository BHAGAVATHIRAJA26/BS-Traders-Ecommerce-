import mongoose from "mongoose";

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

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);

export const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export const tdata =
  mongoose.models.tdata || mongoose.model("tdata", tdataSchema);
