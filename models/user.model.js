const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
},{
    versionKey:false,
});
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});
const UserModel = mongoose.model("user",userSchema);
const ProductModel = mongoose.model("Product",productSchema);
module.exports = {UserModel,ProductModel};