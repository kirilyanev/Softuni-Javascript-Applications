function bookLibrary() {
    const loadBtn = document.getElementById('loadBooks');
    const submitBtn = document.querySelector('form button');

    let url;
    let id;

    loadBtn.addEventListener('click', () => getBooks(url));
    submitBtn.addEventListener('click', ev => createUpdateBook(ev, url));


    function getBooks(url) {
        const table = document.getElementsByTagName('tbody')[0];
        table.replaceChildren();
        
        url = 'http://localhost:3030/jsonstore/collections/books';

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            const entries = Object.entries(data);
    
            for (let entry of entries) {
                const id = entry[0];
                const bookInfo = entry[1];
    
                createTableRow(bookInfo, id);
            }
        }).catch(err => {
            alert(err);
        })
    }
    
    function createUpdateBook(ev, url) {
        ev.preventDefault();

        const newOrEdit = document.querySelector('form h3').textContent;
        const submitBtn = document.querySelector('form button');
        submitBtn.textContent = 'Submit';
    
        const h3 = document.getElementsByTagName('h3')[0];
        h3.textContent = 'FORM';
    
        const formElement = document.getElementsByTagName('form')[0];
    
        const data = new FormData(formElement);
    
        const title = data.get('title');
        const author = data.get('author');
    
        if (title == '' || author == '') {
            return;
        }
    
        const book = {
            "author": author,
            "title": title
        }
    
        let options = {};
        if(newOrEdit == 'Edit FORM') {
            options = {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(book)
            }
        } else if (newOrEdit == 'FORM') {
            url = 'http://localhost:3030/jsonstore/collections/books';
            options = {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(book)
            }
        }

        fetch(url, options).then(response => {
            return response.json()
        }).then(data => {
            return data;
        }).catch(err => {
            alert(err);
        })

        formElement.reset();
    }
    
    function updateBook(ev) {
        id = ev.target.id;
        url = `http://localhost:3030/jsonstore/collections/books/${id}`;

        const tableTdElements = ev.target.parentElement.parentElement;
        const title = tableTdElements.getElementsByTagName('td')[0].textContent;
        const author = tableTdElements.getElementsByTagName('td')[1].textContent;
        const submitBtn = document.querySelector('form button');
        submitBtn.textContent = 'Save';
        
        const h3 = document.getElementsByTagName('h3')[0];
        h3.textContent = 'Edit FORM';
        const titleForm = document.getElementsByName('title')[0];
        titleForm.value = title;
        const authorForm = document.getElementsByName('author')[0];
        authorForm.value = author;
    }
    
    function deleteBook(ev) {
        const id = ev.target.id;
        const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    
        const options = {
            method: 'delete',
        }
    
        fetch(url, options).then(response => {
            return response.json();
        }).then(data => {
            ev.target.parentElement.parentElement.remove();
        }).catch(err => {
            alert(err);
        });
    }
    
    function createTableRow(bookInfo, id) {
        const table = document.getElementsByTagName('tbody')[0];
    
        const tr = document.createElement('tr');
        const tdAuthor = document.createElement('td');
        const tdTitle = document.createElement('td');
        const tdButtons = document.createElement('td');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
    
        tdAuthor.textContent = bookInfo.author;
        tdTitle.textContent = bookInfo.title;
        editBtn.textContent = 'Edit';
        deleteBtn.textContent = 'Delete';
    
        editBtn.setAttribute('id', `${id}`);
        editBtn.addEventListener('click', (ev) => updateBook(ev));
        deleteBtn.setAttribute('id', `${id}`);
        deleteBtn.addEventListener('click', ev => deleteBook(ev));
    
        tdButtons.appendChild(editBtn);
        tdButtons.appendChild(deleteBtn);
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdButtons);
        table.appendChild(tr);
    }
}

bookLibrary();