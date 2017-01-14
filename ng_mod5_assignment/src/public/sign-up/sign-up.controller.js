(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'SignUpService'];
function SignUpController(MenuService, SignUpService) {
  var $ctrl = this;

  $ctrl.submit = function () {
    if($ctrl.user.favorite){
      $ctrl.response = MenuService.getMenuItem($ctrl.user.favorite);
      $ctrl.response.then(function (data) {
        if(data === "error"){
          $ctrl.user.favorite = "";
          $ctrl.error = true;
        }else{
          $ctrl.completed = true;
          $ctrl.error = false;
          SignUpService.user = $ctrl.user;
        }
      })
    }
  };
}

})();
