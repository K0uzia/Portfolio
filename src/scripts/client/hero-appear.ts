import { gsap } from "./register-gsap";
import { reduce } from "./env";

// UI: on reste dans une fenêtre courte (0.15–0.25s) pour éviter l'effet "lent puis snap".
const TEXT_DURATION = 0.22;
const CTA_DURATION = 0.18;
const STAGGER = 0.12;

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
			// Évite tout conflit Tailwind (classes "pré-anim") vs GSAP.
			cta.classList.remove("motion-safe:opacity-0");
			cta.classList.remove("motion-safe:translate-y-6");
			gsap.killTweensOf(cta);
			gsap.set(cta, { opacity: 0, y: 16, scale: 0.985, force3D: true, willChange: "transform" });
		}

		const tl = gsap.timeline({
			defaults: { ease: "power2.out" },
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
					// Mouvement linéaire (pas d'accélération / décélération).
					ease: "none",
					overwrite: true,
					onComplete: () => {
						// Nettoie les styles inline posés par GSAP (et laisse Tailwind gérer les hovers).
						gsap.set(cta, { clearProps: "opacity,transform,willChange" });
					},
				},
				// Réduit l'attente après le texte : léger overlap avec la fin.
				">-0.10",
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

