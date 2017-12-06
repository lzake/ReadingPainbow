exports.up = function (knex, Promise) {
    return knex.schema.createTable('authors_books', (table) => {
        table.increments();
        table.integer('book_id').references('books.id').onDelete("CASCADE");
        table.integer('author_id').references('authors.id').onDelete("CASCADE");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('authors_books');
};