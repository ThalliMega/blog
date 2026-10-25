"use strict";

import { initFriends } from "./friends.js";
import { transAll } from "./i18n.js";
import { changeTheme } from "./color.js";

function init() {
	customElements.define("hd-nav", HeadNav);

	initFriends();
	transAll();
}

class HeadNav extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `<nav>
        <div>
            <a href="/" data-i18n-label="toHome"><img src="/img/avatar.svg" data-i18n-alt="avatar" id="avatar"></a>
            <h1>ThalliMega's Blog</h1>
        </div>

        <div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="theme-icon" data-i18n-label="changeTheme">
					<path
						class="dark-icon"
						d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				  <path
						class="light-icon"
						d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
        </svg>
        <a href="/friends.html" data-i18n-label="toFriends"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="nav-icon">
					<path
						d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
        </svg></a>
        </div>
    </nav>`;
		for (const ele of this.getElementsByClassName("theme-icon")) {
			ele.addEventListener("click", changeTheme);
		}
	}
}

window.onload = init;

const currentTheme = localStorage.getItem("theme") ?? "dark light";
document.documentElement.style.setProperty("color-scheme", currentTheme);
const currentLang = localStorage.getItem("lang") ?? navigator.language;
document.documentElement.lang = currentLang;

export { changeTheme };
