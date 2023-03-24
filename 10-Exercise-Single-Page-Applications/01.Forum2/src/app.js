import { showHome } from "./home.js";

showHome();

const home = document.querySelector('nav a');
home.addEventListener('click', showHome);

