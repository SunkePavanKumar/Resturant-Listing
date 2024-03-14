import listingSchema from "../validations/listing.validate.js";
import Listing from "../models/listing.model.js";
import { patchListingSchema } from "../validations/listing.validate.js";

// create the listing
export const listing = async (req, res) => {
  try {
    // zod validation
    const validatedData = listingSchema.parse(req.body);
    let { userId, role } = req; // getting this details from the auth middleware

    // check the restaurant already exists in the database or not

    let existingDetails = await Listing.findOne({ name: validatedData.name });
    if (existingDetails) {
      return res.status(400).json({
        success: true,
        message: "Restaurant Already exists",
      });
    }

    // check the role of the user. If he is the user, decline the access
    if (role === "user") {
      return res.status("400").json({
        success: false,
        message: "Permission Declined",
      });
    }

    // Create a new listing
    const newListing = new Listing(req.body);
    await newListing.save(); //save to db
    res.status(201).json({
      success: true,
      message: "Restaurant Details Added Successfully",
    });
  } catch (error) {
    console.log(`Error while listing Error :${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong, Please try later",
    });
  }
};

// get all the restaurant details
export const getListings = async (req, res) => {
  try {
    const restaurants = await Listing.find().lean().exec();
    if (!restaurants || restaurants.length === 0) {
      return res.status("400").json({
        success: false,
        message: "No Restaurants are available",
      });
    }

    res.status(200).json({
      success: true,
      message: "successfully fetched all the details",
      data: restaurants,
    });
  } catch (error) {
    console.log(`Error while getting the restaurant details Error : ${error}`);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// get the restaurant details by ID
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).lean().exec();
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    res.json({
      success: true,
      message: "Successfully fetched the details",
      data: listing,
    });
  } catch (error) {
    console.log(`Error while getting the restaurant details Error : ${error}`);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// update the listing

export const updateListing = async (req, res) => {
  // zod input validation
  let validatedData = patchListingSchema.parse(req.body);

  // check the user role. Only admin and business-owner  have the access
  if (req.role === "user") {
    return res.status("400").json({
      success: false,
      message: "Permission Declined",
    });
  }

  // Check if any valid fields are provided in the request body
  if (Object.keys(validatedData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid fields provided for update",
    });
  }

  // update the listing
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .lean()
    .exec();
  if (!updatedListing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Updated the listing successfully",
    data: updatedListing,
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

// delete the listing

export const deleteListing = async (req, res) => {
  try {
    // check the role permission to delete.

    if (req.role === "user" || req.role === "business_owner") {
      return res.status("400").json({
        success: false,
        message: "Permission Declined",
      });
    }
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Listing deleted Successfully",
    });
  } catch (error) {
    console.log(`Error while deleting the restaurant details Error : ${error}`);
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
