// const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { default: mongoose } = require("mongoose");
const { myuser } = require("../models/userModel");

const secretkey = "secret";

async function signuproute(req, res) {
  // console.log("hi");
  const email = req.body.email;

  console.log(req.body);

  if (await myuser.findOne({ email: `${email}` })) {
    console.log("email already exist");

    res.send("already exist email");
  } else {
    hashedpass = await bcrypt.hash(req.body.password, 10);
    console.log(hashedpass);

    // signuser = {
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hashedpass,
    // };

    await myuser.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedpass,
    });

    res.send({ msg: "done" });
  }
}

async function loginroute(req, res) {
  try {
    email = req.body.email;

    console.log(req.body.email);
    userdata = await myuser.findOne({ email });

    // console.log(userdata);
    if (!userdata) {
      return res.status(404).json({ message: "user not found " });
    }
    checkHash = await bcrypt.compare(req.body.password, userdata.password);

    console.log(checkHash);

    if (checkHash && req.body.email == userdata.email) {
      jwt.sign(
        { email: req.body.email },
        secretkey,
        { expiresIn: "800min" },
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              message: "successfully logged in ",
              email: req.body.email,

              token,
              userdata,
            });
          }
        }
      );
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "error" });
  }
}

async function protectedroute(req, res) {
  verifytoken(req, res);
  //   res.send({ message: "valid token" });
}

function verifytoken(req, res) {
  //   console.log("ji");
  const bearerheader = req.headers["authorization"];

  if (bearerheader !== undefined) {
    const bearer = bearerheader.split(" ");
    const token = bearer[1];
    req.token = token;

    jwt.verify(req.token, secretkey, (err, authdata) => {
      if (err) {
        console.log("error", err);
        res.send("something went wrong");
      } else {
        res.json({
          message: "accessed",
          authdata,
        });
      }

      console.log("ji");
    });
    // next();
  } else {
    res.send({ message: "invalid token" });
  }
}

//NEW ADDED
async function getUser(req, res) {
  try {
    const body = req.body;
    const user = await myuser.findOne({ email: body.email });

    res.send(user);
  } catch (err) {
    console.log("USER NOT FOUND", err);
    res.send(err);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUserData = await myuser.findOneAndUpdate(
      { email: req.body.email },
      {
        orderInCart: req.body.orderInCart,
        orderPlaced: req.body.orderPlaced,
      }
    );
    console.log(req.body, updatedUserData);
    res.send(updatedUserData);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

module.exports = {
  signuproute,
  loginroute,
  protectedroute,
  getUser,
  updateUser,
};
