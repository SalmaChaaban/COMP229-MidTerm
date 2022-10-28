// books.js - Salma Chaaban - 301216551 - Favorite Book List

// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {
   res.render('index', { title: 'Add Book', page: 'books/edit', book: {} });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    let newBook = booksModel({ // instantiate an object of the book model
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    booksModel.create(newBook, (err, Book) => { // pass the object to the create method
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/list')
    })
}

// GET the Book Details page in order to edit an existing Book

export function displayEditPage(req, res, next){
    let id = req.params.id; // id variable set to the id property of the request object

    booksModel.findById(id, (err, book) => { // pass the id to the findById method
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Book', page: 'books/edit', book: book });
    });    
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
   let id = req.params.id; // declare an id variable

   let newBook = ({ // instantiating an object of the book model with the _id property
        _id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
   });

   booksModel.updateOne({_id: id }, newBook, (err, Book) => { // pass the object to updateOne method
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/list')
   })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    let id = req.params.id; // declare an id variable

    booksModel.remove({_id: id }, (err) => { // pass the id to the book model with the remove method
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/books/list');
    })
}