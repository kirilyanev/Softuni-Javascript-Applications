window.addEventListener("DOMContentLoaded", onLoadHTML);

document.getElementById('home').addEventListener('click',onLoadHTML);
document.getElementById('addForm').addEventListener('submit', createCatch);
document.getElementById('logout').addEventListener('click', onLogout);
document.getElementsByClassName('load')[0].addEventListener('click', loadCatches);


async function onLogout() {
    const url = "http://localhost:3030/users/logout";

    const header = getHeader("GET", "");

    const response = await fetch(url, header);
    sessionStorage.clear();
    window.location.href="./index.html";
}

function onLoadHTML() {
    const token = sessionStorage.getItem("accessToken");
    const userName = document.querySelector('p.email span');
    const addBtn = document.querySelector('.add');
    const addCatchFieldset = document.querySelector('#addForm fieldset')
    document.querySelector('#catches').replaceChildren();

    if(token != null) {
        addCatchFieldset.disabled = false;
    }

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

    const catches = document.getElementById('catches');
    catches.style.display = "none";
    const p = document.getElementById('remove-onLoad');
    p.style.display = "block";
}

function loadCatches() {
    const url = 'http://localhost:3030/data/catches';
    
    const divCatchesElement = document.getElementById('catches');
    const p = document.getElementById('remove-onLoad');
    const catches = document.getElementById('catches');

    divCatchesElement.replaceChildren();
    catches.style.display = "inline-table";
    p.style.display = "none";

    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if(typeof data[Symbol.iterator] !== 'function') {
            data = [data];
        }
        for (let currCatch of data) {
            const div = document.createElement('div');
            div.classList = 'catch';
            div.innerHTML = `<label>Angler</label>
            <input type="text" class="angler" data-ownerId="${currCatch._ownerId}" value="${currCatch.angler}" disabled>
            <label>Weight</label>
            <input type="text" class="weight" data-ownerId="${currCatch._ownerId}" value="${currCatch.weight}" disabled>
            <label>Species</label>
            <input type="text" class="species" data-ownerId="${currCatch._ownerId}" value="${currCatch.species}" disabled>
            <label>Location</label>
            <input type="text" class="location" data-ownerId="${currCatch._ownerId}" value="${currCatch.location}" disabled>
            <label>Bait</label>
            <input type="text" class="bait" data-ownerId="${currCatch._ownerId}" value="${currCatch.bait}" disabled>
            <label>Capture Time</label>
            <input type="number" class="captureTime" data-ownerId="${currCatch._ownerId}" value="${currCatch.captureTime}" disabled>`;


            const updateBtn = document.createElement('button');
            updateBtn.classList = "update";
            updateBtn.setAttribute("data-ownerId", currCatch._ownerId);
            updateBtn.setAttribute("id",currCatch._id);
            updateBtn.disabled = true;
            updateBtn.textContent = "Update";

            const deleteBtn = document.createElement('button');
            deleteBtn.classList = "delete";
            deleteBtn.setAttribute("data-ownerId", currCatch._ownerId);
            deleteBtn.setAttribute("id",currCatch._id);
            deleteBtn.disabled = true;
            deleteBtn.textContent = "Delete";

            updateBtn.addEventListener('click',(ev)=> updateCatch(ev));
            deleteBtn.addEventListener('click',(ev)=> deleteCatch(ev));

            div.appendChild(updateBtn);
            div.appendChild(deleteBtn);

            divCatchesElement.appendChild(div);

        }

        // Enable update/delete buttons for loged user
        const catchesButtons = Array.from(document.querySelectorAll('#catches button'));
        const inputElements = document.querySelectorAll('#catches input');

        for (let button of catchesButtons) {
            if (button.getAttribute('data-ownerId') == sessionStorage.getItem('id')) {
                button.disabled = false;
            };
        }
        for (let input of inputElements) {
            if(input.getAttribute('data-ownerId') == sessionStorage.getItem('id')) {
                input.disabled = false;
            }
        }
    })
}

function updateCatch(ev) {
    const inputElements =Object.values(ev.target.parentElement.querySelectorAll('input'));
    const id = ev.target.id;
    const url = `http://localhost:3030/data/catches/${id}`;
    const token = sessionStorage.getItem("accessToken");
    
    const body = {
        angler: inputElements[0].value,
        weight: inputElements[1].value,
        species: inputElements[2].value,
        location: inputElements[3].value,
        bait: inputElements[4].value,
        captureTime: inputElements[5].value
    };
    
    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(body)
    }

    fetch(url,options).then(respond => {
        return respond.json();
    }).then(data => {
        loadCatches();
        return data;
    }).catch(err => {
        alert(err);
    })
}

function deleteCatch(ev) {
    const id = ev.target.id;
    const url = `http://localhost:3030/data/catches/${id}`;
    const token = sessionStorage.getItem("accessToken");

    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
    }

    }

    fetch(url, options).then(response => {
        return response.json();
    }).then(data => {
        loadCatches();
        return data;
    }).catch(err => {
        alert(err);
    })
}

function createCatch(ev) {
    ev.preventDefault();
    const form = ev.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const inputs = Object.values(data);
    for (let input of inputs) {
        if(input == '') {
            return;
        }
    }
    onCreateCatch(data);
    form.reset();
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
