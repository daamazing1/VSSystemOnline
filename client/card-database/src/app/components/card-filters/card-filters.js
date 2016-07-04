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
    // hit the api for the teams
    cardService
      .teams()
      .then(function(teams){
        vm.teams = teams;
      });
    // hit the api for the card types
    cardService
      .cardTypes()
      .then(function(cardTypes){
        vm.cardTypes = cardTypes;
      });

    //hit the api for a list of powers
    cardService
      .powers()
      .then(function(powers){
        vm.powers = powers;
      });

    // create a blank query object
    vm.query = {};

    // Gets fired with the submission of the filters
    vm.performQuery = function(){
      // first thing to check is for empty query parameters, well just delete
      // them.
      for(var property in vm.query){
        if (vm.query.hasOwnProperty(property)) {
          if(property === "" || property === null){
            delete vm.query[property];
          }
        }
      }

      // now lets handle the comparision operators for attack, defense and cost
      ['atk', 'def', 'cost'].forEach(function(prop){
        if(vm.hasOwnProperty(prop)){
          vm.query[prop] = {};
          vm.query[prop][vm[prop + 'Op']] = vm[prop];
        }
      });

      if(Object.keys(vm.query).length === 0){
        vm.noQuery = true;
        return;
      }

      // now we can query the api for the results
      cardService
        .query(vm.query);
    };

    // fired when user clicks on the reset form button
    vm.performReset = function(){
      vm.query = {};
      ['atk', 'def', 'cost'].forEach(function(prop){
        if(vm.hasOwnProperty(prop)){
          delete vm[prop];
        }
        if(vm.hasOwnProperty(prop + 'Op')){
          delete vm[prop + 'Op'];
        }
      });
    };
  }
})(window.angular);
