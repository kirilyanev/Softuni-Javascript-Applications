import { showDetails } from "./details.js";

const section = document.getElementById('home-view');
const main = document.getElementsByTagName('main')[0];
const form = main.querySelector('#home-view form');
form.addEventListener('submit', onSubmit);

section.remove();

export async function showHome() {
    const topicContainer = section.querySelector('.topic-title');

    const posts = await loadPosts();
    const content = Object.values(posts).map(x => topicTemplate(x));
    topicContainer.replaceChildren(...content);
    main.replaceChildren(section);
}


function topicTemplate(data) {
    const container = document.createElement('div');
    container.classList.add("topic-container")
    container.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
        <a href="#" class="normal" id="${data._id}">
            <h2>${data.topicName}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${data.date}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${data.username}</span></p>
                </div>
            </div>
        </div>
        </div>
    </div>`;

    container.querySelector('a').addEventListener('click',showDetails);
    return container;
}

function onSubmit(ev) {
    ev.preventDefault();

    if (ev.submitter.textContent == 'Cancel') {
        form.reset();
        return;
    }


    const formData = new FormData(form);
    const { topicName, username, postText } = Object.fromEntries(formData);

    if (topicName == '' || username == '' || postText == '') {
        return;
    };

    createPost({ topicName, username, postText, date: new Date() });
    form.reset();
}

function createPost(bodyData) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
    }

    // const response = await fetch(url, options);
    // const data = await response.json();
    fetch(url,options)
    .then(res=> res.json())
    .then(data => {
        return data;
    }).catch(err=>{
        alert(err);
    })
    // return data;
}

async function loadPosts() {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const response = await fetch(url);
    const posts = await response.json();
    return posts;
}