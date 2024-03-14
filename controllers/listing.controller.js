import listingSchema from "../validations/listing.validate.js";
import Listing from "../models/listing.model.js";
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

export const getListings = async (req, res) => {
  try {
    const restaurants = await Listing.find({}).lean().exec();
    if (!restaurants) {
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

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
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
