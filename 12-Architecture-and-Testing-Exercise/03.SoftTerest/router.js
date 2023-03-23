export function initializer(links) {
    const main = document.getElementById('mainView');
    document.querySelector('nav').addEventListener('click', onNavigateClick);

    const ctx = {
        showSection,
        goTo,
        updateNav
    }

    return ctx;

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigateClick(event) {
        event.preventDefault();
        let target = event.target;
        if (target.tagName == 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName == 'A') {
            const url = new URL(target.href);
            goTo(url.pathname);
        }
    }

    function goTo(name, ...params) {
        const handler = links[name];
        if (typeof handler == 'function') {
            handler(ctx, ...params);
        }
    }

    function updateNav() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            document.querySelectorAll('[data-id="user"]').forEach(el => el.style.display = 'block');
            document.querySelectorAll('[data-id="guest"]').forEach(el => el.style.display = 'none');
        } else {
            document.querySelectorAll('[data-id="user"]').forEach(el => el.style.display = 'none');
            document.querySelectorAll('[data-id="guest"]').forEach(el => el.style.display = 'block');
        }
    }
}