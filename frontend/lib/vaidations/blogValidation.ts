import * as z from "zod";

export const blogValidationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
});

export type BlogFormValues = z.infer<typeof blogValidationSchema>;