import { z } from "zod";

const reviewSchema = z.object({
  content: z.string().min(1).max(255),
  rating: z.number().int().min(1).max(5),
  user: z.string(),
  listing: z.string(),
  response: z.string().optional(),
});
export const patchReviewSchema = z.object({
  content: z.string().min(1).max(255).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  user: z.string().optional(),
  listing: z.string().optional(),
  response: z.string().optional().optional(),
});

export default reviewSchema;
