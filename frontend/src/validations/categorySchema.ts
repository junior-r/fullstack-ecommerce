import { z } from "zod";

export const categorySchema = z.object({
  categoryName: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(255, {
      message: "El nombre debe tener como máximo 255 caracteres",
    }),
});
