(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {

  $scope.textInput = "";
  $scope.placeholderMessage = "List comma separated dishes you usually have for lunch";
  $scope.messageClass = "";
  $scope.inputStatus = "";

  $scope.checkItems = function () {
    var text = $scope.textInput;
    if(text == ""){
      $scope.messageClass="messageError";
      $scope.outputMessage = "Please enter data first";
      $scope.inputStatus = "has-error";
    }else{
      var parts = text.split(",");
      parts = removeBlank(parts);
      $scope.inputStatus = "has-success";
      if(parts.length <= 3){
        $scope.messageClass="messageSuccess";
        $scope.outputMessage = "Enjoy!";
      }else{
        $scope.messageClass="messageError";
        $scope.outputMessage = "Too much!";
      }
    }

  };

  //Removes blank spaces from an array
  function removeBlank(array) {
    array = array.filter(function(str) {
      return /\S/.test(str);
    });
    return array;
  };

  $scope.upper = function () {
    var upCase = $filter('uppercase');
    $scope.name = upCase($scope.name);
  };
}

})();
