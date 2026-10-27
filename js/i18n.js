/** @type {Record<string, string>} */
const fallback = {
	zh: "zh-CN",
	en: "en-US",
};

const fallbackLang = "zh-CN";

const storedLang = localStorage.getItem("lang");

/** @type {string|null} */
let currentLang = null;
/** @type {Record<string, string>} */
let langObj;

if (storedLang) {
	const langObjs = await getLang(storedLang);
	if (langObjs) {
		currentLang = langObjs[0];
		langObj = langObjs[1];
	} else {
		localStorage.removeItem("lang");
	}
}

if (!currentLang) {
	await initBySystem();
}

initElements();

window.onlanguagechange = async () => {
	if (!localStorage.getItem("lang")) {
		await initBySystem();
	}
};

/** @param {readonly string[]} langList @param {number} index @returns {Promise<[string, Record<string, string>] | null>} */
async function getLangFromList(langList, index) {
	if (index >= langList.length) {
		return null;
	}
	return (
		(await getLang(langList[index])) ??
		(await getLangFromList(langList, index + 1))
	);
}

function getLangFromSystem() {
	return getLangFromList(navigator.languages, 0);
}

/** @param {string} lang @returns {Promise<[string, Record<string, string>] | null>} */
async function getLang(lang) {
	try {
		const realLang = fallback[lang] ?? lang;
		const realObj = await import(`/i18n/${realLang}.json`, {
			with: { type: "json" },
		});
		return [realLang, realObj.default];
	} catch {
		const hyphen = lang.indexOf("-");
		if (hyphen === -1) {
			return null;
		} else {
			return await getLang(lang.substring(0, hyphen));
		}
	}
}

/**
 * ensures currentLang is set
 */
async function initBySystem() {
	const langObjs = await getLangFromSystem();
	if (langObjs) {
		currentLang = langObjs[0];
		langObj = langObjs[1];
	} else {
		const langObjs = await getLang(fallbackLang);
		if (!langObjs) {
			throw Error("fallback lang not found");
		}
		currentLang = langObjs[0];
		langObj = langObjs[1];
	}
}

function initElements() {
	if (!currentLang) {
		throw Error("init elements without lang");
	}
	document.documentElement.lang = currentLang;
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

/**
 *
 * @param {string|null} lang
 */
export async function changeLang(lang) {
	if (lang) {
		const langObjs = await getLang(lang);
		if (langObjs) {
			currentLang = langObjs[0];
			langObj = langObjs[1];
			localStorage.setItem("lang", currentLang);
			initElements();
		} else {
			console.warn(`lang ${lang} not found`);
		}
	} else {
		localStorage.removeItem("lang");
		await initBySystem();
		initElements();
	}
}

export { currentLang, langObj };
