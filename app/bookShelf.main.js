import { default as controllersModuleName } from './Controllers/bookShelf.controllers';
import { default as servicesModuleName } from './bookShelf.services';
import { default as directivesModuleName } from './bookShelf.directives';

var moduleName = 'bookShelf';

function config($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'templates/home.html',
      controller:'bookShelf.homeController',
      controllerAs:'vm'
    })
    .when('/addBook',{
      templateUrl:'templates/addBook.html',
      controller:'bookShelf.addBookController',
      controllerAs:'vm'
    })
    .when('/archive', {
      templateUrl:'templates/archive.html',
      controller:'bookShelf.archiveController',
      controllerAs:'vm'
    })
    .otherwise({redirectTo:'/'});
}

config.$inject = ['$routeProvider'];

var app = angular.module(moduleName, ['ngRoute','ngMessages', servicesModuleName, controllersModuleName, directivesModuleName])
  .config(config);

export default moduleName;