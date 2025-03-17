import backendApi from "@/api/backendApi";
import { ApiResponse, GetDocumentI } from "@/interface";

export const deleteDocument = async (
  page: keyof GetDocumentI,
  payload: string
): Promise<boolean> => {
  try {
    const requestBody = {
      document: page,
      payload: payload,
    };

    const response = await backendApi.request<ApiResponse<null>>({
      method: "delete", // Usamos el método DELETE
      url: "/document",
      data: requestBody, // Enviamos el cuerpo de la solicitud aquí
    });
    return response.status === 204;
  } catch (error) {
    console.error("Error posting document:", error);
    return false;
  }
};
