// TODO import libraries and change current imports to correct paths
import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from "./data/auth.js";
import { getUserData } from "./data/util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { layoutTemplate } from './views/layout.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { collectionPage } from './views/collection.js';
import { editPage } from './views/edit.js';

// TODO change render root depending on project HTML structure
const root = document.getElementById('container');

page(decorateContext);
page('index.html', '/');
page('/', homePage);
page('/collection', collectionPage);
page('/catalog', catalogPage);
page('/edit', editPage)
page('/create', createPage);
page('/catalog/:id', detailsPage);
page('/catalog/:id/edit', editPage);
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
    ctx.page.redirect('/catalog');
}