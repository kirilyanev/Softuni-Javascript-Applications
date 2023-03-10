document.querySelectorAll("a").forEach(el => el.classList.remove("active"));
document.getElementById("login").classList.add("active");
document.getElementById('user').style.display = 'none';

function login() {
    const button = document.querySelector('button');
    
    button.addEventListener('click', (ev) => {
        ev.preventDefault();
        const url = 'http://localhost:3030/users/login';

        const errNotification = document.querySelector('.notification');

        const loginFormElement = document.getElementById('login-form');
        const data = new FormData(loginFormElement);

        const [email,password] = [...data.values()];

        // Email and pass validation
        if(email == '' || password == '') {
            return alert('Invalid email or password!');
        }

        const body = {
            email: email,
            password: password
        }

        const options = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(body)
        }

        fetch(url,options).then(response => {
            if(response.status != 200) {
                throw new Error();
            }
            return response.json();
        }).then(data => {
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('accessToken',data.accessToken);
            sessionStorage.setItem('id',data._id);
            
            loginFormElement.reset();
            window.location.href="./index.html";
        }).catch(err => {
            errNotification.textContent = err;
            setTimeout(() => {
            errNotification.textContent = '';
            },1000);
        })
    })
}

login();