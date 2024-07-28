const express = require("express");
const {UserModel,ProductModel} = require("../models/user.model");
//const mongoose = require("mongoose");
const userRouter = express.Router();
const productRouter = express.Router();
userRouter.post("/create-user", async (req, res) => {
  const { userName, age, gender, email } = req.body;
  try {
    const userOne = UserModel.findOne({ email });
    if (userOne) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new UserModel({
      userName,
      age,
      gender,
      email,
    });
    await user.save();
    res.status(201).send("user created successfully");
  } catch (error) {
    res.status(404).send(`error in creating user : ${error}`);
  }
});
userRouter.get("/get-users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ message: "users fetched successfully", users });
  } catch (error) {
    res.status(404).send(`error fetching users:${error}`);
  }
});
userRouter.patch("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: id },
      req.body
    );
    res.status(200).json({ message: "updated successfully", updatedUser });
  } catch (error) {
    res.status(404).send(`error updating user ${error}`);
  }
});
userRouter.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndUpdate({ _id: id });
    res.status(200).json({ message: "deleted successfully", deletedUser });
  } catch (error) {
    res.status(404).send(`error in deleting user ${error}`);
  }
});
productRouter.post('/create-products', async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const product = new ProductModel({ name, description, price, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get all products
productRouter.get('/get-products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update a product
productRouter.patch('/update-product/:id', async (req, res) => {

  const {id }= req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate({_id:id},req.body);
   
    res.json(product);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a product
productRouter.delete('/delete-product/:id', async (req, res) => {
 const {id} = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete({_id:id});
    res.json({ msg: 'Product removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports ={userRouter,productRouter};
