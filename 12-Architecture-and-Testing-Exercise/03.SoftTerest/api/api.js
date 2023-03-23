const host = 'http://localhost:3030/';

async function requester(method, url, data){
    const user = sessionStorage.getItem('user');
    const options = {
        method: method,
        headers: {},
    }

    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (user) {
        const token = JSON.parse(user).accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const res = await fetch(`${host}${url}`,options);
        if (!res.ok) {
            if (res.status == 403) {
                console.log(options);
                sessionStorage.removeItem('user');
                throw new Error('Access denied');
            }
            const err = await res.json();
            throw new Error(err.message);   
        }
        if(res.status == 204){
            return res;
        } else {
            return res.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');
const put = requester.bind(null, 'PUT');
const del = requester.bind(null,'DELETE');


export {
    get,
    post,
    put,
    del
}