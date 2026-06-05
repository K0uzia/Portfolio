import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

function normalizeBase(base) {
    if (!base || base === "/")
        return "/";
    return base.endsWith("/") ? base : `${base}/`;
}

function resolveBase() {
    if (process.env.ASTRO_BASE)
        return normalizeBase(process.env.ASTRO_BASE);
    if (process.env.DEPLOY_TARGET !== "github-pages")
        return "/";
    const repo = process.env.GITHUB_REPOSITORY;
    if (!repo)
        return "/";
    const [owner, name] = repo.split("/");
    if (!owner || !name)
        return "/";
    if (name.toLowerCase() === `${owner.toLowerCase()}.github.io`)
        return "/";
    return normalizeBase(`/${name}`);
}

function resolveSite() {
    if (process.env.ASTRO_SITE)
        return process.env.ASTRO_SITE.replace(/\/$/, "");
    if (process.env.DEPLOY_TARGET !== "github-pages")
        return undefined;
    const repo = process.env.GITHUB_REPOSITORY;
    if (!repo)
        return undefined;
    const [owner] = repo.split("/");
    return owner ? `https://${owner}.github.io` : undefined;
}

export default defineConfig({
    site: resolveSite(),
    base: resolveBase(),
    vite: {
        plugins: [tailwindcss()],
    },
});
