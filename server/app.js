var express = require('express')
var app = express()
var pg = require('pg')
var cors = require('cors')
var knex = require('./knex.js')
var bodyParser = require('body-parser')

var authorRoute = require('./routes/author-route.js')
var bookRoute = require('./routes/book-route.js')
var bothRoute = require('./routes/authors_books-route.js')

app.use(cors())
app.use(bodyParser())


app.use('/authors/', authorRoute)
app.use('/books/', bookRoute)
app.use('/both/', bothRoute)



app.listen(3000, function () {
    console.log('Listening on port 3000')
})

module.exports = app