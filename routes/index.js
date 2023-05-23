const express = require("express");
const router = express();
const { User, Departments, Products } = require("../models/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User
router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password, gender, user_type } =
      req.body;
    // Check if user with the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      gender,
      user_type,
    });

    await user.save();

    // Create and sign a JWT token
    const token = jwt.sign(
      { user_type: user_type, userId: user.id },
      "mysecretkey"
    );

    res.status(201).json({
      user_type: user.user_type,
      token: token,
      userId: user.id,
      userName: user.first_name + " " + user.last_name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message ?? "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { userId: user._id, user_type: user.user_type },
      "mysecretkey"
    );

    res.status(200).json({
      user_type: user.user_type,
      token: token,
      userId: user.id,
      userName: user.first_name + " " + user.last_name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    const products = await Products.find({});

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/getProductsById/", async (req, res) => {
  const { productId } = req.body;
  try {
    const products = await Products.find({ id: productId });

    res.status(200).json({ data: products[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
