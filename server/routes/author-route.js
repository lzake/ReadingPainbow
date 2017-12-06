// const express = require('express')
// const router = express.Router();
// const queries = require('./authors_queries')


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

// Get all authors
router.get('/', function (req, res) {
  knex.select('id', 'authorFirstName', 'authorLastName', 'bio', 'portraitUrl')
    .from('authors')
    .then( function (data) {
      res.json(data)
    })
})

// Get authors by id
router.get('/:id', function (req, res) {
  let id = req.params.id
  knex.select('authorFirstName', 'authorLastName', 'bio', 'portraitUrl')
    .from('authors')
    .where('id', id)
    .then( function (data) {
      res.json(data)
    })
})

//update authors
router.put('/:id', function (req, res) {
  let authorsId = req.params.id
  var info = req.body
  knex('authors')
    .where('authors.id', authorsId)
    .update(info)
    .returning('*')
      .then( () => {
        res.json(info);
      })
})

// add authors
router.post('/', function (req, res) {
  var authRow = req.body
  knex('authors')
    .insert(authRow)
    .returning('*')
      .then( () => {
        res.json('authors');
      })
})

// Get all books by a particular author
router.get('/:id/books', function (req, res) {
  let authorId = req.params.id
  knex.select('title', 'genre', 'description', 'coverUrl')
    .from('books')
    .where('authors_books.author_id', authorId)
    .then( function (data) {
      res.json(data)
    })
})

// // Delete authors by id
router.delete('/:id', function (req, res) {
  let authId = req.params.id
  knex('authors')
    .where('authors.id', authId)
    .del()

    .then(() => {
      res.send('deleted')
    })
})




module.exports = router
