exports.up = function (knex, Promise) {
    return knex.schema.createTable('authors', (table) => {
        table.increments();
        table.text('authorFirstName');
        table.text('authorLastName');
        table.text('bio');
        table.text('portraitUrl');
        // table.integer('books_id').references('authors_books.author_id').onDelete("CASCADE");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('authors');
};