(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    restrict:'AE',
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;

  found.emptyList = function () {
    return found.items && found.items.length === 0;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDownController = this;

  narrowItDownController.searchTerm = "";
  narrowItDownController.items = [];

  narrowItDownController.getItems = function () {
    narrowItDownController.found = MenuSearchService.getMatchedMenuItems(narrowItDownController.searchTerm);
    narrowItDownController.found.then(function (data) {
      narrowItDownController.items = data;
    });
  };

  narrowItDownController.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(narrowItDownController.items, itemIndex);
  };
};

MenuSearchService.$inject=['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var  foundItems = [];
      result.data.menu_items.forEach(function(entry) {
        if(entry.description.includes(searchTerm)){
          foundItems.push(entry);
        }
      });
      return foundItems;
    }).catch(function (error) {
      console.log("Something went terribly wrong. Error: " + error);
    });
  };

  service.removeItem = function (items, index) {
    return items.splice(index, 1);
  };
};

})();
