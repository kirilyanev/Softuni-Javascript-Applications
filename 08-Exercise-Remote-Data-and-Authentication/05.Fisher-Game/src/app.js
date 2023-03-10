window.addEventListener("DOMContentLoaded", onLoadHTML);

document.getElementById('addForm').addEventListener('submit', createCatch);
document.getElementById('logout').addEventListener('click', onLogout);
document.getElementsByClassName('load')[0].addEventListener('click', loadCatches);


async function onLogout() {
    const url = "http://localhost:3030/users/logout";

    const header = getHeader("GET", "");

    const response = await fetch(url, header);
    sessionStorage.clear();
    onLoadHTML();
}

function onLoadHTML() {
    const token = sessionStorage.getItem("accessToken");
    const userName = document.querySelector('p.email span');
    const addBtn = document.querySelector('.add');

    if (token) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
        userName.innerHTML = sessionStorage.getItem('email');
        addBtn.disabled = false;
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
        userName.innerHTML = "guest";
        addBtn.disabled = true;
    }
}

function loadCatches() {
    const url = 'http://localhost:3030/data/catches';
    const catchesElement = document.getElementById('catches');
    catchesElement.replaceChildren();

    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        for (let currCatch of data) {
            const div = document.createElement('div');
            div.classList = 'catch';
            div.innerHTML = `<label>Angler</label>
            <input type="text" class="angler" value="${currCatch.angler}">
            <label>Weight</label>
            <input type="text" class="weight" value="${currCatch.weight}">
            <label>Species</label>
            <input type="text" class="species" value="${currCatch.species}">
            <label>Location</label>
            <input type="text" class="location" value="${currCatch.location}">
            <label>Bait</label>
            <input type="text" class="bait" value="${currCatch.bait}">
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${currCatch.captureTime}">
            <button class="update" data-id="${currCatch._id}" disabled>Update</button>
            <button class="delete" data-id="${currCatch._id}" disabled>Delete</button>`;

            catchesElement.appendChild(div);
        }

        // Enable update/delete buttons for loged user
        const catchesButtons = Array.from(document.querySelectorAll('#catches button'));

        for (let button of catchesButtons) {
            if (button.getAttribute('data-id') == sessionStorage.getItem('id')) {
                button.disabled = false;
            };
        }

    })
}

function createCatch(ev) {
    ev.preventDefault();
    const form = ev.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData)
    onCreateCatch(data);
}

async function onCreateCatch(body) {
    const url = "http://localhost:3030/data/catches";
    const header = getHeader("POST", body);
    const response = await fetch(url, header);
    const data = await response.json();
    return data;

}

function getHeader(method, body) {
    const token = sessionStorage.getItem("accessToken");
    const header = {
        method: `${method}`,
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
        }
    }
    if (body) {
        header.body = JSON.stringify(body);
    }
    return header;
}
