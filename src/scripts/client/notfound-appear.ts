import { gsap } from "./register-gsap";
import { reduce } from "./env";

const ITEM_DURATION = 0.34;
const STAGGER = 0.1;
const NAVSIDE_DELAY = 1; // cohérent avec le hero (boot.ts)

export function initNotFoundAppear(signal: AbortSignal): void {
	if (typeof window === "undefined") return;
	if (reduce()) return;

	const ctx = gsap.context(() => {
		const items = Array.from(
			document.querySelectorAll<HTMLElement>("[data-404-item]"),
		);
		if (items.length === 0) return;

		const backHome = document.querySelector<HTMLElement>("[data-404-backhome]");
		const arrow = document.querySelector<HTMLElement>("[data-404-arrow]");

		gsap.killTweensOf(items);
		gsap.set(items, { opacity: 0, y: 24, scale: 0.985 });

		const tl = gsap.timeline({
			defaults: { ease: "power3.out" },
			delay: NAVSIDE_DELAY,
		});

		tl.to(items, {
			opacity: 1,
			y: 0,
			scale: 1,
			duration: ITEM_DURATION,
			stagger: STAGGER,
			overwrite: true,
		});

		if (backHome && arrow) {
			const onEnter = () => {
				gsap.killTweensOf(arrow);
				gsap.to(arrow, {
					x: -6,
					duration: 0.18,
					ease: "power2.out",
					yoyo: true,
					repeat: 1,
					overwrite: true,
				});
			};
			backHome.addEventListener("mouseenter", onEnter);
			backHome.addEventListener("focus", onEnter);
			signal.addEventListener(
				"abort",
				() => {
					backHome.removeEventListener("mouseenter", onEnter);
					backHome.removeEventListener("focus", onEnter);
				},
				{ once: true },
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

