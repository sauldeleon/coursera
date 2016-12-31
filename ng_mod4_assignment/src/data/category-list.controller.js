(function () {
'use strict';

angular.module('data')
.controller('CategoryListController', CategoryListController);


CategoryListController.$inject = ['MenuDataService', 'categories'];
function CategoryListController(MenuDataService, categories) {
  var categoryList = this;
  categoryList.categories = categories.data;
}

})();
