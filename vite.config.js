import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https:/ticket-sytem.vercel.app.com",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
