
export function sendPostRequest(post) {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    
    const options = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(post)
    }

    const postData = fetch(url,options)
    .then(res => {
        return res.json();
    }).then(userData => {
        return userData;
    }).catch(err=>{
        alert(err);
    })

    return postData;
}

export function getPosts() {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const posts = fetch(url)
    .then(res=> res.json())
    .then(posts=> {
        return posts;
    }).catch(err => {
        alert(err);
    })
    
    return posts;
}
