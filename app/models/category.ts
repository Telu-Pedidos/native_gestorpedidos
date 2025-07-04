import { categorySchema } from "@/app/validations/category-validation";
import { z } from "zod";

export type CategoryDTO = z.infer<typeof categorySchema>;

export type CategoryResponse = CategoryDTO & {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
};
