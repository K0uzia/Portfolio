import { gsap, ScrollTrigger } from "./register-gsap";
import { reduce } from "./env";

const IN_DURATION = 0.34;
const OUT_DURATION = 0.22;
const TITLE_DURATION = 0.34;

export function initWorkProjectsAppear(signal: AbortSignal): void {
	if (typeof window === "undefined") return;
	if (reduce()) return;

	const ctx = gsap.context(() => {
		const projects = Array.from(
			document.querySelectorAll<HTMLElement>("[data-work-project]"),
		);
		if (projects.length === 0) return;

		const firstProject = projects[0] ?? null;
		const lastProject = projects[projects.length - 1] ?? null;

		const workSection = document.getElementById("work");
		const workLine =
			workSection?.querySelector<HTMLElement>("[data-work-line]") ?? null;
		const workTitle =
			workSection?.querySelector<HTMLElement>("[data-work-title]") ?? null;

		if (workSection && workTitle) {
			gsap.killTweensOf(workTitle);
			gsap.set(workTitle, { opacity: 0, y: 24, scale: 0.985 });

			const stTitle = ScrollTrigger.create({
				trigger: workSection,
				start: "top 70%",
				once: true,
				onEnter: () => {
					gsap.to(workTitle, {
						opacity: 1,
						y: 0,
						scale: 1,
						duration: TITLE_DURATION,
						ease: "power3.out",
						overwrite: true,
					});
				},
			});

			signal.addEventListener(
				"abort",
				() => {
					stTitle.kill();
				},
				{ once: true },
			);
		}

		if (workSection && workLine && firstProject && lastProject) {
			gsap.killTweensOf(workLine);
			gsap.set(workLine, { scaleY: 0, transformOrigin: "top" });

			const lineTween = gsap.to(workLine, {
				scaleY: 1,
				ease: "none",
				scrollTrigger: {
					// Ne démarre qu’au moment où le 1er projet commence à entrer.
					trigger: firstProject,
					start: "top 80%",
					// Progression jusqu’au dernier projet.
					endTrigger: lastProject,
					end: "bottom 20%",
					scrub: true,
				},
			});

			signal.addEventListener(
				"abort",
				() => {
					lineTween.scrollTrigger?.kill();
					lineTween.kill();
				},
				{ once: true },
			);
		}

		projects.forEach((el) => {
			gsap.killTweensOf(el);
			gsap.set(el, { opacity: 0, y: 40 });

			const st = ScrollTrigger.create({
				trigger: el,
				start: "top 80%",
				end: "bottom 20%",
				onEnter: () => {
					gsap.to(el, {
						opacity: 1,
						y: 0,
						duration: IN_DURATION,
						ease: "power3.out",
						overwrite: true,
					});
				},
				onLeave: () => {
					gsap.to(el, {
						opacity: 0,
						y: -24,
						duration: OUT_DURATION,
						ease: "power2.in",
						overwrite: true,
					});
				},
				onEnterBack: () => {
					gsap.to(el, {
						opacity: 1,
						y: 0,
						duration: IN_DURATION,
						ease: "power3.out",
						overwrite: true,
					});
				},
				onLeaveBack: () => {
					gsap.to(el, {
						opacity: 0,
						y: 40,
						duration: OUT_DURATION,
						ease: "power2.in",
						overwrite: true,
					});
				},
			});

			signal.addEventListener(
				"abort",
				() => {
					st.kill();
				},
				{ once: true },
			);
		});
	});

	signal.addEventListener(
		"abort",
		() => {
			ctx.revert();
		},
		{ once: true },
	);
}

