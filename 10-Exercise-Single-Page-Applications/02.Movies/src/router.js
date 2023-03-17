const viewSections = Array.from(document.querySelectorAll('.view-section'));

export const routes = {
    showHome: home,
    showLogout: logout,
    showLogin: login,
    showRegister: register
}

export function login() {
    viewSections.forEach(v => v.style.display = 'none');
    const loginView = viewSections[4];
    loginView.style.display = 'block';    
}

function register() {
    viewSections.forEach(v => v.style.display = 'none');
    const registerView = viewSections[5];
    registerView.style.display = 'block';
}

function logout() {

}

function home() {
    viewSections.forEach(v => v.style.display = 'none');
    const homeView = viewSections[0];
    homeView.style.display = 'block';
}