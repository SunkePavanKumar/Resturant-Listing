import listingSchema from "../validations/listing.validate.js";

export const listing = (req, res) => {
  try {
    // zod validation
    const validatedData = listingSchema.parse(req.body);
    let { userId, role } = req; // getting this details from the auth middleware
    // if(role === "")
  } catch (error) {}
};
