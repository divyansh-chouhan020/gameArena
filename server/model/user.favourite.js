const mongoose = require("mongoose");
const userFavourite = new mongoose.Schema(
  {
    game: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "games",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);
const userFavouriteModel =
  mongoose.models.userFavourites ||
  mongoose.model("userFavourites", userFavourite);
module.exports = userFavouriteModel;
