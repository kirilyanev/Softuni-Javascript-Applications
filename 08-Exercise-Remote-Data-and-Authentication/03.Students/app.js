function listStudents() {
    const submitBtn = document.getElementById('submit');
    const tableBodyElement = document.querySelector('#results tbody');
    const url = 'http://localhost:3030/jsonstore/collections/students';

    submitBtn.addEventListener('click', submitForm);

    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        tableBodyElement.replaceChildren();
        for (let key in Object.values(data)) {
            const student = Object.values(data)[key];
            const tr = document.createElement('tr');
            const tdFirstName = document.createElement('td');
            const tdLastName = document.createElement('td');
            const tdFacNumber = document.createElement('td');
            const tdGrade = document.createElement('td');

            tdFirstName.textContent = student.firstName;
            tdLastName.textContent = student.lastName;
            tdFacNumber.textContent = student.facultyNumber;
            tdGrade.textContent = student.grade;

            tr.appendChild(tdFirstName);
            tr.appendChild(tdLastName);
            tr.appendChild(tdFacNumber);
            tr.appendChild(tdGrade);

            tableBodyElement.appendChild(tr);
        }
    }).catch(err => {
        alert(err);
    })
}

function submitForm() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const formElement = document.getElementById('form');

    formElement.addEventListener('submit', ev => {
        ev.preventDefault();
    })

    const data = new FormData(formElement);
    const values = [...data.values()];

    const [firstName, lastName, facultyNumber, grade] = [...values];
    const validFacNumber = facultyNumber.match(/[0-9]*/gm);
    const validGrade = grade.match(/[0-9.]*/gm);
    
    // Validate inputs

    if (
        firstName == '' ||
        lastName == '' ||
        grade == '' ||
        facultyNumber == '' ||
        validGrade[0] != grade ||
        validFacNumber[0] != facultyNumber) {
        return;
    }

    const studentEntry = {
        "firstName": firstName,
        "lastName": lastName,
        "facultyNumber": facultyNumber,
        "grade": grade,
    }

    const options = {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(studentEntry),
    }

    fetch(url, options).then(response => {
        return response.json();
    }).then(data => {

    }).catch(err => {
        alert(err);
    })

    listStudents();
    formElement.reset();
}

listStudents();