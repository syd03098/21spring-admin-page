const Router = require('koa-router');

const books = new Router();
const booksHandler = require('./books.controller');

books.get('/', booksHandler.list);

books.post('/', booksHandler.create);

books.delete('/', booksHandler.delete);

books.put('/', booksHandler.replace);

books.patch('/', booksHandler.update);

module.exports = books;
