import { createFileRoute } from "@tanstack/react-router";
import { Play, Settings } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/configuration/stats")({
  component: RouteComponent,
});
const SCAN_TYPES = [
  "fuzzing",
  "sql_injection",
  "xss",
  "ssrf",
  "path_traversal",
] as const;
function RouteComponent() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Target URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Scan Types
        </label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {SCAN_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  setSelectedTypes(
                    e.target.checked
                      ? [...selectedTypes, type]
                      : selectedTypes.filter((t) => t !== type)
                  );
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={startScan}
          disabled={isScanning}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          {isScanning ? (
            <>
              <Settings className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Scan
            </>
          )}
        </button>
      </div>
    </>
  );
}
