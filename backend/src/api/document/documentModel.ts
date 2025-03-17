import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const DocumentSchema = z.object({
  fuzzing: z.array(z.string()),
  sql_injection: z.array(z.string()),
  xss: z.array(z.string()),
  ssrf: z.array(z.string()),
  path_traversal: z.array(z.string()),
  url_fuzzing: z.array(z.string()),
});

// Extraer dinámicamente los keys válidos del esquema
export type DocumentI = z.infer<typeof DocumentSchema>;
export const documentKeys = Object.keys(DocumentSchema.shape) as [
  keyof typeof DocumentSchema.shape,
  ...Array<keyof typeof DocumentSchema.shape>
];

export type PostDocumentI = z.infer<typeof PostDocumentSchema>;
export const PostDocumentSchema = z.object({
  body: z.object({
    document: z.enum(documentKeys),
    payload: z.array(z.string()),
  }),
});

export type DeleteDocumentI = z.infer<typeof DeleteDocumentSchema>;
export const DeleteDocumentSchema = z.object({
  body: z.object({
    document: z.enum(documentKeys),
    payload: z.string(),
  }),
});
