
// const express = require('express')
// const router = express.Router();
// const queries = require('./books_queries')


// function isValidID(req, res, next ) {
//   if(!isNaN(req.params.id)) return next();
//   next(new Error('Invalid book'));
// }

// function validBook(book) {
//   const hasTitle = typeof book.title == 'string' && book.title.trim() != '';
//   const hasGenre = typeof book.genre == 'string' && book.genre.trim() != '';
//   const hasDescription = typeof book.description == 'string' && book.description.trim() != '';
//   const hasURL = typeof book.cover_url == 'string' && book.cover_url.trim() != '';
//   return hasTitle && hasGenre && hasDescription && hasURL;
// }

// router.get('/', (req, res) => {
//   queries.getAll().then(book => {
//     res.json(book)
//   });
// });

// router.get('/:id', isValidID, (req, res, next) => {
//     queries.getOne(req.params.id).then(book => {
//       if(book) {
//         res.json(book);
//       }
//       else {
//         res.status(404);
//         next();
//       }
//   });
// });

// router.post('/', (req, res, next) => {
//   if(validBook(req.body)) {
//     queries.create(req.body).then(book => {
//       res.json("success")
//     })
//   } else {
//     next(new Error('Invalid book post'));
//   }
// })

// router.put('/:id', isValidID, (req, res, next) => {
//   if(validBook(req.body)) {
//     queries.update(req.params.id, req.body).then(bookDetails => {
//       res.json("success")
//     })
//   } else {
//     next(new Error('Invalid book put'));
//   }
// })

// router.delete('/:id', isValidID, (req, res) => {
//   queries.delete(req.params.id).then(() => {
//     res.json({
//       delete: true
//     })
//   })
// })

// module.exports = router;




var express = require('express')
var knex = require('../knex')
var router = express.Router()

// Get all books
router.get('/', function (req, res) {
  knex.select('id', 'title', 'genre', 'description', 'coverUrl')
    .from('books')
    .then(data => {
      res.json(data)
    })
})

// Get books by id
router.get('/:id', function (req, res) {
  let bookId = req.params.id
  knex.select('id', 'title', 'genre', 'description', 'coverUrl')
    .from('books')
    .where('id', bookId)
    .then(data => {
      res.json(data)
    })
});

// update books
router.put('/:id', function (req, res) {
  let bookId = req.params.id
  var info = req.body
  knex('books')
    .where('books.id', bookId)
    .update(info)
    .returning('*')
    .then(() => {
      res.json(info);
    })
})

// add books

router.post('/', function (req, res) {
  let bookRow = req.body
  knex('books')
    .insert(bookRow)
    .returning('*')
    .then(() => {
      res.json('books')
    })
})

// Delete books by id
router.delete('/:id', function (req, res) {
  let booksId = req.params.id
  knex('books')
    .where('books.id', booksId)
    .del()

    .then(() => {
      res.send('deleted')
    })

})


// Get book by id
router.get('/:id', function (req, res) {
  let id = req.params.id
  knex.select('id', 'title', 'genre', 'description', 'coverUrl')
  .from('books')
    .where('id', id)
    .then( function (data) {
      res.json(data)
    })
})

module.exports = router