var express = require('express')
var knex = require('../knex')
var router = express.Router()

// Get listing
router.get('/', function (req, res) {
  knex.select('id', 'book_id', 'author_id')
    .from('authors_books')
    .then( function (data) {
      res.json(data)
    })
})

module.exports = router
