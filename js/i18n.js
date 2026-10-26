/** @type {Record<string, string>} */
const fallback = {
	zh: "zh-CN",
	en: "en-US",
};

let currentLang = localStorage.getItem("lang") ?? navigator.language;
/** @type {Record<string, string>} */
let langObj = await getLang(currentLang);
document.documentElement.lang = currentLang;

/**
 *
 * @param {string} lang
 */
async function getLang(lang) {
	try {
		const realLang = fallback[lang] ?? lang;
		const realObj = await import(`/i18n/${realLang}.json`, {
			with: { type: "json" },
		});
		currentLang = realLang;
		return realObj.default;
	} catch {
		const hyphen = lang.indexOf("-");
		if (hyphen === -1) {
			return await getLang("zh-CN");
		} else {
			return await getLang(lang.substring(0, hyphen));
		}
	}
}

/**
 *
 * @param {string|null} lang
 */
export async function initLang(lang) {
	if (lang) {
		langObj = await getLang(lang);
		document.documentElement.lang = currentLang;
		localStorage.setItem("lang", currentLang);
	}

	for (const ele of document.querySelectorAll("*[data-i18n-con]")) {
		ele.setAttribute(
			"content",
			langObj[ele.getAttribute("data-i18n-con") ?? ""],
		);
	}
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

initLang(null);

export { currentLang, langObj };
