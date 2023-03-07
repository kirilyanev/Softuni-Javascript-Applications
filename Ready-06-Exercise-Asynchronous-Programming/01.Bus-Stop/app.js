function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    fetch(url).then(response => {
        if (response.status != 200) {
            throw 'Error';
        }

        return response.json();
    }).then(data => {
        stopName.textContent = data.name;
        buses.replaceChildren();
        for (let key of Object.keys(data.buses)) {
            const li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`;
            buses.appendChild(li);
        }
    }).catch(error => {
        buses.replaceChildren();
        stopName.textContent = error;
    })
}