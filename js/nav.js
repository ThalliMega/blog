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
		homeLink.ariaLabel = "跳转到主页";
		homeLink.id = "avatar";
		homeLink.classList.add("shadow");

		avatar.then((img) => {
			const svg = img.querySelector("#ThalliMega");
			if (svg) {
				homeLink.appendChild(svg);
			}
		});

		const navTitle = document.createElement("h1");
		const dataTitle =
			this.getAttribute("data-title") ?? "Thallium Megalovania的博客";
		navTitle.textContent = dataTitle;

		leftDiv.appendChild(homeLink);
		leftDiv.appendChild(navTitle);

		// ================= 右侧区域 =================
		const rightDiv = document.createElement("div");

		// ---- 朋友链接与图标 ----
		const friendsLink = document.createElement("a");
		friendsLink.href = "/friends";
		friendsLink.ariaLabel = "跳转到友链页面";
		friendsLink.classList.add("nav-icon");

		const friendsSvg = document.createElementNS(svgNS, "svg");
		friendsSvg.setAttribute("viewBox", "0 0 24 24");

		const friendsPath = document.createElementNS(svgNS, "path");
		friendsPath.setAttribute(
			"d",
			"M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z",
		);
		friendsPath.setAttribute("stroke-width", "1");

		friendsSvg.appendChild(friendsPath);
		friendsLink.appendChild(friendsSvg);

		rightDiv.appendChild(friendsLink);

		// ================= 组合并挂载 =================
		nav.appendChild(leftDiv);
		nav.appendChild(rightDiv);

		// 清空当前容器（相当于 innerHTML = '' 的安全替代方案）并添加新节点
		this.replaceChildren(nav);
	}
}

customElements.define("hd-nav", HeadNav);
