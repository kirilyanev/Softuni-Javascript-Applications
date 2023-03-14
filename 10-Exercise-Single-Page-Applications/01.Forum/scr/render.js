
export function renderPosts(posts) {
    const data = Object.values(posts)
    for (let post of data) {
        const topics = document.querySelector('.topic-title');
        const divTopic = document.createElement('div');
        divTopic.setAttribute('id', post._id);

        divTopic.innerHTML = `
    <div class="comment" id="${post._id}">
        <div class="header" id="${post._id}">
            <img src="./static/profile.png" alt="avatar" id="${post._id}">
            <p id="${post._id}"><span id="${post._id}">${post.username}</span> posted on <time id="${post._id}">${post.time}</time></p>
    
            <p class="post-content" id="${post._id}">${post.post}</p>
        </div>
    </div>
    `;
    
    // TO DO

        // divTopic.addEventListener('click', (ev) => {
        //     window.location.href = "theme-content.html";
        // })
    
        topics.appendChild(divTopic);
    }
}


export function renderSelectedPost() {

}
