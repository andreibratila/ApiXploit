import type { Request, RequestHandler, Response } from "express";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { documentService } from "./documentService";

class DocumentController {
  public getDocuments: RequestHandler = async (
    _req: Request,
    res: Response
  ) => {
    const documents = documentService.getDocuments();

    await handleServiceResponse(documents, res);
  };
  public putDocument: RequestHandler = async (_req: Request, res: Response) => {
    const { document, payload } = _req.body;
    const documents = documentService.putDocument(document, payload);
    await handleServiceResponse(documents, res);
  };
  public patchDocument: RequestHandler = async (
    _req: Request,
    res: Response
  ) => {
    const { document, payload } = _req.body;
    const documents = documentService.patchDocument(document, payload);
    await handleServiceResponse(documents, res);
  };
  public deleteDocument: RequestHandler = async (
    _req: Request,
    res: Response
  ) => {
    const { document, payload } = _req.body;
    const documents = documentService.deleteDocument(document, payload);
    await handleServiceResponse(documents, res);
  };
}

export const documentController = new DocumentController();
