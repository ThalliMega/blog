import { changeTheme, currentTheme, systemTheme } from "./color.js";
import { langObj } from "./i18n.js";

const avatar = fetch("/img/avatar.svg")
	.then((r) => r.text())
	.then((t) => {
		const parser = new DOMParser();
		return parser.parseFromString(t, "image/svg+xml");
	});

class HeadNav extends HTMLElement {
	connectedCallback() {
		const svgNS = "http://www.w3.org/2000/svg";

		// 1. 创建最外层的 <nav> 元素
		const nav = document.createElement("nav");

		// ================= 左侧区域 =================
		const leftDiv = document.createElement("div");

		const homeLink = document.createElement("a");
		homeLink.href = "/";
		homeLink.setAttribute("data-i18n-label", "toHome");
		homeLink.ariaLabel = langObj.toHome;
		homeLink.id = "avatar";
		homeLink.classList.add("shadow");

		avatar.then((img) => {
			const svg = img.querySelector("#ThalliMega");
			if (svg) {
				homeLink.appendChild(svg);
			}
		});

		const navTitle = document.createElement("h1");
		const dataTitle = this.getAttribute("data-title") ?? "defaultTitle";
		navTitle.setAttribute("data-i18n", dataTitle);
		navTitle.textContent = langObj[dataTitle];

		leftDiv.appendChild(homeLink);
		leftDiv.appendChild(navTitle);

		// ================= 右侧区域 =================
		const rightDiv = document.createElement("div");

		const themeBtn = document.createElement("button");
		themeBtn.type = "button";
		themeBtn.classList.add("theme-icon");
		themeBtn.setAttribute("data-i18n-label", "changeTheme");
		themeBtn.ariaLabel = langObj["changeTheme"];
		themeBtn.onclick = changeTheme;
		// ---- 主题图标 (SVG) ----
		const themeSvg = document.createElementNS(svgNS, "svg");
		themeSvg.setAttribute("viewBox", "0 0 24 24");

		const darkPath = document.createElementNS(svgNS, "path");
		darkPath.classList.add("dark-icon");
		darkPath.setAttribute(
			"d",
			"M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z",
		);
		darkPath.setAttribute("stroke-linecap", "round");
		darkPath.setAttribute("stroke-linejoin", "round");

		const lightPath = document.createElementNS(svgNS, "path");
		lightPath.classList.add("light-icon");
		lightPath.setAttribute(
			"d",
			"M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z",
		);
		lightPath.setAttribute("stroke-linecap", "round");
		lightPath.setAttribute("stroke-linejoin", "round");

		themeSvg.appendChild(darkPath);
		themeSvg.appendChild(lightPath);

		const systemDefined = document.createElementNS(svgNS, "path");
		systemDefined.id = "system-theme";
		if (currentTheme !== systemTheme) {
			systemDefined.style.opacity = "0";
		}
		systemDefined.setAttribute(
			"d",
			"M12 21C16.9706 21 21 16.9706 21 12C21 9.69494 20.1334 7.59227 18.7083 6L16 3M12 3C7.02944 3 3 7.02944 3 12C3 14.3051 3.86656 16.4077 5.29168 18L8 21M21 3H16M16 3V8M3 21H8M8 21V16",
		);

		themeSvg.appendChild(systemDefined);

		themeBtn.appendChild(themeSvg);

		// ---- 朋友链接与图标 ----
		const friendsLink = document.createElement("a");
		friendsLink.href = "/friends";
		friendsLink.setAttribute("data-i18n-label", "toFriends");
		friendsLink.ariaLabel = langObj.toFriends;
		friendsLink.classList.add("nav-icon");

		const friendsSvg = document.createElementNS(svgNS, "svg");
		friendsSvg.setAttribute("viewBox", "0 0 24 24");

		const friendsPath = document.createElementNS(svgNS, "path");
		friendsPath.setAttribute(
			"d",
			"M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z",
		);
		friendsPath.setAttribute("stroke-width", "1");
		friendsPath.setAttribute("stroke-linecap", "round");
		friendsPath.setAttribute("stroke-linejoin", "round");

		friendsSvg.appendChild(friendsPath);
		friendsLink.appendChild(friendsSvg);

		rightDiv.appendChild(themeBtn);
		rightDiv.appendChild(friendsLink);

		// ================= 组合并挂载 =================
		nav.appendChild(leftDiv);
		nav.appendChild(rightDiv);

		// 清空当前容器（相当于 innerHTML = '' 的安全替代方案）并添加新节点
		this.replaceChildren(nav);
	}
}

customElements.define("hd-nav", HeadNav);
