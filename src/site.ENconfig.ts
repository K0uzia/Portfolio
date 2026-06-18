export const info = {
	name: "Alexandre Kouziaeff",
	job: "Designer·developer",
	email: "kouziaeffa.pro@gmail.com",
	githubProfileUrl: "https://github.com/K0uzia",
	linkedinProfileUrl: "https://www.linkedin.com/in/alexandre-kouziaeff/",
	pitch: "Alexandre Kouziaeff's portfolio, Web developer and application developer, from design to development",
} as const;

export const nav = {
	/** Landmark `<nav>` (rail) */
	navAriaMain: "Primary navigation",
	/* Navigation */
	navHome: "Home",
	navWork: "Work",
	navAbout: "About",
	/* Navigation links */
	navlinkHome: "#home",
	navlinkWork: "#work",
	navlinkAbout: "#about",
	/* Button Title */
	buttonLinkedin: "LinkedIn profile",
	buttonGithub: "GitHub profile",
	buttonEmail: "Email me",
	/** Toggle theme */
	titleSwitchTheme: "Switch theme",
	toggleSwitchToLight: "Switch to light theme",
	toggleSwitchToDark: "Switch to dark theme",
	/* Lang Switch */
	titleSwitchLang: "Switch language",
	toggleSwitchToEn: "Switch to English",
	toggleSwitchToFr: "Switch to French",
} as const;

export const hero = {
	heroTitle: "Hi, my name is",
	heroSubtitle: "Alexandre Kouziaeff",
	heroDescription: "Interface designer and developer, from print to modern web",
	heroSubdescription: "With a background in design and digital graphics and a Bachelor’s degree in ,",
	heroSubdescription2: "I develop web applications end-to-end, from development through to production deployment for IT service companies",
	heroButton: "See my work",
	heroLink1: "https://www.onisep.fr/ressources/univers-metier/metiers/ui-designer-concepteur-conceptrice-d-interface-utilisateur",
	heroLink2: "https://www.apec.fr/faq.html?question=que-signifient-les-termes-esn-et-ssii",
	heroLink1Text: "CDUI",
	heroLink2Text: "ESN",
	heroLink1Title: "What is CDUI?",
	heroLink2Title: "What is ESN?",
} as const;

export const about = {
    aboutTitle: "02. About Me",
    aboutDescription: "Hello! My name is Alexandre Kouziaeff and I enjoy creating web experiences that are useful, clear, and thoughtfully designed.",
    aboutDescription2: "My journey began in graphic design and layout, before evolving toward interface design and web development.",
    aboutDescription3: "Over time, I’ve worked on websites, user support, and internal technical solutions, with a particular focus on usability, performance, and visual quality.",
    aboutDescription4: "Today, I continue to learn and refine my skills in order to design projects that meet real needs.",
    aboutDescription5: "Here are a few technologies I’ve recently worked with:",
	aboutDescription5Stack: "Astro",
	aboutDescription5Stack2: "Tailwind CSS",
	aboutDescription5Stack3: "TypeScript",
	aboutDescription5Stack4: "ElectronJS"
} as const;

export const work = {
    workTitle: "03. My work",
    workFeaturedLabel: "Featured project",
	workCardTitle: "Workspace",
    workCardDescriptionLine1:
        "Electron-based workspace: one access point for internal tools and links.",
    workCardDescriptionLine2:
        "Access, shortcuts, and internal apps grouped in a single interface.",
    workCardDescriptionLine3:
        "Browse server documents organized by entity.",
    workCardDescriptionLine4:
        "Reception workflow for hardware: batches, donations, and orders.",
    workCardDescriptionLine5:
        "Status history and action log for tracking and audits.",
    workCardDescriptionLine6:
        "Built for day-to-day use: inventory, intake, and lookups.",

	/** Projet 2 - MocoSite (`project2.astro`). */
	workFeaturedLabel2: "In production",
	workCard2Title: "MocoSite - Morlaix Communauté",
	workCard2DescriptionLine1:
		"Youth resource center platform for Morlaix Communauté: books, games, pedagogical kits, and tools for youth professionals on the territory.",
	workCard2DescriptionLine2:
		"Browse and filter resources online; some items (books, games, kits) can be reserved by registered animators.",
	workCard2DescriptionLine3:
		"Contact form, animator account area (login, sign-up, password reset), and downloadable prevention and workshop materials.",
	workCard2StackPhp: "PHP",
	workCard2StackMysql: "MySQL",
	workCard2StackJavaScript: "JS",
	workCard2StackCss: "CSS",

	/** Projet 3 - Converter / KouziaConverter (`project3.astro`). */
	workFeaturedLabel3: "In production",
	workCard3Title: "Converter",
	workCard3DescriptionLine1:
		"Free, open-source file converter: images, audio, documents and PDF processed locally in the browser, no upload, no account.",
	workCard3DescriptionLine2:
		"WebAssembly in the browser for everyday formats; Tauri desktop app in progress for video, heavy Office and large files.",
	workCard3DescriptionLine3:
		"Same tool, two environments: your files never leave your machine. No subscription, ads or hidden fees.",
	workCard3StackAstro: "Astro",
	workCard3StackTypeScript: "TS",
	workCard3StackTauri: "Tauri",
	workCard3StackWasm: "WASM",

    workGithubIconTitle: "View GitHub",
    workExternalLinkTitle: "View website",
    workImageAlt1: "Workspace - screenshot",
	workImageAlt2: "MocoSite - Morlaix Communauté youth resource center preview",
	workImageAlt3: "Converter - local file conversion in the browser",
	workGalleryTitle: "Project screenshots",
	workGalleryOpenLabel: "Open screenshots gallery",
	workGalleryPrevSlide: "Previous screenshot",
	workGalleryNextSlide: "Next screenshot",
	/**
	 * Légendes lightbox : même ordre que les images (`projectImages`).
	 * Traductions FR : `site.FRconfig.ts` → `work.workGalleryCaptions` (mêmes clés `1` | `2` | `3`, mêmes longueurs de tableaux).
	 */
	workGalleryCaptions: {
		1: [
			"Workspace - Home page",
			"Workspace - Agenda page",
			"Workspace - Applications page",
			"Workspace - Reception and creation of batches and equipment",
			"Workspace - History of batches/materials and their status",
			"Workspace - Traceability of batches/materials by month and year",
		],
		2: [
			"MocoSite - Home page",
			"MocoSite - Books catalog",
			"MocoSite - Downloadable resources",
		],
		3: [
			"Converter - Home page",
			"Converter - Supported formats",
			"Converter - Why Converter?",
		],
	} as const,
    workNodejs: "Node.js",
    workElectron: "Electron",
    workTailwind: "Fontawesome",
    workStackAriaLabel: "Tech stack used",
} as const;

export const notFound = {
	title: "404 Error",
	heading: "Page Not Found",
	description: "Sorry, we couldn’t find the page you’re looking for.",
	backHome: "Go back home",
} as const;