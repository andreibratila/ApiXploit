import backendApi from "@/api/backendApi";
import { ApiResponse, GetDocumentI } from "@/interface";

export const patchDocument = async (
  page: keyof GetDocumentI,
  payload: string[]
): Promise<boolean> => {
  try {
    const requestBody = {
      document: page,
      payload: payload,
    };

    const response = await backendApi.patch<ApiResponse<null>>(
      "/document",
      requestBody
    );

    return response.status === 204;
  } catch (error) {
    console.error("Error posting document:", error);
    return false;
  }
};
