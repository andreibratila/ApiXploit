import { deleteDocument } from "@/actions";
import type { GetDocumentI } from "@/interface";
import { useAtackDictoniaryStore } from "@/store/useAtackDictoniaryStore";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const Route = createFileRoute(
  "/configuration/dictionary/_dictionaryNavbar/$document"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { document: page } = useParams({
    from: "/configuration/dictionary/_dictionaryNavbar/$document",
  }) as { document: keyof GetDocumentI };
  const dictionary = useAtackDictoniaryStore((state) => state.dictionary);
  const togglePayload = useAtackDictoniaryStore((state) => state.togglePayload);
  const removePayload = useAtackDictoniaryStore((state) => state.removePayload);
  const data = dictionary[page];
  const [loading, setLoading] = useState(false);
  const handleDeletePayload = async (
    page: keyof GetDocumentI,
    index: number,
    payload: string
  ) => {
    if (loading) return;
    setLoading(true);
    const resposne = await deleteDocument(page, payload);
    if (resposne) {
      toast.success(`Payload ${payload} DELETED!`);
      removePayload(page, index);
    } else {
      toast.error(`Error DELETING payload ${payload}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700">
          {page} ({data.length} payloads)
        </h3>
      </div>
      <div className="divide-y max-h-[400px] overflow-y-auto">
        {data.map((payload, index) => (
          <div
            key={index}
            className={`px-3 py-3 flex items-center justify-between hover:bg-gray-50 ${
              !payload.enabled ? "opacity-50" : ""
            }`}
          >
            <div
              className="flex items-center space-x-3 w-full cursor-pointer h-full"
              onClick={() => togglePayload(page, index)} // Mueve la lógica aquí
            >
              <input
                type="checkbox"
                checked={payload.enabled}
                readOnly
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className=" text-sm">{payload.value}</span>
            </div>
            <button
              onClick={() => handleDeletePayload(page, index, payload.value)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
