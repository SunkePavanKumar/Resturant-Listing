import { z } from "zod";

const listingSchema = z.object({
  name: z.string().min(1).max(255),
  businessPhone: z.string().min(1).max(20),
  city: z.string().min(1).max(100),
  address: z.string().min(1).max(255),
  images: z.array(z.string()),
  owner: z.string(),
  averageRating: z.number().min(0).max(10).default(0),
  reviews: z.array(z.string()).optional(),
});

export const patchListingSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  businessPhone: z.string().min(1).max(20).optional(),
  city: z.string().min(1).max(100).optional(),
  address: z.string().min(1).max(255).optional(),
  images: z.array(z.string()).optional(),
  owner: z.string().optional(),
  averageRating: z.number().min(0).max(10).default(0).optional(),
  reviews: z.array(z.string()).optional(),
});

export default listingSchema;
