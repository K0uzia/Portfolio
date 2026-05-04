/**
 * Galerie lightbox : translation GSAP sur la bande (fiable dans <dialog>),
 * molette avec accumulateur, pastilles, verrouillage scroll page.
 * Boucle 1er ↔ dernier : clones en tête / fin de bande + repositionnement sans tween après l’aller sur le clone.
 */
import { gsap, ScrollTrigger } from "./register-gsap";
import { refreshImageLoadersIn } from "./image-loader";

const NAV_SECTION_IDS = new Set(["home", "about", "work", "contact"]);

const UI_DURATION = 0.22;
/** Delta cumulé (px) pour une slide ; plus haut = moins sensible. */
const WHEEL_STEP_ACCUM = 260;

function isReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function trackFallbackHeight(): number {
	return typeof window !== "undefined" ? window.innerHeight * 0.5 : 400;
}

function wheelPixels(e: WheelEvent): number {
	let dy = e.deltaY;
	let dx = e.deltaX;
	if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
		dy *= 16;
		dx *= 16;
	} else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
		const p = trackFallbackHeight();
		dy *= p;
		dx *= p;
	}
	return dy + dx;
}

function syncDotsFromIndex(
	index: number,
	dots: NodeListOf<HTMLButtonElement>,
): void {
	dots.forEach((dot, i) => {
		const on = i === index;
		dot.classList.toggle("bg-amber-500", on);
		dot.classList.toggle("ring-2", on);
		dot.classList.toggle("ring-amber-400/60", on);
		dot.classList.toggle("bg-white/35", !on);
		dot.setAttribute("aria-current", on ? "true" : "false");
	});
}

let lockedScrollY = 0;

function lockPageScroll(): void {
	lockedScrollY = window.scrollY;
	document.body.style.position = "fixed";
	document.body.style.top = `-${lockedScrollY}px`;
	document.body.style.left = "0";
	document.body.style.right = "0";
	document.body.style.width = "100%";
	document.body.style.overflow = "hidden";
}

function unlockPageScroll(): void {
	document.body.style.position = "";
	document.body.style.top = "";
	document.body.style.left = "";
	document.body.style.right = "";
	document.body.style.width = "";
	document.body.style.overflow = "";
	window.scrollTo(0, lockedScrollY);
}

