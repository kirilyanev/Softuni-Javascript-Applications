// TODO import libraries and change current imports to correct paths
import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from "./data/auth.js";
import { getUserData } from "./data/util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { layoutTemplate } from './views/layout.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';

// TODO change render root depending on project HTML structure
const root = document.getElementById('wrapper');

page(decorateContext);
page(addQuery);
page('index.html', '/');
page('/', homePage);
page('/dashboard', dashboardPage);
page('/dashboard/:id', detailsPage);
page('/dashboard/:id/edit', editPage);
page('/create', createPage);
page('/search', searchPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);


page.start();

function addQuery(ctx, next) {
    if (ctx.querystring != '') {
        ctx.query = ctx.querystring.split('=');
    } else {
        ctx.query = [];
    }
    next();
}

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
    ctx.page.redirect('/');
}