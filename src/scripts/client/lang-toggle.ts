const STORAGE_KEY = "portfolio-lang";

function syncMetaAndTitles(fr: boolean) {
	const html = document.documentElement;
	const titleEn = html.dataset.titleEn ?? "";
	const titleFr = html.dataset.titleFr ?? "";
	const descEn = html.dataset.descriptionEn ?? "";
	const descFr = html.dataset.descriptionFr ?? "";
	document.title = fr ? titleFr : titleEn;
	const meta = document.querySelector('meta[name="description"]');
	if (meta) meta.setAttribute("content", fr ? descFr : descEn);

	document.querySelectorAll<HTMLElement>("[data-i18n-title-en]").forEach((el) => {
		const en = el.dataset.i18nTitleEn ?? "";
		const frT = el.dataset.i18nTitleFr ?? "";
		el.setAttribute("data-tooltip", fr ? frT : en);
		el.removeAttribute("title");
	});

	document.querySelectorAll<HTMLElement>("[data-i18n-aria-en]").forEach((el) => {
		const en = el.dataset.i18nAriaEn ?? "";
		const frT = el.dataset.i18nAriaFr ?? "";
		el.setAttribute("aria-label", fr ? frT : en);
	});
}

function syncLangSwitchButtons(fr: boolean) {
	document.querySelectorAll<HTMLElement>("[data-lang-switch]").forEach((root) => {
		const en = root.querySelector<HTMLButtonElement>('[data-lang-pick="en"]');
		const frBtn = root.querySelector<HTMLButtonElement>('[data-lang-pick="fr"]');
		if (en) {
			if (fr) en.removeAttribute("aria-current");
			else en.setAttribute("aria-current", "true");
		}
		if (frBtn) {
			if (fr) frBtn.setAttribute("aria-current", "true");
			else frBtn.removeAttribute("aria-current");
		}
	});
}

export function applyDocumentLang(fr: boolean) {
	if (fr) {
		document.documentElement.setAttribute("data-lang", "fr");
		document.documentElement.lang = "fr";
	} else {
		document.documentElement.removeAttribute("data-lang");
		document.documentElement.lang = "en";
	}
	syncMetaAndTitles(fr);
	syncLangSwitchButtons(fr);
}

export function initLangToggle(signal: AbortSignal) {
	const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-lang-switch]"));
	if (roots.length === 0) return;

	const stored = localStorage.getItem(STORAGE_KEY);
	const fr = stored === null ? true : stored === "fr";
	applyDocumentLang(fr);

	roots.forEach((root) => {
		root.addEventListener(
			"click",
			(e) => {
				const t = (e.target as HTMLElement | null)?.closest("[data-lang-pick]");
				if (!(t instanceof HTMLButtonElement)) return;
				const pick = t.dataset.langPick;
				if (pick !== "en" && pick !== "fr") return;
				const nextFr = pick === "fr";
				applyDocumentLang(nextFr);
				localStorage.setItem(STORAGE_KEY, nextFr ? "fr" : "en");
			},
			{ signal },
		);
	});
}
