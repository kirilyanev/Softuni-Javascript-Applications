import { register } from "../api/user.js";

const section = document.getElementById('registerView');
const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

let context = null;

export function showRegister(ctx) {
    context = ctx;
    ctx.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const { email, password, repeatPassword } = Object.fromEntries(formData);
    if (!email || !password || !repeatPassword) {
        alert('Please fill all fields');
    }
    if (email.length < 3) {
        alert('Email is too short');
    }
    if (password.length < 3) {
        alert('Password is too short');
    }
    if (password != repeatPassword) {
        alert('Passwords do not match');
    } else {
        await register(email, password);
        alert('Registration succesful');
        context.updateNav();
        context.goTo('/');
    }
}