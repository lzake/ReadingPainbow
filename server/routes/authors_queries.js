const knex = require('../knex')

module.exports = {
  getAll() {
    return knex('authors');
  },
  getOne(id) {
    return knex('authors').where('id', id).first();
  },
  create(author) {
    return knex('authors').insert(author, '*');
  },
  update(id, authorDetails) {
    return knex('authors').where('id', id).update(authorDetails, '*');
  },
  delete(id) {
    return knex('authors').where('id', id).del();
  }
}