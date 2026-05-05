import { gsap, ScrollTrigger } from "./register-gsap";
import { reduce } from "./env";

const TEXT_DURATION = 0.34;
const MEDIA_DURATION = 0.22;
const FRAME_STEP = 0.03;
const TEXT_STAGGER = 0.03;

export function initAboutAppear(signal: AbortSignal): void {
	if (typeof window === "undefined") return;
	if (reduce()) return;

	const ctx = gsap.context(() => {
		const section = document.getElementById("about");
		if (!(section instanceof HTMLElement)) return;

		const title = section.querySelector<HTMLElement>("[data-about-title]");
		const body = section.querySelector<HTMLElement>("[data-about-body]");
		const media = section.querySelector<HTMLElement>("[data-about-media]");
		const frames = Array.from(
			section.querySelectorAll<HTMLElement>("[data-about-frame]"),
		);

		if (!title && !body && !media && frames.length === 0) return;

		const bodyItems = body
			? Array.from(body.querySelectorAll<HTMLElement>("p, span"))
			: [];

		const textItems = [
			...(title ? [title] : []),
			...bodyItems,
		].filter((el): el is HTMLElement => el instanceof HTMLElement);

		if (textItems.length) {
			gsap.killTweensOf(textItems);
			gsap.set(textItems, { opacity: 0, y: 24, scale: 0.985 });
		}
		if (media) gsap.set(media, { opacity: 0, x: 40 });
		if (frames.length) gsap.set(frames, { scale: 0 });

		const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

		if (textItems.length) {
			tl.to(textItems, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: TEXT_DURATION,
				stagger: TEXT_STAGGER,
				overwrite: true,
			});
		}

		if (media) {
			tl.to(
				media,
				{
					opacity: 1,
					x: 0,
					duration: MEDIA_DURATION,
					overwrite: true,
				},
			);
		}

		// Contours : progression 0 → 100% après l'image.
		if (frames.length) {
			const order = ["tl", "tr", "bl", "br"] as const;
			const sorted = order
				.map((k) => frames.find((el) => el.dataset.aboutFrame === k))
				.filter((el): el is HTMLElement => el instanceof HTMLElement);

			sorted.forEach((el, i) => {
				tl.to(
					el,
					{
						scale: 1,
						duration: 0.22,
						ease: "power2.out",
						overwrite: true,
					},
					`>+=${i === 0 ? 0.06 : FRAME_STEP}`,
				);
			});
		}

		const st = ScrollTrigger.create({
			trigger: section,
			start: "top 70%",
			once: true,
			onEnter: () => {
				tl.play(0);
			},
		});

		signal.addEventListener(
			"abort",
			() => {
				st.kill();
				tl.kill();
			},
			{ once: true },
		);
	});

	signal.addEventListener(
		"abort",
		() => {
			ctx.revert();
		},
		{ once: true },
	);
}

