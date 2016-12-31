(function () {
'use strict';

angular.module('data')
.controller('ItemsCategoryController', ItemsCategoryController);

ItemsCategoryController.$inject = ['$stateParams', 'items'];
function ItemsCategoryController($stateParams, items) {
  var itemsCategory = this;
  itemsCategory.items = items.data.menu_items;
  itemsCategory.shortName = $stateParams.categoryShortName;
}

})();
