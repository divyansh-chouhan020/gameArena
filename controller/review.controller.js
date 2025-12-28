const reviewAndRatingModel = require("../model/review.rating.model");
const createReviewAndRating = async (req, res) => {
  try {
    const { rating, review, gameId } = req.body;
    if (!rating || !gameId) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
        error: "Bad Request",
      });
    }
    // to implement new field rating and review final value in game model and put the final value in game model
    const newReview = await reviewAndRatingModel.create({
      rating,
      review,
      ratedBy: req.user,
      game: gameId,
    });
    return res.status(200).json({
      success: true,
      message: "Review and Rating created successfully",
      data: newReview,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: "Internal Server Error",
    });
  }
};
module.exports = { createReviewAndRating };
