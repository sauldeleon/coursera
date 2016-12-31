(function () {
'use strict';

angular.module('categories')
.component('categories', {
  templateUrl: 'src/data/templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
