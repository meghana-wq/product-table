import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be > 0"),
  stock: z.number().int().nonnegative("Stock must be ≥ 0"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
