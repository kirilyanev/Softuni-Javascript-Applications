document.querySelectorAll("a").forEach(el => el.classList.remove("active"));
document.getElementById("register").classList.add("active");
document.getElementById('user').style.display = 'none';

function register() {
    const buttonElement = document.querySelector('button');
    const url = 'http://localhost:3030/users/register';

    buttonElement.addEventListener('click',(ev) => {
        ev.preventDefault();
        const errNotification = document.querySelector('.notification');
        const registerFormElement = document.getElementById('register-form');
        const data = new FormData(registerFormElement);

        const [email,password,rePass] = [...data.values()];

        if(email == '') {
            return errNotification.textContent = 'Error: Enter correct email!';
        } else if (password == '' || password != rePass) {
            return errNotification.textContent = "Error: passwords don't match!";
        }
        const registerData = {
            email: email,
            password:password,
        }

        const options = {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(registerData)
        }

        fetch(url,options).then(response => {
            if (response.status == 409) {
                errNotification.textContent = 'User exists';
                throw new Error('User exists')
            }
            return response.json();
        }).then(data => {
            sessionStorage.setItem("email",email);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem('id',data._id);
            
            registerFormElement.reset();
            window.location.href="./index.html";
        }).catch(err => {
            errNotification.textContent = err;
            setTimeout(()=>{
                errNotification.textContent = '';
            },1000);
        })
    })
}

register();