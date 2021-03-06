const express = require("express");
const { ObjectID } = require("mongodb");
const { token } = require("morgan");
const router = express.Router();
const jwtManager = require("../JWT/jwtManager");
const {sendJSON} = require("../MiddleWares/returnObject")

// add review to the product
router.post("/:id", (req, res, next) => {
  const headers = req.headers.authorization;
  const token = jwtManager.verify(headers);
  let addReviews = {
    creator: token.email,
    reviewID: new ObjectID(),
    comment: req.body.comment,
    rating: +req.body.rating,
    creationDate: new Date(),
  };

  // Get Array Sum
  req.db.collection("products").aggregate([{$match: {"_id" : ObjectID(req.params.id)}}, {$project: {total:{$sum: "$reviews.rating"}}}])

  .toArray().then(

    (data) => {

      console.log(data[0].total)

      // Update Product Review and Reputation
      req.db.collection("products")
      .updateOne(
        { _id: new ObjectID(req.params.id) },
        { $push: { reviews: addReviews }, $set: {reputation: data[0].total + addReviews.rating}},
        sendJSON.bind(res)
      )

    }
  ).catch(next)


});

// edit reviews of the product
router.put("/:id", (req, res) => {
  const headres = req.headers.authorization;
  const token = jwtManager.verify(headres);

  req.db
    .collection("products")
    .updateOne(
      {
        "reviews.reviewID":  new ObjectID(req.params.id) 
      },
      {
        $set: {
          "reviews.$.comment": req.body.comment,
          "reviews.$.rating": req.body.rating
        },
          "$inc" :{ reputation: req.body.rating - req.body.oldRating}
      },
      sendJSON.bind(res)
    )
});

router.delete("/:id", (req, res) => {
  const headres = req.headers.authorization;
  const token = jwtManager.verify(headres);
  const id = ObjectID(req.params.id)

  req.db
    .collection("products")
    .updateOne(
      // { "reviews.creator": token.email },
      {"reviews.reviewID": id},
      { $pull:  { reviews: { reviewID: id } },
      "$inc" :{ reputation: req.body.rating - req.body.oldRating} },
      sendJSON.bind(res)
    )

});

// Get Review
router.get("/:id", (req, res) => {
const id = ObjectID(req.params.id)
  req.db.collection("products")
//   .aggregate([{$match:{"reviews.reviewID": ObjectID(req.params.id)}},
// {$project: {comment: "$reviews.$.comment", rating: "$reviews.$.rating"}}])
  .find({"reviews.reviewID": id},
  {projection: {_id: 0, reviews: {$elemMatch: {reviewID: id}}}})
  .toArray(sendJSON.bind(res))

})


module.exports = router;
