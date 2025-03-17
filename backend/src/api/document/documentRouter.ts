import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { documentController } from "./documentController";
import {
  DeleteDocumentSchema,
  DocumentSchema,
  PostDocumentSchema,
} from "./documentModel";
import { validateRequest } from "@/common/utils/httpHandlers";

export const documentRegistry = new OpenAPIRegistry();
export const documentRouter: Router = express.Router();

documentRegistry.register("Docuement", DocumentSchema);

documentRegistry.registerPath({
  method: "get",
  path: "/document",
  tags: ["Document"],
  responses: createApiResponse(z.array(DocumentSchema), "Success"),
});
documentRouter.get("/", documentController.getDocuments);

documentRegistry.registerPath({
  method: "put",
  path: "/document",
  tags: ["Document"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object(PostDocumentSchema.shape),
        },
      },
    },
  },
  responses: createApiResponse(z.void(), "Success"),
});
documentRouter.put(
  "/",
  validateRequest(PostDocumentSchema),
  documentController.putDocument
);

documentRegistry.registerPath({
  method: "patch",
  path: "/document",
  tags: ["Document"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object(PostDocumentSchema.shape),
        },
      },
    },
  },
  responses: createApiResponse(z.void(), "Success"),
});
documentRouter.patch(
  "/",
  validateRequest(PostDocumentSchema),
  documentController.patchDocument
);

documentRegistry.registerPath({
  method: "delete",
  path: "/document",
  tags: ["Document"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object(DeleteDocumentSchema.shape),
        },
      },
    },
  },
  responses: createApiResponse(z.void(), "Success"),
});
documentRouter.delete(
  "/",
  validateRequest(DeleteDocumentSchema),
  documentController.deleteDocument
);

// documentsRegistry.registerPath({
//   method: "get",
//   path: "/users/{id}",
//   tags: ["User"],
//   request: { params: GetUserSchema.shape.params },
//   responses: createApiResponse(UserSchema, "Success"),
// });

// userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);
