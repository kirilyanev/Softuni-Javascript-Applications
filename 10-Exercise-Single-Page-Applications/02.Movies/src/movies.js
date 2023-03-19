const catalog = document.querySelector('#movies-list');

// GET Movies
async function getMovies() {
    const url = 'http://localhost:3030/data/movies';
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch(err) {
        alert(err);
    }
}

export async function displayMovies() {
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}


function createMoviePreview(movie) {
    const divCard = document.createElement('div');
    const divBody = document.createElement('div');
    const divFooter = document.createElement('div');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');
    const a = document.createElement('a');
    const button = document.createElement('button');

    divCard.className = 'card mb-4';
    divBody.className = 'card-body';
    divFooter.className = 'card-footer';
    img.className = 'card-img-top';
    img.src = movie.img;
    img.setAttribute('alt', 'Card image cap');
    img.width = '400';
    h4.className = 'card-title';
    h4.textContent = movie.title;
    a.href = `#/details/${movie._id}`;
    a.setAttribute('data-id', movie._id);
    button.type = 'button';
    button.className = 'btn btn-info';
    button.textContent = 'Details';
    
    divBody.appendChild(h4);
    a.appendChild(button);
    divFooter.appendChild(a);
    divCard.appendChild(img);
    divCard.appendChild(divBody);
    divCard.appendChild(divFooter);

    return divCard;
}

{/* <div class="card mb-4">
    <img class="card-img-top" src="https://pbs.twimg.com/media/ETINgKwWAAAyA4r.jpg"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">Wonder Woman 1984</h4>
    </div>
    <div class="card-footer">
        <a href="#/details/6lOxMFSMkML09wux6sAF">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>
</div> */}