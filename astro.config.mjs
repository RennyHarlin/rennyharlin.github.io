// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  redirects: {
    "/tags": "/topics",
    "/blogs": "/",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
