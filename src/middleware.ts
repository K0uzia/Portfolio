import type { MiddlewareHandler } from "astro";
import { parsePathname } from "./lib/section-path";

type SiteLang = "fr" | "en";

function detectLangFromPath(pathname: string): SiteLang {
	if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
	if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
	// Par défaut : EN (home)
	return "en";
}

export const onRequest: MiddlewareHandler = async (ctx, next) => {
	(ctx.locals as { lang?: SiteLang }).lang = detectLangFromPath(ctx.url.pathname);

	// URLs "propres" (SPA) : /en/home, /fr/accueil, etc. → on sert la home.
	const { lang } = parsePathname(ctx.url.pathname);
	if (lang) {
		return ctx.rewrite(new URL("/", ctx.url));
	}

	return next();
};

