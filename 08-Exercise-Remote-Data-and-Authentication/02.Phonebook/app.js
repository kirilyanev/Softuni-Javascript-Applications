function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const url = 'http://localhost:3030/jsonstore/phonebook';

    loadBtn.addEventListener('click', () => loadPhones(url));
    createBtn.addEventListener('click', () => createPhone(url));

}

function loadPhones(url) {
    const ulElement = document.getElementById('phonebook');
    ulElement.replaceChildren();
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        for (let key in Object.values(data)) {
            let entry = Object.values(data)[key];
            let deleteKey = Object.entries(data)[key][0];

            const li = document.createElement('li');
            const button = document.createElement('button');

            li.textContent = `${entry.person}: ${entry.phone}`;
            button.textContent = 'Delete';
            button.addEventListener('click', (ev) => deletePhone(ev, deleteKey));

            li.appendChild(button);
            ulElement.appendChild(li);
        }
    }).catch(err => {
        alert(err);
    })
}

function createPhone(url) {
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');

    if (person.value == '' || phone.value == '') {
        return;
    }
    
    const phoneEntry = {
        "person": person.value,
        "phone": phone.value,
    };

    const options = {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(phoneEntry)
    };

    fetch(url, options).then(response => {
        return response.json();
    }).then(data => {
        person.value = '';
        phone.value = '';
        loadPhones(url);
    }).catch(err => {
        alert(err);
    })
}

function deletePhone(ev, deleteKey) {
    const url = `http://localhost:3030/jsonstore/phonebook/${deleteKey}`;
    const options = {
        method: 'delete',
        headers: { 'Content-type': 'application/json' },
    }

    fetch(url, options).then(response => {
        return response.json();
    }).then(data => {
        ev.target.parentElement.remove();
        return data;
    }).catch(err => {
        alert(err);
    })

}

attachEvents();