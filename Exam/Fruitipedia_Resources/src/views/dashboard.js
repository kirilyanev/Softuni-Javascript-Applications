import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllFruits } from '../data/fruits.js';


const dashboardTemplate = (fruits) => html`
    ${fruits.length > 0 ? html`
    <h2>Fruits</h2>
    <section id="dashboard">
        ${fruits.map(fruitCard)}
    </section>` : html`
    <h2>No fruit info yet.</h2>`}
    `;

const fruitCard = (fruit) => html`
    <div class="fruit">
        <img src="${fruit.imageUrl}" alt="example1" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <a class="details-btn" href="/dashboard/${fruit._id}">More Info</a>
    </div>`

export async function dashboardPage(ctx) {
    const fruits = await getAllFruits();
    ctx.render(dashboardTemplate(fruits));
}