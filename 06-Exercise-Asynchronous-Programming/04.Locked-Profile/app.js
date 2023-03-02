function lockedProfile() {
    const mainElement = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url).then(response => {
        if (response.status != 200) {
            throw new Error();
        }
        return response.json();
    }).then(data => {
        const profiles = Object.values(data);

        profiles.forEach(user => {
            // Create div
            const divProfile = document.createElement('div');
            divProfile.className = "profile";
            // Create img
            const img = document.createElement('img');
            img.src = "./iconProfile2.png"
            img.className = "userIcon";
            // Create label lock
            const labelLock = document.createElement('label');
            labelLock.textContent = "Lock";
            // Create input radio locked
            const inputRadioLock = document.createElement('input');
            inputRadioLock.type = "radio";
            inputRadioLock.setAttribute("name", "user1Locked");
            inputRadioLock.value = "lock";
            inputRadioLock.checked = "true";
            // Create label unlock
            const labelUnlock = document.createElement('label');
            labelUnlock.textContent = "Unlock";
            // Create input radio unlocked
            const inputRadioLock2 = document.createElement('input');
            inputRadioLock2.type = "radio";
            inputRadioLock2.setAttribute("name", "user1Locked");
            inputRadioLock2.value = "unlock";
            // Create hr
            const hr = document.createElement('hr');
            // Create label
            const labelUsername = document.createElement('label');
            labelUsername.textContent = "Username";
            // Create input text
            const userNameInput = document.createElement('input');
            userNameInput.type = "text";
            userNameInput.setAttribute("name", "user1Username");
            userNameInput.value = `${user.username}`;
            userNameInput.readOnly = "true";
            userNameInput.disabled = "true";
            // Create div
            const divHidden = document.createElement('div');
            divHidden.setAttribute('id', 'user1HiddenFields');
            divHidden.style.display = 'none';
            // Create hr
            const hr2 = document.createElement('hr');
            // Create label
            const labelEmail = document.createElement('label');
            labelEmail.textContent = 'Email:'
            // Create input email
            const inputEmail = document.createElement('input');
            inputEmail.type = "email";
            inputEmail.setAttribute('name', 'user1Email');
            inputEmail.value = `${user.email}`;
            inputEmail.readOnly = 'true';
            inputEmail.disabled = 'true';
            // Create label age
            const labelAge = document.createElement('label');
            labelAge.textContent = 'Age:';
            // Create input age
            const inputAge = document.createElement('input');
            inputAge.type = 'email';
            inputAge.setAttribute('name', 'user1Age');
            inputAge.value = `${user.age}`;
            inputAge.readOnly = 'true';
            inputAge.disabled = 'true';
            // Create button
            const button = document.createElement('button');
            button.textContent = 'Show more';

            button.addEventListener('click', onclick);

            // Append elements to hidden div 
            divHidden.appendChild(hr2);
            divHidden.appendChild(labelEmail);
            divHidden.appendChild(inputEmail);
            divHidden.appendChild(labelAge);
            divHidden.appendChild(inputAge);

            // Append elements to div profile
            divProfile.appendChild(img);
            divProfile.appendChild(labelLock);
            divProfile.appendChild(inputRadioLock);
            divProfile.appendChild(labelUnlock);
            divProfile.appendChild(inputRadioLock2);
            divProfile.appendChild(hr);
            divProfile.appendChild(labelUsername);
            divProfile.appendChild(userNameInput);
            divProfile.appendChild(divHidden);
            divProfile.appendChild(button);

            // Append to main div
            mainElement.appendChild(divProfile);
        })
    }).catch(err => {
        mainElement.textContent = err;
    })

    function onclick(ev) {
        if (ev.target.parentElement.querySelector('input[value="lock"]').checked) {
            return;
        }

        if (ev.target.parentElement.querySelector('input[value="unlock"]').checked) {
            if (ev.target.parentElement.querySelector('div').style.display == 'none') {
                ev.target.parentElement.querySelector('div').style.display = 'block';
                ev.target.parentElement.querySelector('button').textContent = "Hide it";
            } else if (ev.target.parentElement.querySelector('div').style.display == 'block') {
                ev.target.parentElement.querySelector('div').style.display = 'none';
                ev.target.parentElement.querySelector('button').textContent = "Show more";
            }
        };
    }
}