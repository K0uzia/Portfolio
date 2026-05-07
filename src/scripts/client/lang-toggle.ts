import { LANG_STORAGE_KEY, storedPreferenceIsFr } from "../../lib/lang-storage";
import { gsap, ScrollTrigger } from "./register-gsap";
import { reduce } from "./env";
import { pathFor, type SectionId, type SiteLang } from "../../lib/section-path";

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

let stingerEl: HTMLDivElement | null = null;
let stingerDimEl: HTMLDivElement | null = null;
let stingerCaretEl: HTMLDivElement | null = null;
let stingerRingEl: HTMLDivElement | null = null;
let stingerDotEl: HTMLDivElement | null = null;
let stingerTween: gsap.core.Timeline | null = null;

function langFadeTargets(): HTMLElement[] {
	// On ne fade que les paires i18n (contenu texte) pour éviter un flash global.
	return Array.from(document.querySelectorAll<HTMLElement>(".i18n-pair"));
}

function ensureLangStinger(): HTMLDivElement {
	if (stingerEl && document.body.contains(stingerEl)) return stingerEl;

	const root = document.createElement("div");
	root.setAttribute("data-lang-stinger", "true");
	root.className = "fixed inset-0 z-[9999] pointer-events-none";

	// Voile doux + léger blur → sans flash.
	const dim = document.createElement("div");
	dim.setAttribute("data-lang-stinger-dim", "true");
	dim.className =
		"absolute inset-0 opacity-0 bg-zinc-950/5 dark:bg-black/20 backdrop-blur-[1px]";

	// Transition minimaliste/abstraite : anneau fin qui s'ouvre depuis le bouton.
	const ring = document.createElement("div");
	ring.setAttribute("data-lang-stinger-ring", "true");
	ring.className =
		"absolute left-0 top-0 h-16 w-16 rounded-full border border-indigo-600/55 opacity-0 dark:border-amber-500/55";
	ring.style.transform = "translate(-50%, -50%) scale(0.2)";
	ring.style.transformOrigin = "center";

	const dot = document.createElement("div");
	dot.setAttribute("data-lang-stinger-dot", "true");
	dot.className =
		"absolute left-0 top-0 h-2 w-2 rounded-full bg-indigo-600/70 opacity-0 dark:bg-amber-500/70";
	dot.style.transform = "translate(-50%, -50%) scale(1)";
	dot.style.transformOrigin = "center";

	root.appendChild(dim);
	root.appendChild(ring);
	root.appendChild(dot);
	document.body.appendChild(root);

	stingerEl = root;
	stingerDimEl = dim;
	stingerRingEl = ring;
	stingerDotEl = dot;
	return root;
}

function playLangStinger(nextFr: boolean, origin?: { x: number; y: number }) {
	// Empêche les doubles clics pendant la transition.
	if (stingerTween) return;

	const instant = reduce();
	if (instant) {
		const y = window.scrollY;
		applyDocumentLang(nextFr);
		localStorage.setItem(LANG_STORAGE_KEY, nextFr ? "fr" : "en");
		requestAnimationFrame(() => {
			window.scrollTo(0, y);
			ScrollTrigger.refresh();
		});
		return;
	}

	const el = ensureLangStinger();
	const dim = stingerDimEl;
	const ring = stingerRingEl;
	const dot = stingerDotEl;
	if (
		!(dim instanceof HTMLDivElement) ||
		!(ring instanceof HTMLDivElement) ||
		!(dot instanceof HTMLDivElement)
	) {
		applyDocumentLang(nextFr);
		localStorage.setItem(LANG_STORAGE_KEY, nextFr ? "fr" : "en");
		return;
	}
	// Durées UI (cf. règles projet) : 0.15–0.25s par tween.
	const IN = 0.15;
	const OUT = 0.25;

	const x = origin?.x ?? window.innerWidth / 2;
	const y = origin?.y ?? window.innerHeight / 2;
	ring.style.left = `${x}px`;
	ring.style.top = `${y}px`;
	dot.style.left = `${x}px`;
	dot.style.top = `${y}px`;

	const fadeEls = langFadeTargets();

	gsap.set(dim, { opacity: 0 });
	gsap.set(ring, { opacity: 0, scale: 0.2 });
	gsap.set(dot, { opacity: 0, scale: 1 });
	if (fadeEls.length > 0) gsap.set(fadeEls, { opacity: 1 });

	stingerTween = gsap
		.timeline({
			defaults: { ease: "power2.inOut" },
			onComplete: () => {
				stingerTween = null;
				gsap.set(dim, { opacity: 0 });
				gsap.set(ring, { opacity: 0, scale: 0.2 });
				gsap.set(dot, { opacity: 0, scale: 1 });
				if (fadeEls.length > 0) gsap.set(fadeEls, { clearProps: "opacity" });
			},
		})
		// Phase 1 : ouverture (abstrait)
		.to(dim, { opacity: 1, duration: IN }, 0)
		.to(dot, { opacity: 1, duration: IN }, 0)
		// Accroche: l’anneau apparaît et “respire” légèrement avant l’expansion.
		.to(ring, { opacity: 1, scale: 1.05, duration: IN }, 0)
		.to(dot, { opacity: 0, duration: OUT }, IN * 0.35)
		.to(
			ring,
			{ scale: 18, opacity: 0, duration: OUT, ease: "power2.out" },
			IN * 0.35,
		)
		// Fondu texte i18n pour éviter le switch "sec".
		.to(
			fadeEls,
			{ opacity: 0, duration: IN, ease: "power2.out" },
			IN * 0.1,
		)
		.add(() => {
			const y = window.scrollY;
			applyDocumentLang(nextFr);
			localStorage.setItem(LANG_STORAGE_KEY, nextFr ? "fr" : "en");
			// URL propre : /en/home ou /fr/accueil (sans hash).
			const section = (document.documentElement.dataset.activeSection as SectionId | undefined) ?? "home";
			const lang: SiteLang = nextFr ? "fr" : "en";
			const next = pathFor(lang, section);
			try {
				const u = new URL(window.location.href);
				history.replaceState(null, "", `${next}${u.search}`);
			} catch {
				history.replaceState(null, "", next);
			}
			requestAnimationFrame(() => {
				window.scrollTo(0, y);
				ScrollTrigger.refresh();
			});
		})
		.to(fadeEls, { opacity: 1, duration: IN, ease: "power2.out" }, ">")
		// Phase 2 : dissipation du voile (sobre)
		.to(dim, { opacity: 0, duration: OUT }, ">-0.06");
}

export function initLangToggle(signal: AbortSignal) {
	const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-lang-switch]"));
	if (roots.length === 0) return;

	const fr = storedPreferenceIsFr();
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
				const r = t.getBoundingClientRect();
				playLangStinger(nextFr, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
			},
			{ signal },
		);
	});

	signal.addEventListener(
		"abort",
		() => {
			stingerTween?.kill();
			stingerTween = null;
			if (stingerEl) {
				stingerEl.remove();
				stingerEl = null;
			}
			stingerDimEl = null;
			stingerCaretEl = null;
			stingerRingEl = null;
			stingerDotEl = null;
		},
		{ once: true },
	);
}
