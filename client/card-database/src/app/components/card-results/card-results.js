(function(angular) {
  'use strict';
  angular
    .module('card')
    .component('cardResults', {
      templateUrl: 'components/card-results/card-results.html',
      controllerAs: 'vm',
      controller: ['$scope', 'cardService', CardResults]
    });
  function CardResults($scope, cardService){
    var vm = this;
    vm.showGrid = false;

    $scope.$watch(function(){
      return cardService.results();
    },
    function(){
      vm.data = cardService.results();
      vm.showGrid = (vm.data || []).length > 0;
    });
  }
})(window.angular);
