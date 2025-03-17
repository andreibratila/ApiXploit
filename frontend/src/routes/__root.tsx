import {
  createRootRoute,
  ErrorComponent,
  Outlet,
  useLoaderData,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import "../index.css";
import { NavbarComponents, NavbarTop } from "./-components";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";
import { Toaster } from "react-hot-toast";

import { getDocument } from "@/actions";
import { useAtackDictoniaryStore } from "@/store/useAtackDictoniaryStore";

export const Route = createRootRoute({
  loader: async () => {
    const data = await getDocument();
    console.log(data, "data in root loader");
    return data;
  },
  staleTime: Infinity,
  errorComponent: ({ error }: { error: Error | any }) => {
    let errorMessage = error;
    if (error.response.data) {
      errorMessage = error.response.data;
    }

    return <ErrorComponent error={errorMessage} />;
  },
  component: RootLayout,
});
function RootLayout() {
  const data = useLoaderData({ from: "__root__" });

  const loadDictionary = useAtackDictoniaryStore(
    (state) => state.loadDictionary
  );

  loadDictionary(data);
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" />
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <NavbarTop />
        <NavbarComponents />
      </div>

      <div className="max-w-7xl mx-auto my-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <ScrollTopButton />
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}
