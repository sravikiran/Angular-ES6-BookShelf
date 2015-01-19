const INIT = new WeakMap();
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();

class HomeController{
  constructor($timeout, bookShelfSvc){
    SERVICE.set(this, bookShelfSvc);
    TIMEOUT.set(this, $timeout);
    INIT.set(this, () => {
      SERVICE.get(this).getActiveBooks().then(books => {
        this.books = books;
      });
    });

    INIT.get(this)();
  }

  markBookAsRead(bookId, isBookRead){
    return SERVICE.get(this).markBookRead(bookId, isBookRead)
      .then(() => {
        INIT.get(this)();
        this.readSuccess = true;
        this.readSuccessMessage = isBookRead ? "Book marked as read." : "Book marked as unread.";
        TIMEOUT.get(this)(() => {
          this.readSuccess = false;
        }, 2500);
      });
  }

  addToArchive(bookId){
    return SERVICE.get(this).addToArchive(bookId)
      .then(() => {
        INIT.get(this)();
        this.archiveSuccess = true;
        TIMEOUT.get(this)(() => {
          this.archiveSuccess = false;
        }, 2500);
      });
  }
}

HomeController.$inject = ['$timeout', 'bookShelfSvc'];

export default HomeController;