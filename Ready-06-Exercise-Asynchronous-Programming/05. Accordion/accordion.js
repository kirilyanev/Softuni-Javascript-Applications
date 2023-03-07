function solution() {
    const mainElement = document.getElementById('main');
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    fetch(baseUrl).then(response => {
        return response.json();
    }).then(data => {
        for (let article of data) {
            let id = article._id;
            let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

            fetch(url).then(response => {
                return response.json();
            }).then(data => {
                const divAccordion = document.createElement('div');
                divAccordion.className = 'accordion';

                const divHead = document.createElement('div');
                divHead.className = 'head';

                const span = document.createElement('span');
                span.textContent = `${data.title}`;

                const button = document.createElement('button');
                button.textContent = 'More';
                button.setAttribute('id', `${id}`);
                button.addEventListener('click',onclick);

                const divExtra = document.createElement('div');
                divExtra.className = 'extra';

                const p = document.createElement('p');
                p.textContent = `${data.content}`;

                // Appending elements
                divHead.appendChild(span);
                divHead.appendChild(button);

                divExtra.appendChild(p);

                divAccordion.appendChild(divHead);
                divAccordion.appendChild(divExtra);

                mainElement.appendChild(divAccordion);
            }).catch(error =>{
                console.log(error);
            })
        }
    }).catch(error => {
        console.log(error);
    })

    function onclick(e){
        const extraDiv = e.target.parentElement.parentElement.querySelector('.extra');
        const button = e.target;

        if(extraDiv.style.display == '' || extraDiv.style.display == 'none') {
            extraDiv.style.display = 'block';
            button.textContent = 'Less';
            
        } else {
            button.textContent = 'More';
            extraDiv.style.display = 'none';
        }
    }
}
solution()