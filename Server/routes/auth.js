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
      if (!data) {
        res.json(getReturnObject("Invalid Username", null))

      } else if (data.status !== "active") {
        res.json(getReturnObject("User Inactive", null))

      } else if (data.password === req.body.password) {
        const payload = {};
        payload.role = data.role;
        payload.email = data.email;
        payload.status = data.status;
        const token = jwtManager.generate(payload);

        res.json(getReturnObject(null, token))
        // res.json({ status: "login Granted", result: token });
      } else {
        // res.json({ status: "invalid User" });
        res.json(getReturnObject("Invalid Password", null))
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
        res.json(getReturnObject("User Already Exists", null))
        // res.json({ status: "User already exist" });
      } else {

        // User Object to Add
        const user = {
            email : req.body.email,
            password : req.body.password,
            role : "user",
            status : "active"
        }

        req.db
          .collection("users")
          .insertOne(user, sendJSON.bind(res))
          // .then((data) => {
          //   res.json({ status: "succesfully Added User", result: data });
          // })
          // .catch((err) => {
          //   res.json({ status: "error occured while trying to add you" });
          // });
      }
    });
});

module.exports = router;
