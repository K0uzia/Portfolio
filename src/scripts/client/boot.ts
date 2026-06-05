import "./register-gsap";
import { gsap, ScrollTrigger } from "./register-gsap";
import { killNavRail, initNavRail } from "./nav-rail";
import { killStackTagChipsFx, initStackTagChips } from "./stack-chips";
import { initLangToggle } from "./lang-toggle";
import { initThemeToggle } from "./theme-toggle";
import { initTooltips } from "./tooltip";
import { initMobileMenu } from "./mobile-menu";
import { initImageLoaders } from "./image-loader";
import { initNavsideAppear } from "./navside-appear";
import { initHeroAppear } from "./hero-appear";
import { initAboutAppear } from "./about-appear";
import { initWorkProjectsAppear } from "./work-projects-appear";
import { initNotFoundAppear } from "./notfound-appear";

let cleanupBoot: (() => void) | null = null;

function revealNavsideStatic(): void {
	// La navside a des classes `motion-safe:opacity-0` / `motion-safe:translate-*`
	// prévues pour l'animation d'entrée. Sur la 404 on skip l'anim, donc on force
	// l'état visible immédiatement.
	const els = Array.from(
		document.querySelectorAll<HTMLElement>(
			[
				'[data-nav-appear="top-left"]',
				'[data-nav-appear="top-right"]',
				'[data-nav-appear="bottom-left"]',
				'[data-nav-appear="bottom-right"]',
				"#nav-rail > *",
			].join(","),
		),
	);
	if (els.length === 0) return;
	gsap.killTweensOf(els);
	// IMPORTANT: ne pas `clearProps: "transform"` ici, sinon on retombe sur les
	// classes Tailwind `motion-safe:-translate-*` et la nav reste décalée.
	gsap.set(els, { opacity: 1, x: 0, y: 0 });
}

export function boot() {
	cleanupBoot?.();

	killStackTagChipsFx();
	killNavRail();

	const ac = new AbortController();
	cleanupBoot = () => {
		ac.abort();
		killStackTagChipsFx();
		killNavRail();
	};

	initThemeToggle(ac.signal);
	initLangToggle(ac.signal);
	initTooltips(ac.signal);
	initMobileMenu(ac.signal);
	const is404 = Boolean(document.querySelector('[data-page="404"]'));
	if (!is404) initNavsideAppear(ac.signal);
	else revealNavsideStatic();
	// Attend la fin de la séquence navside (liens + séparateurs + blocs).
	initHeroAppear(ac.signal, 1);
	initAboutAppear(ac.signal);
	initWorkProjectsAppear(ac.signal);
	initNotFoundAppear(ac.signal);
	initNavRail();
	initImageLoaders();
	initStackTagChips();

	requestAnimationFrame(() => {
		ScrollTrigger.refresh();
	});
}
