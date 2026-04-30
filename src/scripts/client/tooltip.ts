function migrateTitleToTooltip(root: ParentNode = document) {
	root.querySelectorAll<HTMLElement>("[title]").forEach((el) => {
		const t = el.getAttribute("title") ?? "";
		if (!t) return;
		el.setAttribute("data-tooltip", t);
		el.removeAttribute("title");
	});
}

function createTooltipEl() {
	const el = document.createElement("div");
	el.className = "cursor-tooltip";
	el.setAttribute("role", "tooltip");
	el.setAttribute("aria-hidden", "true");
	document.body.appendChild(el);
	return el;
}

function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

export function initTooltips(signal: AbortSignal) {
	document.documentElement.setAttribute("data-tooltips", "cursor");

	// 1) Move any existing native titles to custom tooltips.
	migrateTitleToTooltip();

	// 2) If something later sets a title (ex. i18n), we still migrate it.
	const obs = new MutationObserver((mutations) => {
		for (const m of mutations) {
			if (m.type !== "attributes") continue;
			if (m.attributeName !== "title") continue;
			const el = m.target;
			if (!(el instanceof HTMLElement)) continue;
			const t = el.getAttribute("title") ?? "";
			if (!t) continue;
			el.setAttribute("data-tooltip", t);
			el.removeAttribute("title");
		}
	});

	obs.observe(document.documentElement, {
		subtree: true,
		attributes: true,
		attributeFilter: ["title"],
	});

	const tooltip = createTooltipEl();
	let active: HTMLElement | null = null;

	function showFor(el: HTMLElement) {
		const txt = el.dataset.tooltip ?? "";
		if (!txt) return;
		active = el;
		tooltip.textContent = txt;
		tooltip.style.opacity = "1";
		tooltip.setAttribute("aria-hidden", "false");
	}

	function hide() {
		active = null;
		tooltip.style.opacity = "0";
		tooltip.setAttribute("aria-hidden", "true");
	}

	function move(e: MouseEvent) {
		if (!active) return;
		// offset from cursor
		const offsetX = 12;
		const offsetY = 16;
		const pad = 8;

		// First place near cursor, then clamp inside viewport
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		// Ensure tooltip has layout
		const rect = tooltip.getBoundingClientRect();
		let x = e.clientX + offsetX;
		let y = e.clientY + offsetY;
		x = clamp(x, pad, vw - rect.width - pad);
		y = clamp(y, pad, vh - rect.height - pad);

		tooltip.style.left = `${x}px`;
		tooltip.style.top = `${y}px`;
	}

	// Delegate events for all elements that have data-tooltip.
	function closestTooltipTarget(t: EventTarget | null) {
		const el = t instanceof Element ? t.closest("[data-tooltip]") : null;
		return el instanceof HTMLElement ? el : null;
	}

	function onMove(e: MouseEvent) {
		const target = closestTooltipTarget(e.target);
		if (!target) {
			hide();
			return;
		}
		if (active !== target) showFor(target);
		move(e);
	}

	function onLeave(e: MouseEvent) {
		const rel = e.relatedTarget;
		if (rel instanceof Node && active && active.contains(rel)) return;
		hide();
	}

	// Only mouse / trackpad. Touch devices won't spam tooltips.
	window.addEventListener("mousemove", onMove, { signal, passive: true });
	window.addEventListener("mouseleave", onLeave, { signal, passive: true });

	// Hide on scroll to avoid "stuck" tooltip during scroll.
	window.addEventListener("scroll", hide, { signal, passive: true });

	signal.addEventListener(
		"abort",
		() => {
			obs.disconnect();
			tooltip.remove();
		},
		{ once: true },
	);
}

