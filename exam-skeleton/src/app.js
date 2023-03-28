// TODO import libraries and change current imports to correct paths
// import page from 'node_modules/page/page.mjs -> update path';
// import { render } from 'node_modules/lit-html/lit-html.js -> update path';
import { logout } from "./data/auth.js";
import { getUserData } from "./data/util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

// TODO change render root depending on project HTML structure
const root = document.body;

page(decorateContext);
page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);


page.start();

function decorateContext(ctx,next) {
    ctx.render = renderView;
    
    next();
}

// TODO Inject dependencies
function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
    logout();
    ctx.redirect('/');
}