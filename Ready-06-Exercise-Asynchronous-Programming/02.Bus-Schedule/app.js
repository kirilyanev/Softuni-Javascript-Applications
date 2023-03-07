function solve() {
    const busStopElement = document.getElementsByClassName('info')[0];
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    let stop = 'depot';

    function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop}`;
        fetch(url).then(response => {
            if (response.status != 200) {
                throw 'Error';
            }
            return response.json();
        }).then(data => {
            busStopElement.textContent = `Next stop ${data.name}`;
            departButton.disabled = true;
            arriveButton.disabled = false;
        }).catch(error => {
            busStopElement.textContent = error;
        })
    }

    function arrive() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop}`;
        fetch(url).then(response => {
            if (response.status != 200) {
                throw 'Error';
            }
            return response.json();
        }).then(data => {
            busStopElement.textContent = `Arriving at ${data.name}`;
            departButton.disabled = false;
            arriveButton.disabled = true;
            stop = data.next;
        }).catch(error => {
            busStopElement.textContent = error;
        })
    }

    return {
        depart,
        arrive
    };
}

let result = solve();