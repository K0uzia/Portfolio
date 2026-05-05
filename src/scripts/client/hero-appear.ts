import { gsap } from "./register-gsap";
import { reduce } from "./env";

const TEXT_DURATION = 0.34;
const CTA_DURATION = 0.34;
const STAGGER = 0.3;

export function initHeroAppear(signal: AbortSignal, delaySeconds = 0): void {
	if (typeof window === "undefined") return;
	if (reduce()) return;

	const ctx = gsap.context(() => {
		const text = document.querySelector<HTMLElement>("[data-hero-text]");
		const cta = document.querySelector<HTMLElement>("[data-hero-cta]");

		if (!text && !cta) return;

		const items = text
			? Array.from(text.querySelectorAll<HTMLElement>("h1, h2, h3, p"))
			: [];

		if (items.length) {
			gsap.killTweensOf(items);
			gsap.set(items, { opacity: 0, y: 24, scale: 0.985 });
		}
		if (cta) {
			gsap.killTweensOf(cta);
			gsap.set(cta, { opacity: 0, y: 24, scale: 0.985 });
		}

		const tl = gsap.timeline({
			defaults: { ease: "power3.out" },
			delay: Math.max(0, delaySeconds),
		});

		if (items.length) {
			tl.to(items, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: TEXT_DURATION,
				stagger: STAGGER,
				overwrite: true,
			});
		}

		// Le bouton arrive après la fin du texte.
		if (cta) {
			tl.to(
				cta,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: CTA_DURATION,
					overwrite: true,
				},
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

