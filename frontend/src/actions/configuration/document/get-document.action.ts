import backendApi from "@/api/backendApi";
import type { ApiResponse, GetDocumentI } from "@/interface/";

export const getDocument = async (): Promise<GetDocumentI> => {
  const response = await backendApi.get<ApiResponse<GetDocumentI>>("/document");
  return response.data.responseObject;
};
