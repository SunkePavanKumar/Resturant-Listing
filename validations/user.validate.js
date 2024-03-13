import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "business_owner", "admin"]).default("user"),
});

export default registrationSchema;
