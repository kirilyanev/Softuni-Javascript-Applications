import { html } from '../../node_modules/lit-html/lit-html.js';
import { like, getLikes, getUserLike } from '../data/likes.js';
import { deleteBook, getById } from '../data/books.js';
import { getUserData } from '../data/util.js';


const detailsTemplate = (book, id, onDelete, onLike) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <div class="actions">
                ${book.canEdit || book.canLike ? html`
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${book.canEdit ? html`
                <a class="button" href="/catalog/${id}/edit">Edit</a>
                <a @click=${onDelete} class="button" href="#">Delete</a>` : null}` : null} 
    
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                <a class="button" href="#">Like</a>
    
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description} ...</p>
        </div>
    </section>`;


export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const requests = [
        getById(id),
        getLikes(id)
    ];
    const userData = getUserData();

    if (userData) {
        requests.push(getUserLike(id, userData._id));
    }

    const [book, likes, hasLiked] = await Promise.all(requests);
    book.likes = likes;

    if (userData) {
        book.canEdit = userData._id == book._ownerId;
        book.canLike = book.canEdit == false && hasLiked == 0;
    }

    ctx.render(detailsTemplate(book, onDelete, onLike));
    ctx.render(detailsTemplate(book, id));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteBook(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike() {
        await like(id);
        ctx.page.redirect('/catalog/' + id);
    }
}