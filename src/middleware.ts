import type { MiddlewareHandler } from "astro";

type SiteLang = "fr" | "en";

function detectLangFromPath(pathname: string): SiteLang {
	if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
	if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
	// Par défaut : FR (défaut projet historique)
	return "fr";
}

export const onRequest: MiddlewareHandler = async (ctx, next) => {
	(ctx.locals as { lang?: SiteLang }).lang = detectLangFromPath(ctx.url.pathname);
	return next();
};

