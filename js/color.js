let currentTheme =
	localStorage.getItem("theme") ??
	(window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light");
document.documentElement.style.setProperty("color-scheme", currentTheme);

export function changeTheme() {
	const changeTo = currentTheme === "dark" ? "light" : "dark";
	currentTheme = changeTo;
	localStorage.setItem("theme", changeTo);

	document.documentElement.style.setProperty("color-scheme", changeTo);
}
