import react from '@vitejs/plugin-react';
import path from "path"
import ViteRestart from "vite-plugin-restart";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";


export default () => ({
  plugins: [
    react(),
    ViteRestart({
      reload: ["./templates/**/*", "./src/**/*"],
    }),
    viteCompression(),
    visualizer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});