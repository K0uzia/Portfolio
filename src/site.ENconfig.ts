export const info = {
	name: "Alexandre Kouziaeff",
	job: "Designer·developer",
	email: "kouziaeffa.pro@gmail.com",
	githubProfileUrl: "https://github.com/SandersonnDev",
	linkedinProfileUrl: "https://www.linkedin.com/in/alexandre-kouziaeff/",
	pitch: "Web developer and application developer, from design to development",
} as const;

export const nav = {
	/** Landmark `<nav>` (rail) */
	navAriaMain: "Primary navigation",
	/* Navigation */
	navHome: "Home",
	navWork: "Work",
	navAbout: "About",
	navContact: "Contact",
	/* Navigation links */
	navlinkHome: "#home",
	navlinkWork: "#work",
	navlinkAbout: "#about",
	navlinkContact: "#contact",
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

	/** Projet 2 — portfolio (`project2.astro`). */
	workFeaturedLabel2: "This portfolio",
	workCard2Title: "Personal portfolio",
	workCard2DescriptionLine1:
		"Presentation of my profile as a designer-developer and a curated set of projects that reflect how I work.",
	workCard2DescriptionLine2:
		"Give recruiters and collaborators a clear read, bilingual (English/French), with a comfortable light or dark viewing mode.",
	workCard2DescriptionLine3:
		"Frame each project with visuals and galleries, then lead to a straightforward way to get in touch with me.",

	/** Projet 3 — ConvertAllLocal (`project3.astro`). */
	workFeaturedLabel3: "In development",
	workCard3Title: "ConvertAllLocal - CAL",
    workCard3DescriptionLine1: "100% local application to convert all your media files.",
    workCard3DescriptionLine2: "Supports essential video, image, and icon formats for the web",
    workCard3DescriptionLine3: "and app development. Zero data sent: everything stays on your machine.",
	workCard3StackAstro: "Astro",
	workCard3StackTailwind: "Tailwind",
	workCard3StackTypeScript: "TS",
	workCard3StackGsap: "GSAP",

    workGithubIconTitle: "View code on GitHub",
    workExternalLinkTitle: "View demo",
    workImageAlt1: "Workspace - screenshot",
	workImageAlt2: "Personal portfolio — site preview",
	workImageAlt3: "Operations toolkit — screenshot",
	workGalleryTitle: "Project screenshots",
	workGalleryOpenLabel: "Open screenshots gallery",
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
		2: ["Personal portfolio — site preview"],
		3: ["Operations toolkit — screenshot"],
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