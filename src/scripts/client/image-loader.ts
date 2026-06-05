/**
 * Loader (spinner) + fondu : toute image dans `[data-img-loader-frame]`
 * (galerie lightbox, cartes projets, about). Voir `ImageLoaderShell.astro`.
 */
export const IMAGE_LOADER_REVEAL_MS = 0.22;

function wireImageLoaderFrame(frame: HTMLElement): void {
	if (frame.dataset.imgLoaderWired === "1") return;
	const img = frame.querySelector<HTMLImageElement>("img");
	const loader = frame.querySelector<HTMLElement>("[data-img-loader]");
	if (!img || !loader) return;
	frame.dataset.imgLoaderWired = "1";

	const reveal = (): void => {
		img.classList.add("opacity-100");
		frame.setAttribute("aria-busy", "false");
		loader.classList.add("opacity-0", "pointer-events-none");
		window.setTimeout(() => {
			loader.classList.add("hidden");
		}, IMAGE_LOADER_REVEAL_MS * 1000);
	};

	const onError = (): void => {
		img.classList.add("opacity-100");
		frame.setAttribute("aria-busy", "false");
		loader.classList.add("hidden");
	};

	if (img.complete && img.naturalWidth > 0) {
		reveal();
	} else {
		img.addEventListener("load", reveal, { once: true });
		img.addEventListener("error", onError, { once: true });
	}
}

export function initImageLoaders(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>("[data-img-loader-frame]").forEach((frame) => {
		wireImageLoaderFrame(frame);
	});
}

/** Réaffiche le loader si besoin (réouverture lightbox, image pas encore en cache). */
export function refreshImageLoadersIn(root: HTMLElement): void {
	for (const frame of root.querySelectorAll<HTMLElement>("[data-img-loader-frame]")) {
		const img = frame.querySelector<HTMLImageElement>("img");
		const loader = frame.querySelector<HTMLElement>("[data-img-loader]");
		if (!img || !loader) continue;

		if (img.complete && img.naturalWidth > 0) {
			img.classList.add("opacity-100");
			loader.classList.add("hidden", "opacity-0", "pointer-events-none");
			frame.setAttribute("aria-busy", "false");
		} else {
			img.classList.remove("opacity-100");
			loader.classList.remove("hidden", "opacity-0", "pointer-events-none");
			frame.setAttribute("aria-busy", "true");
		}
	}
}
