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

    $scope.$watch(function(){
      return cardService.results();
    },
    function(){
      vm.cards = cardService.results();
    });
  }
})(window.angular);
