import { routes } from "./router.js";

const catalog = document.querySelector('#movies-list');
const addMovieForm = document.querySelector('#add-movie-form');

const baseUrl = 'http://localhost:3030/data/movies';

// GET Movies
async function getMovies(id) {
    let url = baseUrl;

    if (id) {
        url += `/${id}`
    }
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch(err) {
        alert(err);
    }
}

// ADD Movie
export function addMovie() {
    addMovieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(addMovieForm);
        const title = data.get('title');
        const description = data.get('description');
        const img = data.get('img');
        const token = sessionStorage.getItem("accessToken");

        // Input Validation
        if (title == '' || description == '' || img == '') {
            return alert('Empty input field');
        }

        const body = {
            title: title,
            description: description,
            img: img
        }
        
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "X-Authorization": `${token}`
        },
            body: JSON.stringify(body)
        }

        fetch(baseUrl,options)
        .then(res => res.json())
        .then(() => {
            routes.showHome();
            displayMovies();
        }).catch(err => {
            alert(err);
        })
    })
}

export async function displayMovies() {
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}


function createMoviePreview(movie) {
    const divCard = document.createElement('div');
    const divBody = document.createElement('div');
    const divFooter = document.createElement('div');
    const spanHidden = document.createElement('span');
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
    button.setAttribute('data-id',movie._id);
    spanHidden.style.display = 'none';
    spanHidden.className = 'hidden';
    spanHidden.textContent = movie.description;

    divBody.appendChild(h4);
    a.appendChild(button);
    divFooter.appendChild(a);
    divCard.appendChild(img);
    divCard.appendChild(divBody);
    divCard.appendChild(divFooter);
    divCard.appendChild(spanHidden);

    return divCard;
}

export async function descriptionTemplate(movieId) {
    console.log(movieId);
    const movie = await getMovies(movieId);
    console.log(movie.description);

    const template = `<h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${movie.img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>${movie.description}</p>
      <a class="btn btn-danger" href="#">Delete</a>
      <a class="btn btn-warning" href="#">Edit</a>
      <a class="btn btn-primary" href="#">Like</a>
      <span class="enrolled-span">Liked 1</span>
    </div>`

    return template;
}


// <h1>Movie title: Black Widow</h1>

// <div class="col-md-8">
//   <img
//     class="img-thumbnail"
//     src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
//     alt="Movie"
//   />
// </div>
// <div class="col-md-4 text-center">
//   <h3 class="my-3">Movie Description</h3>
//   <p>
//     Natasha Romanoff aka Black Widow confronts the darker parts of
//     her ledger when a dangerous conspiracy with ties to her past
//     arises. Comes on the screens 2020.
//   </p>
//   <a class="btn btn-danger" href="#">Delete</a>
//   <a class="btn btn-warning" href="#">Edit</a>
//   <a class="btn btn-primary" href="#">Like</a>
//   <span class="enrolled-span">Liked 1</span>
// </div>