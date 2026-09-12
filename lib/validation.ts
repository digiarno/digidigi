import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s()-]{5,18}$/, "invalidPhone"),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "invalidPostal"),
  interest: z.enum(["terrace", "balcony"]),
  message: z.string().trim().min(10).max(4000),
});

export type ContactPayload = z.infer<typeof contactSchema>;
