const systemTheme = "dark light";

let currentTheme = localStorage.getItem("theme") ?? systemTheme;
document.documentElement.style.setProperty("color-scheme", currentTheme);

/** @param {PointerEvent} e  */
export function changeTheme(e) {
	const systemPreferDark = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	let changeTo;
	if (
		(currentTheme === "dark" && systemPreferDark) ||
		(currentTheme === "light" && !systemPreferDark)
	) {
		changeTo = systemTheme;
		localStorage.removeItem("theme");
	} else {
		if (currentTheme === systemTheme) {
			if (systemPreferDark) {
				changeTo = "light";
			} else {
				changeTo = "dark";
			}
		} else {
			if (systemPreferDark) {
				changeTo = "dark";
			} else {
				changeTo = "light";
			}
		}
		localStorage.setItem("theme", changeTo);
	}
	currentTheme = changeTo;

	document.documentElement.style.setProperty("color-scheme", changeTo);
	if (e && e.pointerType !== "") {
		/** @type {HTMLElement} */ (e.currentTarget).blur();
	}
	const systemIcon = /** @type {SVGElement} */ (
		document.querySelector("#system-theme")
	);
	if (changeTo === systemTheme) {
		systemIcon.style.opacity = "1";
	} else {
		systemIcon.style.opacity = "0";
	}
}

export { currentTheme, systemTheme };
