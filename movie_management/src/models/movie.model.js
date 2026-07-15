const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    types: {
      type: [String],
      required: true,
      validate: {
        validator: (types) => Array.isArray(types) && types.length > 0,
        message: "types must be a non-empty array",
      },
    },
    averageRating: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
