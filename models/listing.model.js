import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessPhone: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  images: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
