const express = require("express");
const router = express.Router();
const jwtManager = require("../JWT/jwtManager");

// SuperUser get all the users
router.get("/users", (req, res) => {
 
  req.db
    .collection("users")
    .find()
    .toArray((err, data) => {
      res.json({ status: "succesfully loaded the users", result: data });
    });
});

// Activate or deactivate the status of a user
router.put("/users", (req, res) => {
  const headers = req.headers.authorization;
  const token = jwtManager.verify(headers);

  req.db
    .collection("users")
    .update({ email: token.email }, { $set: { status: req.body.status } })
    .then((data) => {
      res.json({ status: "it's updated ", result: data });
    });
});

module.exports = router;
