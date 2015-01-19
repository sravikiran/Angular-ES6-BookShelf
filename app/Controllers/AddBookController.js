const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();

class AddBookController{
    constructor($timeout, bookShelfSvc){
        TIMEOUT.set(this, $timeout);
        SERVICE.set(this, bookShelfSvc);
    }

    addBook(){
        if(this.addBookForm.$valid && this.book !== {}){
            SERVICE.get(this).addBook(this.book).then(message => {
                this.addSuccess = true;
                TIMEOUT.get(this)(() => {
                    this.addSuccess = false;
                }, 2500);
                this.resetBook();
            }, error => {
                this.addFailed = true;
                TIMEOUT.get(this)(() => {
                    this.addFailed = false;
               }, 2500);
            });
        }
    }

    resetBook(){
        this.addBookForm.$setPristine();
        this.addBookForm.$setUntouched();
        this.book = {};
    }
}

AddBookController.$inject = ['$timeout', 'bookShelfSvc'];

export default AddBookController;