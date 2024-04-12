const express = require("express");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

async function getToken(req, res) {
  jwt.verify(
    req.token,
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    async (err, authdata) => {
      if (err) {
        res.status(401).send({ result: "invalid token" });
      } else {
        try {
          const token = req.token;

          const user = await User.findOne({
            tokens: req.token,
          });

          if (!user) {
            console.error("User not found for token:", token);
            return res.status(401).json({ result: "user not found" });
          }

          res.json({ cusername: user.username });
        } catch (error) {
          res.json({ message: "Error" });
        }
      }
    }
  );
}

module.exports = getToken;