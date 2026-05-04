(function () {
    "use strict";

    var THEME_KEY = "ech0-theme";
    var root = document.documentElement;

    function applyTheme(t) {
        if (t === "dark") root.setAttribute("data-theme", "dark");
        else root.removeAttribute("data-theme");
    }

    function currentTheme() {
        var saved = localStorage.getItem(THEME_KEY);
        if (saved === "dark" || saved === "light") return saved;
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    applyTheme(currentTheme());

    document.addEventListener("DOMContentLoaded", function () {
        var btn = document.querySelector(".theme-toggle");
        if (btn) {
            btn.addEventListener("click", function () {
                var next = currentTheme() === "dark" ? "light" : "dark";
                localStorage.setItem(THEME_KEY, next);
                applyTheme(next);
            });
        }

        if (window.matchMedia) {
            var mq = window.matchMedia("(prefers-color-scheme: dark)");
            try {
                mq.addEventListener("change", function (e) {
                    if (!localStorage.getItem(THEME_KEY)) {
                        applyTheme(e.matches ? "dark" : "light");
                    }
                });
            } catch (_) {}
        }

        document.querySelectorAll(".post-content img").forEach(function (img) {
            img.loading = "lazy";
        });
    });
})();
