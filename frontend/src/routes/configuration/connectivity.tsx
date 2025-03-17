import {
  ConnectivityResult,
  testConnectivity,
} from "@/actions/configuration/conectivity-test.action";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Wifi, WifiOff } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/configuration/connectivity")({
  component: RouteComponent,
});

function RouteComponent() {
  const [state, formAction, isPending] = useActionState<ConnectivityResult[]>(
    testConnectivity,
    []
  );

  useEffect(() => {
    if (state.length > 0) {
      let errors = 0;
      state.forEach((result) => {
        if (result.error) {
          toast.error(`Error en ${result.endpoint}: ${result.error}`);
          errors++;
        }
      });
      if (errors === 0) {
        toast.success("Todos los endpoints están disponibles!");
      }
    }
  }, [state]); // Este efecto se ejecuta cada vez que 'state' cambia.

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">
          Internet Connectivity
        </h3>
        <button
          onClick={() =>
            startTransition(() => {
              formAction();
            })
          }
          disabled={isPending}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 mr-2" />
              Test Connection
            </>
          )}
        </button>
      </div>

      {state.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          {state.map((result) => (
            <div
              key={result.endpoint}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                {result.success ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className="text-gray-600">{result.endpoint}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={result.success ? "text-green-600" : "text-red-600"}
                >
                  {result.success ? `${result.latency}ms` : "Failed"}
                </span>
                {result.error && (
                  <span className="text-xs text-gray-500" title={result.error}>
                    ⓘ
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
