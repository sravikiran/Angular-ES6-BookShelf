import HomeController from './HomeController';
import AddBookController from './AddBookController';
import ArchiveController from './ArchiveController';

var moduleName='bookShelf.controllers';

angular.module(moduleName, [])
    .controller('bookShelf.homeController', HomeController)
    .controller('bookShelf.addBookController', AddBookController)
    .controller('bookShelf.archiveController', ArchiveController);

export default moduleName;