/** Aligné sur `nav-rail.ts` : garde l’entrée active pendant que le body fixed fait croire à ScrollTrigger qu’on est en haut (#home). */
function readActiveNavSection(): string {
	const active = document.querySelector<HTMLAnchorElement>(
		"a[data-nav-hash].is-active",
	);
	const fromDom = active?.dataset.navHash?.toLowerCase();
	if (fromDom && NAV_SECTION_IDS.has(fromDom)) return fromDom;
	let h = (window.location.hash || "#home").replace(/^#/, "").toLowerCase();
	if (!NAV_SECTION_IDS.has(h)) h = "home";
	return h;
}

function applyNavActiveSection(id: string): void {
	const nid = NAV_SECTION_IDS.has(id.toLowerCase())
		? id.toLowerCase()
		: "home";
	const links = document.querySelectorAll<HTMLAnchorElement>("a[data-nav-hash]");
	for (const a of links) {
		if (a.dataset.navHash === nid) {
			a.classList.add("is-active");
			a.setAttribute("aria-current", "true");
		} else {
			a.classList.remove("is-active");
			a.removeAttribute("aria-current");
		}
	}
}

function wireDialog(dialog: HTMLDialogElement): void {
	const id = dialog.dataset.projectGalleryDialog;
	if (!id) return;

	const trigger = document.querySelector<HTMLButtonElement>(
		`[data-project-gallery-open="${id}"]`,
	);
	const viewport = dialog.querySelector<HTMLElement>("[data-gallery-viewport]");
	const strip = dialog.querySelector<HTMLElement>("[data-gallery-strip]");
	const slideEls = strip?.querySelectorAll<HTMLElement>("[data-gallery-slide]");
	const dismiss = dialog.querySelector<HTMLElement>("[data-gallery-dismiss]");
	const dots = dialog.querySelectorAll<HTMLButtonElement>("[data-gallery-dot]");

	if (!viewport || !strip || !slideEls || slideEls.length === 0) return;

	const realCount =
		Number.parseInt(dialog.dataset.galleryRealSlideCount ?? "", 10) ||
		slideEls.length;
	const useWrap = realCount > 1 && slideEls.length === realCount + 2;

	let currentIndex = 0;
	/** Indice étendu (clone gauche = 0, diapos réelles 1..realCount, clone droit = realCount+1). */
	let extendedIndex = useWrap ? 1 : 0;
	let wheelAccum = 0;
	let resizeObs: ResizeObserver | null = null;

	const layoutStripWidths = (): number => {
		const w = viewport.clientWidth;
		if (w <= 0) return 0;
		slideEls.forEach((el) => {
			el.style.width = `${w}px`;
		});
		gsap.set(strip, { width: w * slideEls.length });
		return w;
	};

	const tweenStripX = (
		x: number,
		animate: boolean,
		onComplete?: () => void,
	): void => {
		const dur =
			isReducedMotion() || !animate ? 0 : UI_DURATION;
		gsap.killTweensOf(strip);
		if (dur > 0) {
			gsap.to(strip, {
				x,
				duration: dur,
				ease: "power2.out",
				onComplete,
			});
		} else {
			gsap.set(strip, { x });
			onComplete?.();
		}
	};

	const goTo = (nextIndex: number, animate: boolean): void => {
		currentIndex = Math.max(0, Math.min(realCount - 1, nextIndex));
		const w = layoutStripWidths();
		if (w <= 0) return;
		if (useWrap) {
			extendedIndex = currentIndex + 1;
			const x = -extendedIndex * w;
			tweenStripX(x, animate, () => {
				syncDotsFromIndex(currentIndex, dots);
			});
		} else {
			const x = -currentIndex * w;
			tweenStripX(x, animate, () => {
				syncDotsFromIndex(currentIndex, dots);
			});
		}
	};

	const open = (): void => {
		wheelAccum = 0;
		currentIndex = 0;
		extendedIndex = useWrap ? 1 : 0;
		const savedNav = readActiveNavSection();
		ScrollTrigger.disable();
		lockPageScroll();
		applyNavActiveSection(savedNav);
		dialog.showModal();
		trigger?.setAttribute("aria-expanded", "true");

		requestAnimationFrame(() => {
			const w = layoutStripWidths();
			if (useWrap && w > 0) {
				gsap.killTweensOf(strip);
				gsap.set(strip, { x: -w });
			} else {
				gsap.killTweensOf(strip);
				gsap.set(strip, { x: 0 });
			}
			syncDotsFromIndex(0, dots);

			resizeObs?.disconnect();
			resizeObs = new ResizeObserver(() => {
				const rw = layoutStripWidths();
				if (rw <= 0) return;
				gsap.killTweensOf(strip);
				const x = useWrap ? -extendedIndex * rw : -currentIndex * rw;
				gsap.set(strip, { x });
			});
			resizeObs.observe(viewport);

			refreshImageLoadersIn(dialog);
		});
	};

	dialog.addEventListener("close", () => {
		resizeObs?.disconnect();
		resizeObs = null;
		gsap.killTweensOf(strip);
		gsap.set(strip, { x: 0 });
		wheelAccum = 0;
		currentIndex = 0;
		extendedIndex = useWrap ? 1 : 0;
		unlockPageScroll();
		ScrollTrigger.enable();
		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});
		trigger?.setAttribute("aria-expanded", "false");
		trigger?.focus();
	});

	trigger?.addEventListener("click", open);

	/**
	 * Fermer sauf clic sur une image ou une pastille (pas la zone lettre autour de l’image,
	 * ni le fond — le fond touche `data-gallery-dismiss` ou le dialogue hors « safe »).
	 */
	function clickKeepsGalleryOpen(target: EventTarget | null): boolean {
		const el = target as HTMLElement | null;
		if (!el) return false;
		if (el.closest("[data-gallery-dot]")) return true;
		const img = el.closest("[data-gallery-slide] img");
		return Boolean(img);
	}

	dismiss?.addEventListener("click", () => {
		dialog.close();
	});

	dialog.addEventListener("click", (e) => {
		if (clickKeepsGalleryOpen(e.target)) return;
		dialog.close();
	});

	dialog.addEventListener(
		"wheel",
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			if (realCount <= 1) return;

			const delta = wheelPixels(e);
			if (Math.abs(delta) < 2) return;

			wheelAccum += delta;

			if (wheelAccum >= WHEEL_STEP_ACCUM) {
				const w = layoutStripWidths();
				if (w <= 0) {
					wheelAccum = 0;
					return;
				}

				if (useWrap) {
					if (extendedIndex === realCount) {
						const targetX = -(realCount + 1) * w;
						tweenStripX(targetX, true, () => {
							gsap.set(strip, { x: -w });
							extendedIndex = 1;
							currentIndex = 0;
							syncDotsFromIndex(0, dots);
						});
					} else {
						const next = extendedIndex + 1;
						tweenStripX(-next * w, true, () => {
							extendedIndex = next;
							currentIndex = next - 1;
							syncDotsFromIndex(currentIndex, dots);
						});
					}
				} else {
					if (currentIndex < realCount - 1) {
						goTo(currentIndex + 1, true);
					} else {
						goTo(0, true);
					}
				}
				wheelAccum = 0;
			} else if (wheelAccum <= -WHEEL_STEP_ACCUM) {
				const w = layoutStripWidths();
				if (w <= 0) {
					wheelAccum = 0;
					return;
				}

				if (useWrap) {
					if (extendedIndex === 1) {
						tweenStripX(0, true, () => {
							gsap.set(strip, { x: -realCount * w });
							extendedIndex = realCount;
							currentIndex = realCount - 1;
							syncDotsFromIndex(currentIndex, dots);
						});
					} else {
						const next = extendedIndex - 1;
						tweenStripX(-next * w, true, () => {
							extendedIndex = next;
							currentIndex = next - 1;
							syncDotsFromIndex(currentIndex, dots);
						});
					}
				} else {
					if (currentIndex > 0) {
						goTo(currentIndex - 1, true);
					} else {
						goTo(realCount - 1, true);
					}
				}
				wheelAccum = 0;
			}
		},
		{ passive: false, capture: true },
	);

	dots.forEach((dot) => {
		const idx = Number(dot.dataset.galleryDotIndex ?? "0");
		dot.addEventListener("click", () => {
			goTo(idx, true);
		});
	});
}

function initProjectGalleries(): void {
	document
		.querySelectorAll<HTMLDialogElement>("dialog[data-project-gallery-dialog]")
		.forEach(wireDialog);
}

initProjectGalleries();
