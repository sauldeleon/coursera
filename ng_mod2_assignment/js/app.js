(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyAction = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };

  toBuy.checkEmptyList = function () {
    return toBuy.items.length == 0;
  }

};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

  alreadyBought.checkEmptyList = function () {
    return alreadyBought.items.length == 0;
  };
};

ShoppingListCheckOffService.$inject=[];
function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "watermelons", quantity: 2 },
    { name: "apples", quantity: 3 },
    { name: "BluRay of Star Wars", quantity: 7 },
    { name: "Pocket Swimming Pools", quantity: 3 }
  ];

  var alreadyBoughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  service.buyItem = function (index) {
    alreadyBoughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index, 1);
  };
};

})();
