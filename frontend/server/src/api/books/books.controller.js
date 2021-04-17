const Book = require('../../models/book');

exports.list = (ctx) => {
    ctx.body = 'listed';
};

exports.create = async (ctx) => {
    const { title, authors, publishedDate, price, tags } = ctx.request.body;

    const book = new Book({
        title,
        authors,
        publishedDate,
        price,
        tags,
    });

    try {
        await book.save();
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = book;
};

exports.delete = (ctx) => {
    ctx.body = 'deleted';
};

exports.replace = (ctx) => {
    ctx.body = 'replaced';
};

exports.update = (ctx) => {
    ctx.body = 'updated';
};
