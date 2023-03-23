import { login } from "../api/user.js";

const section = document.getElementById('loginView');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

let context = null;

export function showLogin(ctx) {
    context = ctx;
    ctx.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    await login(email,password);
    form.reset();
    context.updateNav();
    context.goTo('/catalog');

}