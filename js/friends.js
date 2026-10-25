"use strict";

import { transOne } from "./i18n.js";

export class FriendTemplate extends HTMLElement {
	/** @type {HTMLAnchorElement} */
	#anchor = document.createElement("a");
	connectedCallback() {
		const href = this.getAttribute("data-href");
		if (!href) {
			console.error("friend does not have href");
			this.remove();
			return;
		}

		this.#anchor.href = href;
		this.#anchor.target = "_blank";
		this.#anchor.classList.add("friend-card", "shadow", "sk");

		this.appendChild(this.#anchor);
		const lang = localStorage.getItem("lang") ?? navigator.language;
		fetch(href, { headers: { "Accept-Language": lang } })
			.then((resp) => resp.text())
			.then((resp) => this.parseMainpage(resp))
			.catch(() => this.errMainpage())
			.finally(() => this.#anchor.classList.remove("sk"));
	}
	/** @param {string} resp  */
	parseMainpage(resp) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(resp, "text/html");

		const title = doc.querySelector("title")?.textContent?.trim() ?? "";
		const des =
			doc
				.querySelector('meta[name="description" i]')
				?.getAttribute("content") ?? "";
		const icon =
			doc
				.querySelector('link[rel="apple-touch-icon" i]')
				?.getAttribute("href") ??
			doc.querySelector('link[rel="icon" i]')?.getAttribute("href") ??
			doc.querySelector('link[rel="shortcut icon" i]')?.getAttribute("href") ??
			"";

		const href = this.getAttribute("data-href");
		if (!href) {
			console.error("friend does not have href");
			this.remove();
			return;
		}

		const img = document.createElement("img");
		img.setAttribute("data-i18n-alt", "friend-icon");
		img.classList.add("icon");
		img.src = new URL(icon, href).toString();
		transOne(img);
		const titleEle = document.createElement("h3");
		titleEle.textContent = title;
		const p = document.createElement("p");
		p.textContent = des;
		const titleP = document.createElement("div");
		titleP.classList.add("title-content");
		titleP.appendChild(titleEle);
		titleP.appendChild(p);

		this.#anchor.appendChild(img);
		this.#anchor.appendChild(titleP);
	}
	errMainpage() {
		const href = this.getAttribute("data-href");
		if (!href) {
			console.error("friend does not have href");
			this.remove();
			return;
		}
		const h3 = document.createElement("h3");
		h3.textContent = href;
		this.#anchor.appendChild(h3);
	}
}

export function initFriends() {
	const friendEle = document.getElementById("friends");
	if (!friendEle) {
		return;
	}
	customElements.define("fri-end", FriendTemplate);

	const friendList = [
		"https://blog.camb.moe",
		"https://llx.life",
		"https://linesoft.dev",
		"https://blog.hikarilan.life",
		"https://www.epicmo.cn",
		"https://lhr.wiki",
		"https://ntz.im",
		"https://blog.xkeyc.com",
		"https://xn--misa-mtf-s00n631csyres5ca.life",
		"https://blog.eatswap.org/",
		"https://blog.shanwer.top/",
		"https://reubensun.com/",
		"https://blog.hanbings.io/",
		"https://blog.csbxd.fun/",
		"https://www.hyosakura.com/",
		"https://insights.nico.wang/",
		"https://blog.sonui.cn/",
		"https://barren.cat/",
		"https://kagurayayoi.top/",
		"https://me.ooo.cat/",
		"https://iyn.me/i/",
		"https://norand.top/",
		"https://www.xn--ghq663ao0ncr3a.top/",
		"https://amfysky.top/",
		"https://www.oboard.fun/",
	];

	for (let friend of friendList) {
		const friendArt = document.createElement("fri-end");
		friendArt.setAttribute("data-href", friend);
		friendEle.appendChild(friendArt);
	}
}
