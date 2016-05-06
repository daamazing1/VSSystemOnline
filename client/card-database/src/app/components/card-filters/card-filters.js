(function(angular) {
  'use strict';
  angular
    .module('app')
    .component('card-filters', {
      templateUrl: 'components/card-filters/card-filters.html',
      controllerAs: 'vm',
      controller: ['cardService', CardFilters]
    });
    function CardFilters(cardService) {
        var vm = this;
        vm.filters = {};
        vm.query = function(){
          cardService.query(vm.filters);
        };
    }
})(window.angular);
