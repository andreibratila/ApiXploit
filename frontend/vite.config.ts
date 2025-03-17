import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
