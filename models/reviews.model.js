import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  response: String, // restaurant owner response
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
