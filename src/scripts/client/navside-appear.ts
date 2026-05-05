import { gsap } from "./register-gsap";
import { reduce } from "./env";

const UI_DURATION = 0.24;
const OFFSET_Y = 40;
const STAGGER = 0.1;

export function initNavsideAppear(signal: AbortSignal): void {
	if (typeof window === "undefined") return;
	if (reduce()) return;

	const ctx = gsap.context(() => {
		const topLeft = document.querySelector<HTMLElement>(
			'[data-nav-appear="top-left"]',
		);
		const topRight = document.querySelector<HTMLElement>(
			'[data-nav-appear="top-right"]',
		);
		const bottomLeft = document.querySelector<HTMLElement>(
			'[data-nav-appear="bottom-left"]',
		);
		const bottomRight = document.querySelector<HTMLElement>(
			'[data-nav-appear="bottom-right"]',
		);

		const navRail = document.getElementById("nav-rail");
		const navItems = navRail
			? Array.from(navRail.children).filter(
					(el): el is HTMLElement =>
						el instanceof HTMLElement &&
						(el.tagName === "A" || el.tagName === "SPAN"),
				)
			: [];

		const sideSteps: Array<{ el: HTMLElement; fromY: number }> = [];
		// Après les liens : haut droite → bas droite → bas gauche
		if (topRight) sideSteps.push({ el: topRight, fromY: -OFFSET_Y });
		if (bottomRight) sideSteps.push({ el: bottomRight, fromY: OFFSET_Y });
		if (bottomLeft) sideSteps.push({ el: bottomLeft, fromY: OFFSET_Y });

		if (navItems.length === 0 && sideSteps.length === 0) return;

		if (navItems.length) {
			gsap.killTweensOf(navItems);
			gsap.set(navItems, { y: -18, opacity: 0 });
		}
		for (const s of sideSteps) {
			gsap.killTweensOf(s.el);
			gsap.set(s.el, { y: s.fromY, opacity: 0 });
		}

		const tl = gsap.timeline({
			defaults: { ease: "power3.out", duration: UI_DURATION },
		});

		// 01 → 02 → 03
		if (navItems.length) {
			tl.to(navItems, {
				y: 0,
				opacity: 1,
				stagger: STAGGER,
				overwrite: true,
			});
		}

		// Puis : top-right, bottom-right, bottom-left
		for (const s of sideSteps) {
			tl.to(
				s.el,
				{
					y: 0,
					opacity: 1,
					overwrite: true,
				},
				">+=0.08",
			);
		}
	});

	signal.addEventListener(
		"abort",
		() => {
			ctx.revert();
		},
		{ once: true },
	);
}

