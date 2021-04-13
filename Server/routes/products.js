const express = require("express");
const jwtManager = require("../JWT/jwtManager");
const router = express.Router();

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
    .toArray(sendJSON.bind(res))
});

router.get("/:id", (req, res) => {
  req.db
    .collection("products")
    .find({ _id: new ObjectID(req.params.id) })
    .toArray((err, data) => {
      console.log(data);
      res.status(200).json({ status: "success", result: data });
    });
});


// create a new product
router.post("/", (req, res) => {
  const headers = req.headers.authorization;
  let token = jwtManager.verify(headers);
  let newProduct = {
    reputation: 0,
    review: [],
    creator: token.email,
    creationDate: new Date(),
    description: req.body.description,
    img: req.body.img,
  };
  console.log(newProduct);
  req.db
    .collection("products")
    .insertOne(newProduct)
    .then((data) => {
      res.json({ status: "succesfully added product", result: data });
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});


// update product
router.put("/:id", (req, res) => {
  const headers = req.headers.authorization;
  let token = jwtManager.verify(headers);
  req.db
    .collection("products")
    .updateOne(
      { creator: token.email },
      { $set: { description: req.body.description, img: req.body.img } }
    )
    .then((data) => {
      res.json({ status: "succesfully updated the product" });
    })

    .catch((err) => {
      res.json({ status: "error can't update product", result: err });
    });
});


// delete product
router.delete("/:id", (req, res) => {
  const headers = req.headers.authorization;
  let token = jwtManager.verify(headers);
  req.db
    .collection("products")
    .removeOne({ creator: token.email })
    .then((data) => {
      res.json({ status: "successfully removed product" });
    })
    .catch((err) => {
      res.json({ status: "error", result: err });
    });
});

module.exports = router;
