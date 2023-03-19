const viewSections = Array.from(document.querySelectorAll('.view-section'));
const homeSection = viewSections[0];
const addMovieSection = viewSections[1];
const movieDescriptionSection = viewSections[2];
const editSection = viewSections[3];
const loginSection = viewSections[4];
const signUpSection = viewSections[5];

export const routes = {
    showHome: () => showSection(homeSection),
    showAddMovie: () => showSection(addMovieSection),
    showDescription: () => showSection(movieDescriptionSection),
    showEdit: () => showSection(editSection),
    showLogin: () => showSection(loginSection),
    showRegister: () => showSection(signUpSection)
}

function showSection(section) {
    viewSections.forEach(v => v.style.display = 'none');
    section.style.display = 'block';
}



// export const routes = {
    //     showHome: home,
    //     showLogin: login,
//     showRegister: register
// }

// export function login() {
//     viewSections.forEach(v => v.style.display = 'none');
//     const loginView = viewSections[4];
//     loginView.style.display = 'block';    
// }

// function register() {
//     viewSections.forEach(v => v.style.display = 'none');
//     const registerView = viewSections[5];
//     registerView.style.display = 'block';
// }


// function home() {
//     viewSections.forEach(v => v.style.display = 'none');
//     const homeView = viewSections[0];
//     homeView.style.display = 'block';
// }

// function addMovie() {
//     viewSections.forEach(v => v.style.display = 'none');

// }