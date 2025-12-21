import express from "express";
import asyncHandler from "express-async-handler";
import Review from "./reviewModel.js";
import authenticate from "../users/index.js";

const router = express.Router();


router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const review = await Review.create({
      user: req.user._id,
      movieId: req.body.movieId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(review);
  })
);

router.get(
  "/user",
  authenticate,
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ user: req.user._id });
    res.status(200).json(reviews);
  })
);

router.get(
  "/movie/:movieId",
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({
      movieId: req.params.movieId,
    });
    res.status(200).json(reviews);
  })
);

export default router;
