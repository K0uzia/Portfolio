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

import project2 from "../images/projects/project2.png";
import project2Vue2 from "../images/projects/project2Vue2.png";
import project2Vue3 from "../images/projects/project2Vue3.png";

import project3 from "../images/projects/project3.png";
import project3Vue2 from "../images/projects/project3Vue2.png";
import project3Vue3 from "../images/projects/project3Vue3.png";

export type ProjectId = 1 | 2 | 3;

/** Tableau par projet : [couverture, ...slides optionnels] */
export const projectImages: Record<ProjectId, ImageMetadata[]> = {
	1: [project1, project1Vue2, project1Vue3, project1Vue4, project1Vue5, project1Vue6],
	2: [project2, project2Vue2, project2Vue3],
	3: [project3, project3Vue2, project3Vue3],
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
