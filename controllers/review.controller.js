import Review from "../models/reviews.model.js";
import reviewSchema, {
  patchReviewSchema,
} from "../validations/review.validate.js";

// create the review
export const review = async (req, res) => {
  try {
    // zod input validation
    const validatedData = reviewSchema.parse(req.body);

    // role permission validation
    if (req.role === "business_owner") {
      return res.status("400").json({
        success: false,
        message: "Permission Declined",
      });
    }

    // Create a new listing
    const review = new Review(validatedData);
    await review.save(); //save to db
    res.status(201).json({
      success: true,
      message: "Review Details Added Successfully",
    });
  } catch (error) {
    console.log(`Error while Reviewing Error :${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong, Please try later",
    });
  }
};

// get all the reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().lean().exec();
    if (!reviews || reviews.length === 0) {
      return res.status("400").json({
        success: false,
        message: "No reviews are available",
      });
    }

    res.status(200).json({
      success: true,
      message: "successfully fetched all the details",
      data: reviews,
    });
  } catch (error) {
    console.log(`Error while getting the review details Error : ${error}`);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get the review by Id
export const getReviewByID = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).lean().exec();
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "review not found",
      });
    }
    res.json({
      success: true,
      message: "Successfully fetched the details",
      data: review,
    });
  } catch (error) {
    console.log(`Error while getting the review details Error : ${error}`);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// update the review

export const updateReview = async (req, res) => {
  // zod input validation
  let validatedData = patchReviewSchema.parse(req.body);

  // No role base access to this as three of them can update the review

  // Check if any valid fields are provided in the request body
  if (Object.keys(validatedData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid fields provided for update",
    });
  }

  // update the listing
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .lean()
    .exec();
  if (!updateReview) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Updated the review successfully",
    data: updateReview,
  });

  try {
  } catch (error) {
    console.log(`Error while updating the restaurant details Error : ${error}`);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete the review

export const deleteReview = async (req, res) => {
  try {
    // check the role permission to delete.

    if (req.role === "business_owner") {
      return res.status("400").json({
        success: false,
        message: "Permission Declined",
      });
    }
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted Successfully",
    });
  } catch (error) {
    console.log(`Error while deleting the Review details Error : ${error}`);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
