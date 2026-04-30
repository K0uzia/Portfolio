function setOpen(btn: HTMLButtonElement, panel: HTMLElement, open: boolean) {
	btn.setAttribute("aria-expanded", open ? "true" : "false");
	panel.toggleAttribute("data-open", open);
	if (open) panel.removeAttribute("aria-hidden");
	else panel.setAttribute("aria-hidden", "true");
}

export function initMobileMenu(signal: AbortSignal) {
	const btn = document.getElementById("nav-burger");
	const panel = document.getElementById("nav-mobile-panel");
	const overlay = document.getElementById("nav-mobile-overlay");
	const close = document.getElementById("nav-mobile-close");

	if (!(btn instanceof HTMLButtonElement)) return;
	if (!(panel instanceof HTMLElement)) return;

	const overlayEl = overlay instanceof HTMLElement ? overlay : null;
	const closeBtn = close instanceof HTMLButtonElement ? close : null;

	const open = () => setOpen(btn, panel, true);
	const hide = () => setOpen(btn, panel, false);

	btn.addEventListener("click", () => {
		const isOpen = btn.getAttribute("aria-expanded") === "true";
		if (isOpen) hide();
		else open();
	});

	overlayEl?.addEventListener("click", hide, { signal });
	closeBtn?.addEventListener("click", hide, { signal });

	window.addEventListener(
		"keydown",
		(e) => {
			if (e.key !== "Escape") return;
			if (btn.getAttribute("aria-expanded") !== "true") return;
			hide();
		},
		{ signal },
	);

	// Close after clicking a nav link inside the panel
	panel.addEventListener(
		"click",
		(e) => {
			const a = (e.target as HTMLElement | null)?.closest("a[href]");
			if (!(a instanceof HTMLAnchorElement)) return;
			hide();
		},
		{ signal },
	);

	// Initial state
	hide();
	signal.addEventListener(
		"abort",
		() => {
			// ensure panel doesn't stay locked open
			panel.removeAttribute("data-open");
		},
		{ once: true },
	);
}

