"use strict";

/** @type {Record<string, string>} */
const fallback = {
	zh: "zh-CN",
	en: "en-US",
};

/**
 * @param {string} lang
 * @param {(value: {default: any}) => any} fullfill
 * @param {(() => void) | null} reject
 */
function trans(lang, fullfill, reject) {
	import(`/i18n/${lang}.json`, { with: { type: "json" } }).then((data) => {
		fullfill(data);
		document.documentElement.lang = lang;
	}, reject);
}

/**
 *
 * @param {(_: { default: any }) => void} handle
 */
function transBy(handle) {
	const lang = localStorage.getItem("lang") ?? navigator.language;

	trans(lang, handle, () =>
		trans(fallback[new Intl.Locale(lang).language] ?? "zh-CN", handle, () =>
			trans("zh-CN", handle, null),
		),
	);
}

export function transAll() {
	/**
	 *
	 * @param {{ default: any }} param0
	 */
	function handle({ default: langObj }) {
		for (const ele of document.querySelectorAll("*[data-i18n]")) {
			ele.textContent = langObj[ele.getAttribute("data-i18n") ?? ""];
		}
		for (const ele of document.querySelectorAll("*[data-i18n-alt]")) {
			ele.setAttribute("alt", langObj[ele.getAttribute("data-i18n-alt") ?? ""]);
		}
		for (const ele of document.querySelectorAll("*[data-i18n-label]")) {
			ele.setAttribute(
				"aria-label",
				langObj[ele.getAttribute("data-i18n-label") ?? ""],
			);
		}
	}

	transBy(handle);
}

/**
 *
 * @param {HTMLElement} ele
 */
export function transOne(ele) {
	/**
	 *
	 * @param {{ default: any }} param0
	 */
	function handle({ default: langObj }) {
		const text = ele.getAttribute("data-i18n");
		if (text) {
			ele.textContent = langObj[text];
		}
		const alt = ele.getAttribute("data-i18n-alt");
		if (alt) {
			ele.setAttribute("alt", langObj[alt]);
		}
		const label = ele.getAttribute("data-i18n-label");
		if (label) {
			ele.setAttribute("aria-label", langObj[label]);
		}
	}
	transBy(handle);
}
