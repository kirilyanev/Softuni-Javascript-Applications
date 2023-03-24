import { html, render } from "./node_modules/lit-html/lit-html.js";
const form = document.querySelector('form');
const rootElement = document.getElementById('root');

form.addEventListener('submit', loadTowns);

function loadTowns(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const towns = formData.get('towns').split(' ');

    renderTowns(towns);
}

function renderTowns(towns) {
    const template = html `
        <ul>
            ${towns.map(t=> html`<li>${t}</li>`)}
        </ul>`;
    render(template, rootElement);
}