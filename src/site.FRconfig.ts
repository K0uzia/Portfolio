export const info = {
	name: "Alexandre Kouziaeff",
	job: "Designer·développeur",
	email: "kouziaeffa.pro@gmail.com",
	githubProfileUrl: "https://github.com/SandersonnDev",
	pitch: "Portfolio de Alexandre Kouziaeff, Développeur web et applications, du design au développement",
} as const;

export const nav = {
	/** Landmark `<nav>` (rail) */
	navAriaMain: "Navigation principale",
	/* Navigation */
	navHome: "Accueil",
	navAbout: "À propos",
	navWork: "Projets",
	/* Navigation links */
	navlinkHome: "#home",
	navlinkWork: "#work",
	navlinkAbout: "#about",
	/* Navigation Titles */
	navHomeTitle: "Aller à l'accueil",
	navWorkTitle: "Mes projets",
	navAboutTitle: "À propos de moi",
	/* Button Titles */
	buttonLinkedin: "Profil LinkedIn",
	buttonGithub: "Profil GitHub",
	buttonEmail: "M’écrire par e-mail",
	/** Toggle theme */
	titleSwitchTheme: "Changer de thème",
	toggleSwitchToLight: "Passer au thème clair",
	toggleSwitchToDark: "Passer au thème sombre",
	/* Lang Switch */
	titleSwitchLang: "Changer de langue",
	toggleSwitchToEn: "Passer en anglais",
	toggleSwitchToFr: "Passer en français",
} as const;

export const hero = {
	heroTitle: "Bonjour, je m’appelle",
	heroSubtitle: "Alexandre Kouziaeff",
	heroDescription:
		"Designer et développeur d’interfaces, de l’imprimé au web moderne",
	heroSubdescription:
		"Formé au design et à la chaîne graphique, avec une licence en ,",
	heroSubdescription2:
		"Je développe des applications web de bout en bout, de la conception au déploiement en production pour des entreprises de services du numérique",
	heroButton: "Voir mes projets",
	heroLink1:
		"https://www.onisep.fr/ressources/univers-metier/metiers/ui-designer-concepteur-conceptrice-d-interface-utilisateur",
	heroLink2:
		"https://www.apec.fr/faq.html?question=que-signifient-les-termes-esn-et-ssii",
	heroLink1Text: "CDUI",
	heroLink2Text: "ESN",
	heroLink1Title: "Qu’est-ce que le CDUI ?",
	heroLink2Title: "Qu’est-ce qu’une ESN ?",
} as const;

export const about = {
    aboutTitle: "02. À propos de moi",
    aboutDescription: "Bonjour ! Je m’appelle Alexandre Kouziaeff et j’aime créer des expériences web utiles, claires et bien pensées.",
    aboutDescription2: "Mon parcours a commencé en infographie et mise en page, avant d’évoluer vers la conception d’interfaces et le développement web.",
    aboutDescription3: "Au fil du temps, j’ai travaillé sur des sites, du support utilisateur et des solutions techniques internes, avec une attention particulière portée à l’ergonomie, à la performance et à la qualité visuelle.",
    aboutDescription4: "Aujourd’hui, je continue d’apprendre et d’affiner mes compétences pour concevoir des projets adaptés aux vrais besoins.",
	aboutDescription5: "Voici quelques technologies sur lesquelles j’ai récemment travaillé :",
	aboutDescription5Stack: "Astro",
	aboutDescription5Stack2: "Tailwind CSS",
	aboutDescription5Stack3: "TypeScript",
	aboutDescription5Stack4: "ElectronJS"
} as const;

export const work = {
	workTitle: "03. Mon travail",
	workFeaturedLabel: "Projet mis en avant",

	/** Projet 1 — carte + vignette (`project1.astro`). */
    workCardTitle: "Workspace",
    workCardDescriptionLine1:
        "Bureau virtuel (Electron) : un point d’accès pour les outils et liens internes.",
    workCardDescriptionLine2:
        "Accès, raccourcis et applications regroupés dans une même interface.",
    workCardDescriptionLine3:
        "Navigation vers les documents serveur, présentés par entité.",
    workCardDescriptionLine4:
        "Parcours de réception matérielle : lots, dons et commandes.",
    workCardDescriptionLine5:
        "Historique des états et journal des actions pour le suivi et l’audit.",
    workCardDescriptionLine6:
        "Conçu pour l’usage courant : inventaire, réception et consultation.",

	/** Projet 2 — portfolio (`project2.astro`). */
	workFeaturedLabel2: "Ce portfolio",
	workCard2Title: "Portfolio personnel",
	workCard2DescriptionLine1:
		"Présentation de mon profil de designer-développeur et une sélection de réalisations représentatives de mon travail.",
	workCard2DescriptionLine2:
		"Permet aux recruteurs et partenaires une lecture claire, en français ou en anglais, avec un confort visuel adapté (clair ou sombre).",
	workCard2DescriptionLine3:
		"Met en contexte chaque projet avec des visuels, puis guider vers une prise de contact simple.",

	/** Projet 3 — ConvertAllLocal (`project3.astro`). */
	workFeaturedLabel3: "En cours de développement",
	workCard3Title: "ConvertAllLocal - CAL",
    workCard3DescriptionLine1: "Application 100% locale pour convertir tous vos fichiers multimédias.",
    workCard3DescriptionLine2: "Prend en charge les formats vidéo, image et icônes incontournables du web",
    workCard3DescriptionLine3: "et du développement. Aucune donnée envoyée : tout reste sur votre machine.",
	workCard3StackAstro: "Astro",
	workCard3StackTailwind: "Tailwind",
	workCard3StackTypeScript: "TS",
	workCard3StackGsap: "GSAP",

	workGithubIconTitle: "Voir le code sur GitHub",
	workExternalLinkTitle: "Voir la démo",
	workImageAlt1: "Workspace - capture d'écran",
	workImageAlt2: "Portfolio personnel - aperçu du site",
	workImageAlt3: "Boîte à outils opérationnelle - capture d'écran",
	workGalleryTitle: "Captures du projet",
	workGalleryOpenLabel: "Agrandir et parcourir les captures",
	workGalleryPrevSlide: "Capture précédente",
	workGalleryNextSlide: "Capture suivante",
	/** Légendes lightbox : même ordre / même nombre d’entrées que `site.ENconfig.ts` → `workGalleryCaptions`. */
	workGalleryCaptions: {
		1: [
			"Workspace - Page d'accueil",
			"Workspace - Page agenda",
			"Workspace - Page applications",
			"Workspace - Réception et création des lots et matériels",
			"Workspace - Historique lots/matériels et leur état",
			"Workspace - Traçabilité lots/matériels triés par mois et année",
		],
		2: ["Portfolio personnel - aperçu du site"],
		3: ["Boîte à outils opérationnelle - capture d'écran"],
	} as const,
	workNodejs: "Node.js",
	workElectron: "Electron",
	workTailwind: "Fontawesome",
	workStackAriaLabel: "Stack utilisé",
} as const;

export const notFound = {
	title: "Erreur 404",
	heading: "Page introuvable",
	description: "Désolé, nous n’avons pas trouvé la page que vous cherchez.",
	backHome: "Retour à l’accueil",
} as const;