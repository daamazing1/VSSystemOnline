(function(angular) {
  'use strict';
  angular
    .module('card')
    .component('cardFilters', {
      templateUrl: 'components/card-filters/card-filters.html',
      controllerAs: 'vm',
      controller: ['cardService', CardFilters]
    });

  function CardFilters(cardService) {
    var vm = this;
    cardService
      .teams()
      .then(function(teams){
        vm.teams = teams;
      });
    cardService
      .cardTypes()
      .then(function(cardTypes){
        vm.cardTypes = cardTypes;
      });
    cardService
      .powers()
      .then(function(powers){
        vm.powers = powers;
      });
    vm.query = {};
    vm.performQuery = function(){
      cardService
        .query(vm.query);
    };
  }
})(window.angular);
