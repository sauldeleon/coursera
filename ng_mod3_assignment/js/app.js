(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

/*The list should be displayed using this directive which takes the found array of items specified on it as an attribute (think one-way binding with '<').
To implement the functionality of the "Don't want this one!" button, the directive should also provide an on-remove attribute that will use function reference binding to invoke the parent controller
removal an item from the found array based on an index into the found array. The index should be passed in from the directive to the controller.
(Note that we implemented almost identical type of behavior in the Lecture 30 Part 2, so as long as you understood that code, it should be very close to copy/paste).
In the NarrowItDownController, simply remove that item from the found array. You can do that using the Array's splice() method. For example, to remove an item with the index of 3 from the found array,
you would call found.splice(3, 1);.*/

function FoundItems() {
  var ddo = {
    templateUrl: 'listFound.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controllerAs: 'nid'
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nid = this;

  nid.searchTerm = "";
  nid.items = [];

  nid.getItems = function () {
    nid.found = MenuSearchService.getMatchedMenuItems(nid.searchTerm);
    nid.found.then(function (data) {
      nid.items = data;
    });
  }

  nid.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };

  return nid;
};

MenuSearchService.$inject=['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var foundItems = [];
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
};

})();
