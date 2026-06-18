export const info = {
	name: "Alexandre Kouziaeff",
	job: "Designer·développeur",
	email: "kouziaeffa.pro@gmail.com",
	githubProfileUrl: "https://github.com/K0uzia",
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

	/** Projet 1 - carte + vignette (`project1.astro`). */
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

	/** Projet 2 - MocoSite (`project2.astro`). */
	workFeaturedLabel2: "Mise en avant",
	workCard2Title: "MocoSite - Morlaix Communauté",
	workCard2DescriptionLine1:
		"Plateforme du centre de ressources jeunesse de Morlaix Communauté : livres, jeux, malles pédagogiques et outils pour les professionnels du territoire.",
	workCard2DescriptionLine2:
		"Consultation et filtrage des ressources en ligne ; certains outils (livres, jeux, malles) sont réservables par les animateurs inscrits.",
	workCard2DescriptionLine3:
		"Formulaire de contact, espace animateur (connexion, inscription, mot de passe oublié) et ressources téléchargeables (prévention, ateliers…).",
	workCard2StackPhp: "PHP",
	workCard2StackMysql: "MySQL",
	workCard2StackJavaScript: "JS",
	workCard2StackCss: "CSS",

	/** Projet 3 - Converter / KouziaConverter (`project3.astro`). */
	workFeaturedLabel3: "En développement",
	workCard3Title: "Converter",
	workCard3DescriptionLine1:
		"Convertisseur gratuit et open source : images, audio, documents et PDF traités localement dans le navigateur - sans téléversement ni compte.",
	workCard3DescriptionLine2:
		"WebAssembly dans le navigateur pour l’essentiel ; application desktop Tauri en cours pour la vidéo, Office lourd et gros fichiers.",
	workCard3DescriptionLine3:
		"Même outil, deux environnements : vos fichiers ne quittent jamais votre machine. Sans abonnement, publicité ni frais cachés.",
	workCard3StackAstro: "Astro",
	workCard3StackTypeScript: "TS",
	workCard3StackTauri: "Tauri",
	workCard3StackWasm: "WASM",

	workGithubIconTitle: "Voir le GitHub",
	workExternalLinkTitle: "Voir le site web",
	workImageAlt1: "Workspace - capture d'écran",
	workImageAlt2: "MocoSite - aperçu du centre de ressources jeunesse Morlaix Communauté",
	workImageAlt3: "Converter - conversion de fichiers locale dans le navigateur",
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
		2: [
			"MocoSite - Page d'accueil",
			"MocoSite - Catalogue livres",
			"MocoSite - Ressources à télécharger",
		],
		3: [
			"Converter - Page d'accueil",
			"Converter - Formats pris en charge",
			"Converter - Conversion de fichiers",
		],
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