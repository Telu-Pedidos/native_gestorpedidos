import { z } from "zod";

const MAX_UPLOAD_SIZE_MB = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const modelSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres"),
  imageUrl: z.string().max(2000).optional(),
  file: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return typeof file === "object" && file.uri && file.type;
      },
      { message: "Arquivo inválido." },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file?.fileSize <= MAX_UPLOAD_SIZE_MB;
      },
      { message: "O tamanho do arquivo deve ser menor que 3 MB" },
    ),
});

export type ModelFormValues = z.infer<typeof modelSchema>;
