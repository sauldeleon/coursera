(function () {
'use strict';

angular.module('data')
// shows all available categories in the menu to the user
.component('categories', {
  templateUrl: 'src/data/templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
