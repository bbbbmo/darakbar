import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // tailwindcss 설정
import react from "@vitejs/plugin-react";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
