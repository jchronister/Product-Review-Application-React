const express = require("express");
const jwtManager = require("../JWT/jwtManager");
const router = express.Router();
const {ObjectID} = require("mongodb")
const {sendJSON} = require("../MiddleWares/returnObject")

// fetch all the products
router.get("/", (req, res) => {

  // Sort Reputation
  if (req.query.reputation) {
    var sort = {reputation: req.query.reputation === "desc" ? -1 : 1}
  } else {
    sort = {}
  }

  req.db
    .collection("products")
    .find()
    .sort(sort)
    .toArray(sendJSON.bind(res));
});

router.get("/:id", (req, res) => {
  req.db
    .collection("products")
    .find({ _id: new ObjectID(req.params.id) })
    .toArray(sendJSON.bind(res));
});


// create a new product
router.post("/", (req, res) => {
  const headers = req.headers.authorization;
  let token = jwtManager.verify(headers);
  let newProduct = {
    title: req.body.title,
    reputation: null,
    review: [],
    creator: token.email,
    creationDate: new Date(),
    description: req.body.description,
    img: req.body.img,
  };

  req.db
    .collection("products")
    .insertOne(newProduct, sendJSON.bind(res))
    // .then((data) => {
    //   res.json({ status: "succesfully added product", result: data });
    // })
    // .catch((err) => {
    //   res.json({ status: "error" });
    // });
});


// update product
router.put("/:id", (req, res) => {

  const headers = req.headers.authorization;
  let token = jwtManager.verify(headers);
  req.db
    .collection("products")
    .updateOne(
      { _id: new ObjectID(req.params.id) },
      { $set: { title: req.body.title, description: req.body.description, img: req.body.img } }
    ,sendJSON.bind(res))
    // .then((data) => {
    //   res.json({ status: "succesfully updated the product" });
    // })

    // .catch((err) => {
    //   res.json({ status: "error can't update product", result: err });
    // });
});


// delete product
router.delete("/:id", (req, res) => {
  const headers = req.headers.authorization;
  let token = jwtManager.verify(headers);
  req.db
    .collection("products")
    .deleteOne({ creator: token.email, _id: new ObjectID(req.params.id)  },
    sendJSON.bind(res))

});

module.exports = router;
