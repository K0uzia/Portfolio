const STORAGE_KEY = "portfolio-theme";

/** Thème clair = pas de classe `dark` sur `<html>` (variantes Tailwind `dark:`). */
function applyTheme(light: boolean) {
	document.documentElement.classList.toggle("dark", !light);
}

function reduce() {
	return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function themeFadeTargets(): HTMLElement[] {
	// Même logique que le switch de langue : on fade le contenu i18n (texte) pour éviter un cut,
	// sans flasher toute l’UI (nav fixe, etc.).
	return Array.from(document.querySelectorAll<HTMLElement>(".i18n-pair"));
}

let stingerEl: HTMLDivElement | null = null;
let stingerDimEl: HTMLDivElement | null = null;
let stingerRingEl: HTMLDivElement | null = null;
let stingerDotEl: HTMLDivElement | null = null;
let stingerTween: import("gsap").gsap.core.Timeline | null = null;

async function getGsap() {
	const mod = await import("./register-gsap");
	return mod.gsap;
}

async function getScrollTrigger() {
	const mod = await import("./register-gsap");
	return mod.ScrollTrigger;
}

function ensureThemeStinger(): HTMLDivElement {
	if (stingerEl && document.body.contains(stingerEl)) return stingerEl;

	const root = document.createElement("div");
	root.setAttribute("data-theme-stinger", "true");
	root.className = "fixed inset-0 z-[9999] pointer-events-none";

	const dim = document.createElement("div");
	dim.setAttribute("data-theme-stinger-dim", "true");
	dim.className =
		"absolute inset-0 opacity-0 bg-zinc-950/5 dark:bg-black/20 backdrop-blur-[1px]";

	const ring = document.createElement("div");
	ring.setAttribute("data-theme-stinger-ring", "true");
	ring.className =
		"absolute left-0 top-0 h-16 w-16 rounded-full border border-indigo-600/55 opacity-0 dark:border-amber-500/55";
	ring.style.transform = "translate(-50%, -50%) scale(0.2)";
	ring.style.transformOrigin = "center";

	const dot = document.createElement("div");
	dot.setAttribute("data-theme-stinger-dot", "true");
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

async function playThemeStinger(light: boolean, origin?: { x: number; y: number }) {
	if (stingerTween) return;

	const instant = reduce();
	if (instant) {
		const y = window.scrollY;
		applyTheme(light);
		localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
		requestAnimationFrame(async () => {
			window.scrollTo(0, y);
			(await getScrollTrigger()).refresh();
		});
		return;
	}

	const gsap = await getGsap();
	const ScrollTrigger = await getScrollTrigger();

	const el = ensureThemeStinger();
	const dim = stingerDimEl;
	const ring = stingerRingEl;
	const dot = stingerDotEl;
	if (
		!(dim instanceof HTMLDivElement) ||
		!(ring instanceof HTMLDivElement) ||
		!(dot instanceof HTMLDivElement)
	) {
		applyTheme(light);
		localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
		return;
	}

	// Durées UI : 0.15–0.25s par tween.
	const IN = 0.15;
	const OUT = 0.25;

	const x = origin?.x ?? window.innerWidth / 2;
	const y = origin?.y ?? window.innerHeight / 2;
	ring.style.left = `${x}px`;
	ring.style.top = `${y}px`;
	dot.style.left = `${x}px`;
	dot.style.top = `${y}px`;

	const fadeEls = themeFadeTargets();

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
		.to(dim, { opacity: 1, duration: IN }, 0)
		.to(dot, { opacity: 1, duration: IN }, 0)
		.to(ring, { opacity: 1, scale: 1.05, duration: IN }, 0)
		.to(dot, { opacity: 0, duration: OUT }, IN * 0.35)
		.to(ring, { scale: 18, opacity: 0, duration: OUT, ease: "power2.out" }, IN * 0.35)
		.to(fadeEls, { opacity: 0, duration: IN, ease: "power2.out" }, IN * 0.2)
		.add(() => {
			const scrollY = window.scrollY;
			applyTheme(light);
			localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
			requestAnimationFrame(() => {
				window.scrollTo(0, scrollY);
				ScrollTrigger.refresh();
			});
		})
		.to(fadeEls, { opacity: 1, duration: IN, ease: "power2.out" }, ">")
		.to(dim, { opacity: 0, duration: OUT }, ">-0.06");
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
			const r = input.getBoundingClientRect();
			void playThemeStinger(light, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
		},
		{ signal },
	);

	signal.addEventListener(
		"abort",
		() => {
			if (!stingerEl) return;
			stingerTween?.kill();
			stingerTween = null;
			stingerEl.remove();
			stingerEl = null;
			stingerDimEl = null;
			stingerRingEl = null;
			stingerDotEl = null;
		},
		{ once: true },
	);
}
