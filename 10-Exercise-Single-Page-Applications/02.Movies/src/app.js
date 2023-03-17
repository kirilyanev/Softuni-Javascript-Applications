import { routes } from "./router.js";
import { login, signUp } from "./authentication.js";

const links = Array.from(document.querySelectorAll('.nav-link'));
const logoutLink = links[1];
const loginLink = links[2];
const registerLink = links[3];

onLoad();

function onLoad() {
    routes.showHome();

    const token = sessionStorage.getItem("accessToken");
    
    if(token) {
        // TO DO
    }
}


// LOGOUT

logoutLink.addEventListener('click',()=> {
    routes.showLogout()
});


// LOGIN

loginLink.addEventListener('click',()=> {
    routes.showLogin()
    const loginForm = document.querySelector('#login-form');
    
    loginForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        const data = new FormData(loginForm);
        const email = data.get('email');
        const password = data.get('password');

        login(email,password);
    })
});


// REGISTER

registerLink.addEventListener('click',()=> {
    routes.showRegister()
    const registerForm = document.querySelector('#register-form');

    registerForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const data = new FormData(registerForm);
        const email = data.get('email');
        const password = data.get('password');
        const rePassword = data.get("repeatPassword");
        
        // Input Validation
        if (email == '' || password.length < 6 || password != rePassword) {
            alert('Incorect email or password!');
            return;
        }
        
        signUp(email,password);
    })
});

