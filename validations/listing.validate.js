import { z } from "zod";

const listingSchema = z.object({
  name: z.string().min(1).max(255),
  businessPhone: z.string().min(1).max(20),
  city: z.string().min(1).max(100),
  address: z.string().min(1).max(255),
  images: z.array(z.string()),
  owner: z.string().uuid(),
  averageRating: z.number().min(0).max(10).default(0),
  reviews: z.array(z.string().uuid()).optional(),
});

export default listingSchema;