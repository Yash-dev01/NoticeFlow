import { z } from "zod";

export const noticeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  body: z
    .string()
    .trim()
    .min(1, "Body is required"),

  category: z.enum([
    "Exam",
    "Event",
    "General",
  ]),

  priority: z.enum([
    "Normal",
    "Urgent",
  ]),

  publishDate: z
    .string()
    .refine(
      (value) => !isNaN(Date.parse(value)),
      "Invalid publish date"
    ),

  imageUrl: z.string().optional(),
});