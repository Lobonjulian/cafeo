import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    Icons({
      compiler: "raw",
    }),
  ],
  root: ".",
  publicDir: "assets",
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
