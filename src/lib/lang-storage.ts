/** Clé partagée : `lang-toggle.ts` + script inline dans `Layout.astro`. */
export const LANG_STORAGE_KEY = "portfolio-lang";

/**
 * Préférence FR depuis localStorage (même règle que `initLangToggle` : `null` → EN).
 */
export function storedPreferenceIsFr(): boolean {
	try {
		const stored = localStorage.getItem(LANG_STORAGE_KEY);
		return stored === null ? false : stored === "fr";
	} catch {
		return false;
	}
}
