import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  preview: {
    port: 8080,
  },
});
