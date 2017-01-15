(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['SignUpService', 'menuItem', 'ApiPath'];
  function MyInfoController(SignUpService, menuItem, ApiPath) {
    var $ctrl = this;
    if(menuItem.name){
      $ctrl.menuItemExists = true;
      $ctrl.menuItem = menuItem;
    }else{
      $ctrl.menuItemExists = false;
    }

    $ctrl.user = SignUpService.user;
    $ctrl.basePath = ApiPath;

    if($ctrl.user.firstname){
      $ctrl.existData = true;
    }else{
      $ctrl.existData = false;
    }
  }

})();
