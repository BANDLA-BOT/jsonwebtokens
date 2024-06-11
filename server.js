const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const validate = require("./middle/validate.js");
const cors = require('cors')


const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      unique: true,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

//hashedpassword
const hashedPassword = async (password) => {
  const res = await bcrypt.hash(password, 12);
  return res;
};
//middlewares
const registerRoute = async (req, res) => {
  const { username, email, password } = req.body;
  const validUser = userModel.findOne({ email: email });
  if(!validUser){
      res.json({message:"User already exist"})
  }
  const user = await userModel.create({
    username: username,
    email: email,
    password: await hashedPassword(password),
  });
  // console.log(user);
  res.send(user)
  res.end();
};

const loginRoute = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      "Guruprasad",
      { expiresIn: "10000" }
    );
    res.cookie('token', token, { httpOnly: true })
    res.send({message:"success", redirect:'/dashboard'})
    
  } else {
    res.status(401);
    throw new Error("Credentials does not match");
  }
};

const homeRoute = (req, res) => {
  res.send(req.user)
};
//Routes
app.post("/register", registerRoute);
app.post("/", loginRoute);
app.get("/home", homeRoute);
app.use('/dashboard', validate)

mongoose.connect("mongodb://localhost:27017/Tokens").then(() => {
  console.log("Connected");
  app.listen(8000, () => {
    console.log("Server running on 8000");
  });
});
