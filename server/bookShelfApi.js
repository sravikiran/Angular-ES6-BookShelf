var _ = require('underscore');
var books = require('./bookShelfData').books;

function addABook(newBook) {
    var lastBook = _.max(books, function (book) {
        return book.bookId;
    });

    newBook.bookId = lastBook.bookId + 1;
    newBook.read = false;
    newBook.archived = false;

    books.push(newBook);
    return newBook;
}

function getBooks(isArchived) {
    return _.filter(books, function (book) {
        return book.archived === isArchived;
    });
}

function modifyBook(modifiedBook) {
    var bookIndex = -1;
    var bookInCollection = _.find(books, function (book) {
        bookIndex++;
        return book.bookId === modifiedBook.bookId;
    });

    if(!bookInCollection){
        return null;
    }
    else{
        books[bookIndex] = modifiedBook;
        return modifiedBook;
    }
}

function modifyReadStatus(bookId, isRead){
    var bookIndex = -1;
    var bookInCollection = _.find(books, function (book) {
        bookIndex++;
        return book.bookId === bookId;
    });

    if(!bookInCollection){
        return null;
    }
    else{
        books[bookIndex].read = isRead;
        return books[bookIndex];
    }
}

function addToArchive(bookId){
    var bookIndex = -1;
    var bookInCollection = _.find(books, function (book) {
        bookIndex++;
        return book.bookId === bookId;
    });

    if(!bookInCollection){
        return null;
    }
    else{
        books[bookIndex].archived = true;
        return books[bookIndex];
    }
}

function bookExists(title){
    var bookInCollection = _.find(books, function (book) {
        return book.title === title;
    });

    return !!bookInCollection;
}

module.exports = {
    getBooks: getBooks,
    addABook: addABook,
    modifyBook: modifyBook,
    modifyReadStatus: modifyReadStatus,
    addToArchive: addToArchive,
    bookExists: bookExists
};
