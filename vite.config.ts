import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/netflix-clone",
	build: { chunkSizeWarningLimit: 1024 },
	plugins: [react()],
});
