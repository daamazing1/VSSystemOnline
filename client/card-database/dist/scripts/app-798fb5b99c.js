(function() {
  'use strict';
  angular
    .module('card', [
      'ui.router',
      'ui.bootstrap',
      'ngAnimate',
      'am.multiselect',
      'ui.grid',
      'ui.grid.autoResize'
    ]);
})(window.angular);

(function(angular) {
  'use strict';
  angular
    .module('card')
    .factory('cardService', ['$q', '$http', CardService]);
  function CardService($q, $http) {
    var apiBase = 'http://localhost:8080/';
    var _results = [];

    return {
      query: function(criteria) {
        var deferred = $q.defer();
        $http
          .post(apiBase + 'api/cards/query', criteria)
          .success(function(cards) {
            _results = cards;
            deferred.resolve(cards)
          })
          .error(function(msg, data) {
            _results = [];
            deferred.reject(msg);
          });
        return deferred.promise;
      },
      results: function(){
        return _results;
      },
      list: function() {
        var deferred = $q.defer();
        $http
          .get('/api/cards/')
          .success(function(cards) {
            deferred.resolve(cards);
          })
          .error(function(msg, data){
            deferred.reject(msg);
          });
        return deferred.promise;
      },
      teams: function(){
        var deferred = $q.defer();
        $http
          .get(apiBase + 'api/lookup/teams')
          .success(function(teams){
            deferred.resolve(teams);
          })
          .error(function(msg, data){
            deferred.reject(msg);
          });
        return deferred.promise;
      },
      cardTypes: function(){
        var deferred = $q.defer();
        $http
          .get(apiBase + 'api/lookup/cardtypes')
          .success(function(cardtypes){
            deferred.resolve(cardtypes);
          })
          .error(function(msg, data){
            deferred.reject(msg);
          });
        return deferred.promise;
      },
      powers: function(){
        var deferred = $q.defer();
        $http
          .get(apiBase + 'api/lookup/powers')
          .success(function(powers){
            deferred.resolve(powers);
          })
          .error(function(msg, data){
            deferred.reject(msg);
          });
        return deferred.promise;
      }
    }
  }
})(window.angular);

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

(function(angular) {
  'use strict';
  angular
    .module('card')
    .config(['$stateProvider', '$urlRouterProvider', StateConfig]);
  function StateConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('index', {
        url: '',
        views: {
          'card-filter': {
            template: '<card-filters></card-filters>'
          },
          'card-results': {
            template: '<card-results></card-results>'
          }
        }
      });
  }
})(window.angular);

angular.module("card").run(["$templateCache", function($templateCache) {$templateCache.put("components/card-filters/card-filters.html","<form><div class=\"form-group\"><label for=\"cardName\">Card Name</label> <input type=\"text\" class=\"form-control\" id=\"cardName\"></div><div class=\"form-group\"><label for=\"cardType\">Card Type</label><am-multiselect class=\"input-lg\" multiple=\"true\" ms-selected=\"There are {{vm.query.types.length}} selected\" ng-model=\"vm.query.type\" ms-header=\"Select card types\" options=\"type for type in vm.cardTypes\" template-url=\"multiselect.tmpl.html\" change=\"selected()\"></am-multiselect></div><div class=\"form-group\"><label for=\"team\">Team</label><am-multiselect class=\"input-lg\" multiple=\"true\" ms-selected=\"There are {{vm.query.team.length}} selected\" ng-model=\"vm.query.team\" ms-header=\"Select teams\" options=\"team for team in vm.teams\" template-url=\"multiselect.tmpl.html\" change=\"selected()\"></am-multiselect></div><div class=\"form-group\"><label for=\"power\">Power</label><am-multiselect class=\"input-lg\" multiple=\"true\" ms-selected=\"There are {{vm.query.powers.length}} selected\" ng-model=\"vm.query.powers\" ms-header=\"Select powers\" options=\"power for power in vm.powers\" template-url=\"multiselect.tmpl.html\" change=\"selected()\"></am-multiselect></div><div class=\"form-group\"><label for=\"cardText\">Card Text</label> <input type=\"text\" class=\"form-control\" id=\"cardText\"></div><div class=\"form-group\"><label for=\"cardCost\">Card Cost</label> <input type=\'text\"\' class=\"form-control\" id=\"cardCost\"></div><div class=\"form-group\"><label for=\"atk\">Attack</label> <input type=\"text\" class=\"form-control\" id=\"atk\" ng-model=\"vm.query.atk\"></div><div class=\"form-group\"><label for=\"def\">Defense</label> <input type=\"text\" class=\"form-control\" id=\"def\" ng-model=\"vm.query.def\"></div><button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.performQuery()\">Search</button> <button type=\"reset\" class=\"btn btn-default\">Reset</button></form>");
$templateCache.put("components/card-results/card-results.html","<div id=\"cardResults\" ui-grid=\"{ data: vm.cards }\" class=\"card-results-grid\"></div>");}]);