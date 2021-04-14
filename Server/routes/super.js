const express = require("express");
const router = express.Router();
const jwtManager = require("../JWT/jwtManager");
const {sendJSON, getReturnObject} = require("../MiddleWares/returnObject")
const {ObjectID} = require("mongodb")
const fs = require("fs")

// SuperUser get all the users
router.get("/users", (req, res) => {
 
  req.db
    .collection("users")
    .find()
    // .toArray((err, data) => {
    //   res.json({ status: "succesfully loaded the users", result: data });
    // });
    .toArray(sendJSON.bind(res))
});

// Activate or deactivate the status of a user
router.put("/users", (req, res) => {
  const headers = req.headers.authorization;
  const token = jwtManager.verify(headers);

  // Set status and/or password
  let updt = {}
  if (req.body.status) updt = {status: req.body.status}
  if (req.body.password) updt = {...updt, password: req.body.password}

  req.db
    .collection("users")
    .updateOne(
      { _id: ObjectID(req.body.id) }, { $set: updt },
      sendJSON.bind(res)
    )
    // .then((data) => {
    //   res.json({ status: "it's updated ", result: data });
    // });
});

router.get("/logs", function(req, res) {
  
  fs.readFile("./access.log", sendJSON.bind(res))
  // fs.createReadStream() Do this with Streaming?

})


module.exports = router;
