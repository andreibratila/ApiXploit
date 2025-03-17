import type { GetDocumentI } from "@/interface";
import { create } from "zustand";

interface DictionaryItem {
  value: string;
  enabled: boolean;
}
// Tipo del estado del store
interface DictionaryStore {
  dictionary: { [key in keyof GetDocumentI]: DictionaryItem[] };
  loadDictionary: (dictionaryData: GetDocumentI) => void;
  loadUniqueDictionary: (
    dictionaryData: keyof GetDocumentI,
    data: string[]
  ) => void;
  removePayload: (dictionaryData: keyof GetDocumentI, index: number) => void;
  togglePayload: (dictionaryData: keyof GetDocumentI, index: number) => void;
  addPayload: (dictionaryData: keyof GetDocumentI, payload: string) => void;
}

// Función para el store
export const useAtackDictoniaryStore = create<DictionaryStore>((set) => ({
  dictionary: {
    fuzzing: [],
    sql_injection: [],
    xss: [],
    ssrf: [],
    path_traversal: [],
    url_fuzzing: [],
  },

  loadDictionary: (dictionaryData) => {
    // Transformamos cada array de strings en un array de objetos DictionaryItem
    const transformedData = Object.keys(dictionaryData).reduce(
      (acc, key) => {
        const dictionaryKey = key as keyof GetDocumentI; // Aseguramos que la clave es del tipo GetDocumentI
        acc[dictionaryKey] = dictionaryData[dictionaryKey].map((item) => ({
          value: item,
          enabled: true,
        }));
        return acc;
      },
      {} as { [key in keyof GetDocumentI]: DictionaryItem[] }
    );

    set({ dictionary: transformedData });
  },
  loadUniqueDictionary: (dictionaryData, data) => {
    // Transformamos el array de strings a un array de objetos DictionaryItem
    const transformedData = data.map((item) => ({
      value: item,
      enabled: true,
    }));

    // Actualizamos solo la categoría del diccionario con el nuevo array transformado
    set((state) => ({
      dictionary: {
        ...state.dictionary,
        [dictionaryData]: transformedData,
      },
    }));
  },
  removePayload: (dictionaryData, index) => {
    set((state) => ({
      dictionary: {
        ...state.dictionary,
        [dictionaryData]: state.dictionary[dictionaryData].filter(
          (_, i) => i !== index
        ),
      },
    }));
  },
  addPayload: (dictionaryData, payload) => {
    set((state) => ({
      dictionary: {
        ...state.dictionary,
        [dictionaryData]: [
          { value: payload, enabled: true },
          ...state.dictionary[dictionaryData],
        ],
      },
    }));
  },

  // Aquí recibimos tanto la clave del diccionario como el índice para cambiar el estado 'enabled'
  togglePayload: (dictionaryData, index) => {
    set((state) => ({
      dictionary: {
        ...state.dictionary,
        [dictionaryData]: state.dictionary[dictionaryData].map((payload, i) =>
          i === index ? { ...payload, enabled: !payload.enabled } : payload
        ),
      },
    }));
  },
}));
