export type SiteLang = "en" | "fr";
export type SectionId = "home" | "about" | "work";

const EN_SLUG_BY_SECTION: Record<SectionId, string> = {
	home: "home",
	about: "about",
	work: "work",
};

const FR_SLUG_BY_SECTION: Record<SectionId, string> = {
	home: "accueil",
	about: "a-propos",
	work: "projets",
};

function splitPath(pathname: string): string[] {
	return pathname.split("/").filter(Boolean).map((s) => s.toLowerCase());
}

export function detectLangFromPathname(pathname: string): SiteLang | null {
	const [first] = splitPath(pathname);
	if (first === "en") return "en";
	if (first === "fr") return "fr";
	return null;
}

export function slugFromSection(lang: SiteLang, section: SectionId): string {
	return lang === "fr" ? FR_SLUG_BY_SECTION[section] : EN_SLUG_BY_SECTION[section];
}

export function sectionFromSlug(lang: SiteLang, slug: string): SectionId | null {
	const s = slug.toLowerCase();
	const table = lang === "fr" ? FR_SLUG_BY_SECTION : EN_SLUG_BY_SECTION;
	for (const [section, expected] of Object.entries(table) as Array<[SectionId, string]>) {
		if (s === expected) return section;
	}
	return null;
}

export function pathFor(lang: SiteLang, section: SectionId): string {
	return `/${lang}/${slugFromSection(lang, section)}`;
}

export function parsePathname(pathname: string): { lang: SiteLang | null; section: SectionId | null } {
	const parts = splitPath(pathname);
	const lang = parts[0] === "fr" || parts[0] === "en" ? (parts[0] as SiteLang) : null;
	if (!lang) return { lang: null, section: null };
	const slug = parts[1] ?? "";
	const section = slug ? sectionFromSlug(lang, slug) : null;
	return { lang, section };
}

