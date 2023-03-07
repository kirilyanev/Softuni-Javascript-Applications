function attachEvents() {
    const posts = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    const loadBtn = document.getElementById('btnLoadPosts');
    const viewBtn = document.getElementById('btnViewPost');

    loadBtn.addEventListener('click', loadPosts);
    viewBtn.addEventListener('click', viewComments);

    const postUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    function loadPosts() {
        posts.replaceChildren();

        fetch(postUrl).then(response => {
            return response.json();
        }).then(data => {
            Object.values(data).forEach(post => {
                const option = document.createElement('option');
                option.setAttribute('value', `${post.id}`);
                option.setAttribute('body', `${post.body}`);
                option.textContent = post.title;
                posts.appendChild(option);
            })
        }).catch(error => {
            console.log(error);
        })
    }

    async function viewComments() {
        // const postResponse = await fetch(postUrl);
        // const postData = await postResponse.json();

        // postTitle.textContent = postData[selectedOption].title;
        // postTitle.textContent = posts.selectedOptions[0].textContent;
        
        // postBody.textContent = postData[selectedOption].body;
        // postBody.textContent = posts.selectedOptions[0].getAttribute('body');

        postTitle.textContent = posts.selectedOptions[0].textContent;
        postBody.textContent = posts.selectedOptions[0].getAttribute('body');
        
        let selectedOption = document.getElementById('posts').value;

        postComments.replaceChildren();

        const commentsResponse = await fetch(commentsUrl);
        const commentsData = await commentsResponse.json();

        let comments = Object.values(commentsData).filter(post => post.postId == selectedOption);

        comments.forEach(comment => {
            const li = document.createElement('li');
            li.setAttribute('id', `${comment.id}`);
            li.textContent = comment.text;
            postComments.appendChild(li);
        })
    }
}

attachEvents();