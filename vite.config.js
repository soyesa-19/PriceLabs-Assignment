import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/dml/graphql": {
        target: "https://www.booking.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dml\/graphql/, "/dml/graphql"),
      },
    },
  },
  plugins: [react()],
});
