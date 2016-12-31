(function () {
'use strict';

angular.module('data')
// shows all of the menu items for a particular category
.component('items', {
  templateUrl: 'src/data/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
