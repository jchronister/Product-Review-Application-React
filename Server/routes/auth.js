const express = require("express");
const router = express.Router();
const jwtManager = require("../JWT/jwtManager");
const bcryptjs = require("bcryptjs");
const {sendJSON, getReturnObject} = require("../MiddleWares/returnObject")

router.post("/login", (req, res) => {
  // let hashedPassword = hash(req.body.password);
  req.db
    .collection("users")
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data.password === req.body.password) {
        const payload = {};
        payload.role = data.role;
        payload.email = data.email;
        payload.status = data.status;
        const token = jwtManager.generate(payload);

        res.json(getReturnObject(null, token))
        // res.json({ status: "login Granted", result: token });
      } else {
        // res.json({ status: "invalid User" });
        res.json(getReturnObject("Invalid User", null))
      }
    })
    .catch((err) => {
      res.json(getReturnObject("Invalid User", null))
    });
});

router.post("/signup", (req, res) => {
  req.db
    .collection("users")
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        res.json({ status: "User already exist" });
      } else {
        req.db
          .collection("users")
          .insertOne(req.body)
          .then((data) => {
            res.json({ status: "succesfully Added User", result: data });
          })
          .catch((err) => {
            res.json({ status: "error occured while trying to add you" });
          });
      }
    });
});

module.exports = router;
