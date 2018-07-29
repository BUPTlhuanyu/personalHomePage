'use strict';

import Books from '../models/book'

class BookHandle {
    constructor() {
        this.getBooks = this.getBooks.bind(this);
    }

    async getBooks(req, res, next) {
        let bookInfo;
        bookInfo = await Books.getAll();
        res.send(bookInfo);
    }
}
export default new BookHandle()