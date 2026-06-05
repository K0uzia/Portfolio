/**
 * Textes carte projet + alt vignette : relie `site.ENconfig` / `site.FRconfig`
 * (`work`) aux composants `project1|2|3` et `ProjectWorkGallery`.
 */
import type { ProjectId } from "../data/projectImages.ts";
import { work as workEn } from "../site.ENconfig.ts";
import { work as workFr } from "../site.FRconfig.ts";

export type WorkLangPair = { en: string; fr: string };

export function getProjectCardTitle(project: ProjectId): WorkLangPair {
	switch (project) {
		case 1:
			return { en: workEn.workCardTitle, fr: workFr.workCardTitle };
		case 2:
			return { en: workEn.workCard2Title, fr: workFr.workCard2Title };
		case 3:
			return { en: workEn.workCard3Title, fr: workFr.workCard3Title };
	}
}

export function getProjectCardDescriptionLines(
	project: ProjectId,
): readonly WorkLangPair[] {
	switch (project) {
		case 1:
			return [
				{
					en: workEn.workCardDescriptionLine1,
					fr: workFr.workCardDescriptionLine1,
				},
				{
					en: workEn.workCardDescriptionLine2,
					fr: workFr.workCardDescriptionLine2,
				},
				{
					en: workEn.workCardDescriptionLine3,
					fr: workFr.workCardDescriptionLine3,
				},
				{
					en: workEn.workCardDescriptionLine4,
					fr: workFr.workCardDescriptionLine4,
				},
				{
					en: workEn.workCardDescriptionLine5,
					fr: workFr.workCardDescriptionLine5,
				},
				{
					en: workEn.workCardDescriptionLine6,
					fr: workFr.workCardDescriptionLine6,
				},
			];
		case 2:
			return [
				{
					en: workEn.workCard2DescriptionLine1,
					fr: workFr.workCard2DescriptionLine1,
				},
				{
					en: workEn.workCard2DescriptionLine2,
					fr: workFr.workCard2DescriptionLine2,
				},
				{
					en: workEn.workCard2DescriptionLine3,
					fr: workFr.workCard2DescriptionLine3,
				},
			];
		case 3:
			return [
				{
					en: workEn.workCard3DescriptionLine1,
					fr: workFr.workCard3DescriptionLine1,
				},
				{
					en: workEn.workCard3DescriptionLine2,
					fr: workFr.workCard3DescriptionLine2,
				},
				{
					en: workEn.workCard3DescriptionLine3,
					fr: workFr.workCard3DescriptionLine3,
				},
			];
	}
}

export function getProjectImageAlt(project: ProjectId): WorkLangPair {
	switch (project) {
		case 1:
			return { en: workEn.workImageAlt1, fr: workFr.workImageAlt1 };
		case 2:
			return { en: workEn.workImageAlt2, fr: workFr.workImageAlt2 };
		case 3:
			return { en: workEn.workImageAlt3, fr: workFr.workImageAlt3 };
	}
}
