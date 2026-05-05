import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
    site: "https://kouziaeff-alexandre.netlify.app",
    base: "/",
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [sitemap()],
});
