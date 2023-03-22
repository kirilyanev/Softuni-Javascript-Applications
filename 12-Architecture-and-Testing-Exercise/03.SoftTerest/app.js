import { showHomeView } from "./views/home.js";

document.getElementById('defSection').remove();

const links = {
    "/":showHomeView,
}

const main = document.getElementById('mainView');

const ctx = {
    showSection,
}

function showSection(section) {
    main.replaceChildren(section);
}