function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const textArea = document.getElementById('messages');
    const url = 'http://localhost:3030/jsonstore/messenger';

    submitBtn.addEventListener('click',postMessage);
    refreshBtn.addEventListener('click',displayMessages)

    function postMessage() {
        const authorInputElement = document.querySelector("input[name='author']");
        const messageInputElement = document.querySelector("input[name='content']");
    
        const data = {
            author: authorInputElement.value,
            content: messageInputElement.value,
        }
    
        const options = {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data),
        };
    
        fetch(url,options);

        authorInputElement.value = '';
        messageInputElement.value = '';
    }

    function displayMessages() {
        fetch(url).then(response => {
            return response.json();
        }).then(data =>{
            textArea.textContent = '';
            let messages = [];
            Object.values(data).forEach(c => messages.push(`${c.author}: ${c.content}`));
            textArea.textContent = messages.join('\n');
        })
    }
}

attachEvents();