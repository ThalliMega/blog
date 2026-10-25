"use strict";

export function changeTheme() {
	let currentTheme = localStorage.getItem("theme");
	if (!currentTheme) {
		const isDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		if (isDarkMode) {
			currentTheme = "dark";
		} else {
			currentTheme = "light";
		}
	}
	const changeTo = currentTheme === "dark" ? "light" : "dark";
	localStorage.setItem("theme", changeTo);

	document.documentElement.style.setProperty("color-scheme", changeTo);
	for (const ele of document.getElementsByTagName("svg")) {
		ele.style.setProperty("color-scheme", changeTo);
	}
}
