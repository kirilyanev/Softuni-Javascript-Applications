import { sendPostRequest, getPosts } from "./requests.js";
import { renderPosts } from "./render.js";
import { showHome } from "./home.js";


let selectedPost = '';


if (document.location.pathname.split('/').pop() == 'index.html') {
console.log(selectedPost);
const home = document.querySelector('a');
home.addEventListener('click', showHome);

const postBtn = document.querySelector('.public');
const cancelBtn = document.querySelector('.cancel');

const title = document.querySelector('#topicName');
    const username = document.querySelector('#username');
    const postText = document.querySelector('#postText');

    
    onLoad();
    
    async function onLoad() {
        const posts = await getPosts();
        
        renderPosts(posts);

        const allPosts = document.querySelectorAll('.comment');

        allPosts.forEach(c => c.addEventListener('click',()=> {
            selectedPost = c.id;
            window.location.href = "theme-content.html";
        }));

    }


    cancelBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        title.value = '';
        username.value = '';
        postText.value = '';
    })

    postBtn.addEventListener('click', (ev) => newTopic(ev))


    async function newTopic(ev) {
        ev.preventDefault();

        // Inputs validation
        if (title.value == '' || username.value == '' || postText.value == '') {
            return alert('All fields must be filled');
        }
        const time = getTimeDate();
        console.log(time);
        const post = {
            title: title.value,
            username: username.value,
            post: postText.value,
            time: time
        };

        const postData = await sendPostRequest(post);
        return postData;

        // title.value = '';
        // username.value = '';
        // postText.value = '';
    }


    function getTimeDate() {
        const dNow = new Date();
        const localdate = (dNow.getMonth() + 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes() + ':' + dNow.getSeconds();
        return localdate;
    }
} else if (document.location.pathname.split('/').pop() == 'theme-content.html') {


    console.log(selectedPost);


    const home = document.querySelector('a');
    home.addEventListener('click', showHome);


}

