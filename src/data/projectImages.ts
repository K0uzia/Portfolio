/**
 * Images par projet : une seule source pour la vignette carte et la lightbox.
 *
 * Règles :
 * - `gallery[0]` = image affichée sur la carte (aperçu).
 * - Les entrées suivantes = vues supplémentaires uniquement dans le carrousel.
 */
import type { ImageMetadata } from "astro";
import project1 from "../images/projects/project1.png";
import project1Vue2 from "../images/projects/project1Vue2.png";
import project1Vue3 from "../images/projects/project1Vue3.png";
import project1Vue4 from "../images/projects/project1Vue4.png";
import project1Vue5 from "../images/projects/project1Vue5.png";
import project1Vue6 from "../images/projects/project1Vue6.png";

import calPreview from "../images/projects/comingsoon.png";

import portfolioPreview from "../images/projects/project3.png";

export type ProjectId = 1 | 2 | 3;

/** Tableau par projet : [couverture, ...slides optionnels] */
export const projectImages: Record<ProjectId, ImageMetadata[]> = {
	1: [project1, project1Vue2, project1Vue3, project1Vue4, project1Vue5, project1Vue6],
	2: [portfolioPreview],
	3: [calPreview],
};

export function getProjectCover(id: ProjectId): ImageMetadata {
	const list = projectImages[id];
	if (!list?.length) {
		throw new Error(`[projectImages] Aucune image pour le projet ${id}`);
	}
	return list[0];
}

export function getProjectGallery(id: ProjectId): ImageMetadata[] {
	return projectImages[id];
}
