const mongoose = require("mongoose");
const reviewAndRatingSchema = new mongoose.Schema(
  {
    rating: {
      required: true,
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 500,
    },
    ratedBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },

    game: { type: mongoose.Types.ObjectId, ref: "games", required: true },
  },
  { timestamps: true }
);
const reviewAndRatingModel =
  mongoose.models.reviewAndRatings ||
  mongoose.model("reviewAndRatings", reviewAndRatingSchema);
module.exports = reviewAndRatingModel;
