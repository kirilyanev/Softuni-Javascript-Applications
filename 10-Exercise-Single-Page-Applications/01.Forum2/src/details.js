const section = document.getElementById('details-view');
const main = document.getElementsByTagName('main')[0];
const form = section.querySelector('form');
form.addEventListener('submit',onSubmit);
const themeContentWrapper = document.getElementById('theme-content-wrapper');

const comment = document.querySelector('.comment');
section.remove();

let id;

export async function showDetails(ev) {
    if(!ev) {
        return;
    }

    if(ev.target.tagName == "H2") {
        id = ev.target.parentElement.id;
    } else if(ev.target.tagName == "A"){
        id = ev.target.id;
    }
    
    const topic = await loadTopic(id);
    const comments = await loadComment(id);
    
    // const template = topicTemplate(topic,comments);
    // themeContentWrapper.replaceChildren(template);

    const template2 = topicTemplate(topic,comments);
    themeContentWrapper.replaceChildren(template2);

    const commentElements = commentTemplate(topic, comments);
    themeContentWrapper.appendChild(commentElements);

    main.replaceChildren(section);
    // const titleElement = document.getElementById('title');
    // titleElement.innerText = `${topic.title}`;
}

function commentTemplate(topic,comments) {
    //<div class="comment">

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');

    commentContainer.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>

        <p class="post-content">${topic.content}</p>
    </div>`;


    comments.forEach(x=> {
        const comment = createComment(x);
        commentContainer.appendChild(comment);
    });
    return commentContainer;
}

function topicTemplate(topic,comments) {    
    const topicContainer = document.createElement('div');
    topicContainer.classList.add('theme-title');

    topicContainer.innerHTML = `
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2>${topic.title}</h2>
        </div>
    </div>`

    //<div class="comment">

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');

    commentContainer.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>

        <p class="post-content">${topic.content}</p>
    </div>`;


    // comments.forEach(x=> {
    //     const comment = createComment(x);
    //     commentContainer.appendChild(comment);
    // });
    // return topicContainer;
    commentTemplate(topic,comments);

}

function createComment(data) {
    const container = document.createElement('div');
    container.classList.add('user-comment');
    container.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
            <div class="post-content">
                <p>${data.postText}</p>
            </div>
        </div>
    </div>`

    return container;
}
function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const {postText, username} = Object.fromEntries(formData);
    createPost({postText, username, id, date: new Date()});
    showDetails(e);
}

async function createPost(body) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';

    const options = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body)
    }
    try {
        const response = await fetch(url,options);
        const data = await response.json();
        const commentEl = createComment(data);
        comment.appendChild(commentEl);
        form.reset();
    } catch (error) {
        alert(error);
    }
}

async function loadComment(id) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const filterData = Object.values(data).filter(x=> x.id == id);
        return filterData;
    } catch (error) {
        alert(error);
    }
}


async function loadTopic(id) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error);
    }
}
