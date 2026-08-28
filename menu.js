(function () {
    'use strict';

    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (!toggle || !menu || !overlay) return;

        const closeButtons = document.querySelectorAll('[data-menu-close]');
        const links = menu.querySelectorAll('a');

        function closeMenu() {
            menu.classList.remove('open');
            overlay.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('mobile-menu-lock');
        }

        function openMenu() {
            menu.classList.add('open');
            overlay.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');
            document.body.classList.add('mobile-menu-lock');
        }

        toggle.addEventListener('click', function () {
            if (menu.classList.contains('open')) closeMenu();
            else openMenu();
        });

        closeButtons.forEach(function (button) {
            button.addEventListener('click', closeMenu);
        });

        links.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 600) closeMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
