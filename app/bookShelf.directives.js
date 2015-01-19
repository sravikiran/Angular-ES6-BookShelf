var moduleName='bookShelf.directives';

const Q = new WeakMap();
const SERVICE = new WeakMap();

class UniqueBookTitle
{
  constructor($q, bookShelfSvc){
    this.require='ngModel';
    this.restrict='A';

    Q.set(this, $q);
    SERVICE.set(this, bookShelfSvc);
  }

  link(scope, elem, attrs, ngModelController){
    ngModelController.$asyncValidators.uniqueBookTitle = function(value){

      return Q.get(UniqueBookTitle.instance)((resolve, reject) => {
        SERVICE.get(UniqueBookTitle.instance).checkIfBookExists(value).then( result => {
          if(result){
            reject();
          }
          else{
            resolve();
          }
        });
      });
    };
  }

  static directiveFactory($q, bookShelfSvc){
    UniqueBookTitle.instance =new UniqueBookTitle($q, bookShelfSvc);
    return UniqueBookTitle.instance;
  }
}

UniqueBookTitle.directiveFactory.$inject = ['$q', 'bookShelfSvc'];

angular.module(moduleName, [])
  .directive('uniqueBookTitle', UniqueBookTitle.directiveFactory);

export default moduleName;
