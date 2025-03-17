import { putDocument } from "@/actions";
import { patchDocument } from "@/actions/configuration/document/patch-document.action";
import { GetDocumentI } from "@/interface";
import { useAtackDictoniaryStore } from "@/store/useAtackDictoniaryStore";
import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { Database, Download, Plus, Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute(
  "/configuration/dictionary/_dictionaryNavbar"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { document: page } = useParams({
    from: "/configuration/dictionary/_dictionaryNavbar/$document",
  }) as { document: keyof GetDocumentI };
  const [loading, setLoading] = useState(false);
  const [newPayload, setNewPayload] = useState("");
  const dictionary = useAtackDictoniaryStore((state) => state.dictionary);
  const loadUniqueDictionary = useAtackDictoniaryStore(
    (state) => state.loadUniqueDictionary
  );
  const addPayload = useAtackDictoniaryStore((state) => state.addPayload);

  const handleDownload = () => {
    const data = dictionary[page].map((p) => p.valueOf()).join("\n");
    const url = `data:application/json;charset=utf-8,${encodeURIComponent(data)}`; // Generamos una URL con los datos
    const link = document.createElement("a"); // Creamos un enlace de descarga
    link.href = url; // Asignamos la URL de datos al enlace
    link.download = `${page}.txt`; // Establecemos el nombre del archivo de descarga
    link.click(); // Simulamos el clic para iniciar la descarga
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return;
    const file = e.target.files?.[0];
    if (!file) return; // Si no hay archivo, salir
    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target?.result as string;

      // Dividir las líneas y eliminar espacios en blanco al principio y final de cada línea
      const lines = data
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line); // Esto eliminará líneas vacías también

      // Send to backend to update the dictionary
      const response = await putDocument(page, lines);

      if (response) {
        toast.success(`${page} Payloads added successfully"`);
        loadUniqueDictionary(page, lines);
        setLoading(false);
      } else {
        toast.error(`Error adding ${page} payloads`);
        setLoading(false);
      }
      // Actualizamos el store solo con las nuevas líneas del archivo
    };

    await reader.readAsText(file);
  };

  const submitPayload = async () => {
    if (!newPayload.trim()) {
      toast.error("Please enter a payload");
      return;
    }
    const response = await patchDocument(page, [newPayload]);
    if (response) {
      toast.success("Payload added successfully");
      addPayload(page, newPayload);
      setNewPayload("");
      setLoading(false);
    } else {
      toast.error(`Error adding ${page} payloads`);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          Dictionary Manager
        </h2>
        <div className="flex items-center space-x-2">
          <button
            disabled={loading}
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
          <label className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 cursor-pointer">
            <Upload className="w-4 h-4 mr-1" />
            {loading ? "Uploading..." : "Upload"}
            <input
              disabled={loading}
              type="file"
              accept=".txt"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex space-x-2">
        {Object.keys(dictionary).map((type) => (
          <Link
            to="/configuration/dictionary/$document"
            params={{ document: type }}
            key={type}
            activeProps={{ className: "bg-blue-100 text-blue-700" }}
            inactiveProps={{ className: "text-gray-500 hover:bg-gray-100" }}
            className="px-3 py-1 rounded-md text-sm font-medium"
          >
            <Database className="w-4 h-4 inline mr-1" />
            {type}
          </Link>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newPayload}
          onChange={(e) => setNewPayload(e.target.value)}
          placeholder="Enter new payload"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitPayload();
            }
          }}
        />
        <button
          onClick={submitPayload}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>

      <Outlet />
    </div>
  );
}
