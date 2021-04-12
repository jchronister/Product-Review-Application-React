const express = require("express");
const { ObjectID } = require("mongodb");
const { token } = require("morgan");
const router = express.Router();
const jwtManager = require("../JWT/jwtManager");


// add review to the product
router.post("/:id", (req, res) => {
  const headers = req.headers.authorization;
  const token = jwtManager.verify(headers);
  let addReviews = {
    creator: token.email,
    reviewID: new ObjectID(),
    comment: req.body.comment,
    rating: req.body.rating,
    creationDate: new Date(),
  };
  req.db
    .collection("products")
    .update(
      { _id: new ObjectID(req.params.id) },
      { $push: { reviews: addReviews } }
    )
    .then((data) => {
      res.json({ status: "review succesfully posted", result: data });
    });
});

// edit reviews of the product
router.put("/:id", (req, res) => {
  const headres = req.headers.authorization;
  const token = jwtManager.verify(headres);

  req.db
    .collection("products")
    .update(
      {
        "reviews.creator": token.email,
        reviews: { $elemMatch: { reviewID: new ObjectID(req.params.id) } },
      },
      {
        $set: {
          "reviews.$.comment": req.body.comment,
          "reviews.$.rating": req.body.rating,
        },
      }
    )
    .then((data) => {
      res.json({
        status: "you have succesfully updated your review",
        result: data,
      });
    })
    .catch((err) => {
      res.json({ status: "Sorry you can't update the review" });
    });
});

router.delete("/:id", (req, res) => {
  const headres = req.headers.authorization;
  const token = jwtManager.verify(headres);

  req.db
    .collection("products")
    .update(
      { "reviews.creator": token.email },
      { $pull: { reviews: { reviewID: new ObjectID(req.params.id) } } }
    )
    .then((data) => {
      res.json({ status: "succesfully removed the product" });
    });
});

module.exports = router;
