const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../models/User");

exports.signUp = (req, res, next) => {
  console.log("asdadasdasheree");
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((createdUser) => {
        res.status(201).json({
          message: "User Created Successfully",
          user: createdUser,
        });
      })
      .catch((error) => {
        res.json({
          message: "error",
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "error",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect Password!!",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser.id },
        "fusemachines_AI_Tech_Company_of_Nepal",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        email: fetchedUser.email,
        token: token,
        expiresIn: 3600,
        // message: "User Authenticated Successfully",
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: "User Authentication Failed!",
      });
    });
};
