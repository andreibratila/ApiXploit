import fs from "fs";
import path from "path";
import { DocumentI } from "./documentModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";

export class DocumentService {
  private dictionaryPath: string;

  constructor() {
    this.dictionaryPath = path.resolve(process.cwd(), "../dictionary"); // Ajusta la ruta al directorio raíz
  }
  public getDocuments(): ServiceResponse<DocumentI | null> {
    const payloads: DocumentI = {
      fuzzing: [],
      sql_injection: [],
      xss: [],
      ssrf: [],
      path_traversal: [],
      url_fuzzing: [],
    };

    try {
      // Lista de archivos que esperas encontrar
      const fileNames = Object.keys(payloads) as Array<keyof DocumentI>;

      // Para cada nombre de archivo, intenta leer el archivo correspondiente
      fileNames.forEach((fileName) => {
        const filePath = path.join(this.dictionaryPath, `${fileName}.txt`); // Asegúrate de agregar .txt

        const content = fs
          .readFileSync(filePath, "utf-8")
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith("#"));

        // Verifica si la clave existe en payloads antes de asignar el contenido
        if (fileName in payloads) {
          payloads[fileName] = content;
        }
      });
      return ServiceResponse.success<DocumentI>("Documents found", payloads);
    } catch (ex) {
      const errorMessage = `Error reading the documents:, ${
        (ex as Error).message
      }`;

      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding Dictionary.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  public putDocument(
    document: string,
    payload: string[]
  ): ServiceResponse<null> {
    try {
      // 1. Define la ruta del archivo viejo
      const oldFilePath = path.join(this.dictionaryPath, `${document}.txt`);

      // 2. Elimina el archivo viejo si existe
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Elimina el archivo viejo
        logger.info(`Deleted old document: ${oldFilePath}`);
      } else {
        logger.info(
          `Old document ${oldFilePath} not found, skipping deletion.`
        );
      }

      // 3. Crea el nuevo archivo con los datos proporcionados
      const newFilePath = path.join(this.dictionaryPath, `${document}.txt`);
      const fileContent = payload.join("\n");

      fs.writeFileSync(newFilePath, fileContent, "utf-8");
      logger.info(`Created new document: ${newFilePath}`);

      return ServiceResponse.success(
        "Document changed successfully",
        null,
        StatusCodes.NO_CONTENT // Aquí usas 204, ya que no se retorna contenido
      );
    } catch (ex) {
      const errorMessage = `Error changing the documents: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);

      return ServiceResponse.failure(
        "Error changing document",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  public patchDocument(
    document: string,
    payload: string[]
  ): ServiceResponse<null> {
    try {
      // 1. Define la ruta del archivo
      const filePath = path.join(this.dictionaryPath, `${document}.txt`);

      // 2. Verifica si el archivo existe
      if (!fs.existsSync(filePath)) {
        return ServiceResponse.failure(
          `Document ${document} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }

      // 3. Lee el contenido actual del archivo
      const existingContent = fs.readFileSync(filePath, "utf-8").split("\n");

      // 4. Añade las nuevas líneas al principio del archivo
      const updatedContent = [...payload, ...existingContent];

      // 5. Escribe el contenido actualizado en el archivo
      fs.writeFileSync(filePath, updatedContent.join("\n"), "utf-8");

      logger.info(`Updated document: ${filePath}`);

      return ServiceResponse.success(
        "Document updated successfully",
        null,
        StatusCodes.NO_CONTENT // Aquí usas 204 ya que no se retorna contenido
      );
    } catch (ex) {
      const errorMessage = `Error updating the document: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);

      return ServiceResponse.failure(
        "Error updating document",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  public deleteDocument(
    document: string,
    payload: string
  ): ServiceResponse<null> {
    try {
      // Define la ruta del archivo del documento
      const filePath = path.join(this.dictionaryPath, `${document}.txt`);

      // Verifica si el archivo existe
      if (!fs.existsSync(filePath)) {
        return ServiceResponse.failure(
          `Document ${document} not found`,
          null,
          StatusCodes.NOT_FOUND
        );
      }

      // Lee el contenido del archivo
      let content = fs.readFileSync(filePath, "utf-8").split("\n");

      // Filtra el payload que deseas eliminar
      content = content.filter((line) => line.trim() !== payload);

      // Si el contenido no ha cambiado (el payload no se encuentra), devuelve un error
      if (
        content.length === fs.readFileSync(filePath, "utf-8").split("\n").length
      ) {
        return ServiceResponse.failure(
          `Payload ${payload} not found in document ${document}`,
          null,
          StatusCodes.NOT_FOUND
        );
      }

      // Escribe el contenido actualizado en el archivo (sin el payload eliminado)
      fs.writeFileSync(filePath, content.join("\n"), "utf-8");

      logger.info(`Deleted payload "${payload}" from document: ${filePath}`);

      return ServiceResponse.success(
        "Payload deleted successfully",
        null,
        StatusCodes.NO_CONTENT // Usamos 204, ya que no se retorna contenido
      );
    } catch (ex) {
      const errorMessage = `Error deleting the payload: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);

      return ServiceResponse.failure(
        "Error deleting payload",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const documentService = new DocumentService();
