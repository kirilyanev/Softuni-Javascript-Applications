import { get, post, put, del } from "./api.js";

const endpoints = {
    catalog: '/data/books?sortBy=_createdOn%20desc',
    collection: userId => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    byId: '/data/books/'
}

export async function getAllBooks() {
    return get(endpoints.catalog);
}

export async function getMyBooks(userId){
    return get(endpoints.collection(userId));
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function createBook(data) {
    return post(endpoints.catalog, data)
}

export async function editBook(id, data) {
    return put(endpoints.byId + id, data);
}

export async function deleteBook(id) {
    return del(endpoints.byId +id);
}