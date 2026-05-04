const STORAGE_KEY = "portfolio-theme";

/** Thème clair = pas de classe `dark` sur `<html>` (variantes Tailwind `dark:`). */
function applyTheme(light: boolean) {
	document.documentElement.classList.toggle("dark", !light);
}

export function initThemeToggle(signal: AbortSignal) {
	const input = document.getElementById("nav-theme-toggle");
	if (!(input instanceof HTMLInputElement)) return;

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") {
		input.checked = stored === "light";
	} else {
		input.checked = matchMedia("(prefers-color-scheme: light)").matches;
	}
	applyTheme(input.checked);

	input.addEventListener(
		"change",
		() => {
			const light = input.checked;
			applyTheme(light);
			localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
		},
		{ signal },
	);
}
