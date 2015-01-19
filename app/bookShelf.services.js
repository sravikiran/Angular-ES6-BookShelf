var moduleName='bookShelf.services';

const HTTP = new WeakMap();

class BookShelfService
{
  constructor($http)
  {
    HTTP.set(this, $http);
  }

  getActiveBooks(){
    return HTTP.get(this).get('/api/activeBooks').then(result => result.data );
  }

  getArchivedBooks(){
    return HTTP.get(this).get('/api/archivedBooks').then(result => result.data );
  }

  markBookRead(bookId, isBookRead){
    return HTTP.get(this).put(`/api/markRead/${bookId}`, {bookId: bookId, read: isBookRead});
  }

  addToArchive(bookId){
    return HTTP.get(this).put(`/api/addToArchive/${bookId}`,{});
  }

  checkIfBookExists(title){
    return HTTP.get(this).get(`/api/bookExists/${title}`).then(result =>  result.data );
  }

  addBook(book){
    return HTTP.get(this).post('/api/books', book);
  }

  static bookShelfFactory($http){
    return new BookShelfService($http);
  }
}

BookShelfService.bookShelfFactory.$inject = ['$http'];

angular.module(moduleName, [])
  .factory('bookShelfSvc', BookShelfService.bookShelfFactory);

export default moduleName;
