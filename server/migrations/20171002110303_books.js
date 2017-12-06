exports.up = function (knex, Promise) {
    return knex.schema.createTable('books', (table) => {
        table.increments();
        table.text('title');
        table.text('genre');
        table.text('description');
        table.text('coverUrl');
        // table.integer('author_id').references('authors_books.book_id').onDelete("CASCADE");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('books');
};