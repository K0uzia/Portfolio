import { gsap } from "./register-gsap";
import { ScrollTrigger } from "./register-gsap";
import { reduce } from "./env";
import { parsePathname, pathFor, sectionFromSlug, type SectionId, type SiteLang } from "../../lib/section-path";

const SECTION_ORDER = ["home", "about", "work"] as const;

let activeScrollTween: gsap.core.Tween | null = null;
let navCtx: gsap.Context | null = null;
const disposers: (() => void)[] = [];

function setActiveLink(links: HTMLAnchorElement[], id: string) {
	for (const a of links) {
		if (a.dataset.navHash === id) {
			a.classList.add("is-active");
			a.setAttribute("aria-current", "true");
		} else {
			a.classList.remove("is-active");
			a.removeAttribute("aria-current");
		}
	}
}

function currentLangFromDocument(): SiteLang {
	return document.documentElement.getAttribute("data-lang") === "fr" ? "fr" : "en";
}

function replaceUrlSection(lang: SiteLang, section: SectionId) {
	const next = pathFor(lang, section);
	try {
		const u = new URL(window.location.href);
		history.replaceState(null, "", `${next}${u.search}`);
	} catch {
		history.replaceState(null, "", next);
	}
}

function scrollYToElement(el: HTMLElement) {
	return el.getBoundingClientRect().top + window.scrollY;
}

function isValidSectionId(id: string) {
	return (SECTION_ORDER as readonly string[]).includes(id);
}

function pickActiveSectionFromViewportCenter() {
	// Scrollspy "au centre" : on prend la section dont le centre est le plus
	// proche du centre du viewport. Ça évite un switch trop tôt.
	const viewportMid = window.scrollY + window.innerHeight / 2;
	let best: (typeof SECTION_ORDER)[number] = "home";
	let bestDist = Number.POSITIVE_INFINITY;

	for (const id of SECTION_ORDER) {
		const el = document.getElementById(id);
		if (!(el instanceof HTMLElement)) continue;
		const top = scrollYToElement(el);
		const h = el.offsetHeight || 1;
		const mid = top + h / 2;
		const dist = Math.abs(mid - viewportMid);
		if (dist < bestDist) {
			bestDist = dist;
			best = id;
		}
	}
	return best;
}

export function killNavRail() {
	activeScrollTween?.kill();
	activeScrollTween = null;
	navCtx?.revert();
	navCtx = null;
	for (const d of disposers.splice(0)) d();
}

export function initNavRail() {
	killNavRail();

	const navRail = document.getElementById("nav-rail");
	const navMobile = document.getElementById("nav-mobile");
	if (!navRail && !navMobile) return;

	const links = [
		...Array.from(navRail?.querySelectorAll("a[data-nav-hash]") ?? []),
		...Array.from(navMobile?.querySelectorAll("a[data-nav-hash]") ?? []),
	].filter((el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement);
	const valid = new Set<string>(SECTION_ORDER);

	function idFromPathOrFallback(): (typeof SECTION_ORDER)[number] {
		const { lang, section } = parsePathname(window.location.pathname);
		const fromPath = section;
		if (fromPath && valid.has(fromPath)) return fromPath;

		// Compat: si quelqu’un arrive encore via un vieux hash.
		let h = (window.location.hash || "#home").replace(/^#/, "").toLowerCase();
		if (valid.has(h)) return h as (typeof SECTION_ORDER)[number];
		return "home";
	}

	navCtx = gsap.context(() => {
		for (const id of SECTION_ORDER) {
			const el = document.getElementById(id);
			if (!(el instanceof HTMLElement)) continue;
			ScrollTrigger.create({
				trigger: el,
				// Actif quand la section traverse le centre du viewport.
				start: "top center",
				end: "bottom center",
				onEnter: () => {
					setActiveLink(links, id);
					(document.documentElement.dataset as { activeSection?: string }).activeSection = id;
					replaceUrlSection(currentLangFromDocument(), id);
				},
				onEnterBack: () => {
					setActiveLink(links, id);
					(document.documentElement.dataset as { activeSection?: string }).activeSection = id;
					replaceUrlSection(currentLangFromDocument(), id);
				},
			});
		}
	});

	const onNavClick = (e: MouseEvent) => {
		const t = (e.target as Element | null)?.closest?.("a[data-nav-hash]");
		if (!(t instanceof HTMLAnchorElement)) return;
		const id = (t.dataset.navHash ?? "").toLowerCase();
		if (!valid.has(id)) return;
		const target = document.getElementById(id);
		if (!(target instanceof HTMLElement)) return;
		if (e.button !== 0) return;
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

		e.preventDefault();
		const y = scrollYToElement(target);
		const instant = reduce();
		activeScrollTween?.kill();
		const proxy = { y: window.scrollY };
		activeScrollTween = gsap.to(proxy, {
			y,
			duration: instant ? 0.05 : 1.05,
			ease: "power2.inOut",
			overwrite: true,
			onUpdate: () => {
				window.scrollTo(0, proxy.y);
			},
			onComplete: () => {
				activeScrollTween = null;
				setActiveLink(links, id);
				(document.documentElement.dataset as { activeSection?: string }).activeSection = id;
				replaceUrlSection(currentLangFromDocument(), id as SectionId);
				ScrollTrigger.refresh();
			},
		});
	};
	document.addEventListener("click", onNavClick);
	disposers.push(() => document.removeEventListener("click", onNavClick));

	setActiveLink(links, idFromPathOrFallback());
	requestAnimationFrame(() => {
		ScrollTrigger.refresh();
		// Si l’URL contient une section (/en/work), on y va.
		const fromPath = idFromPathOrFallback();
		const target = document.getElementById(fromPath);
		if (target instanceof HTMLElement) {
			window.scrollTo(0, scrollYToElement(target));
			setActiveLink(links, fromPath);
			(document.documentElement.dataset as { activeSection?: string }).activeSection = fromPath;
			replaceUrlSection(currentLangFromDocument(), fromPath);
			return;
		}

		// Sinon on fait foi de la position réelle.
		const id = pickActiveSectionFromViewportCenter();
		setActiveLink(links, id);
		(document.documentElement.dataset as { activeSection?: string }).activeSection = id;
		replaceUrlSection(currentLangFromDocument(), id);
	});
}
