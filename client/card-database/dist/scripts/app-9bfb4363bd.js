(function() {
  'use strict';
  angular
    .module('card', [
      'ui.router',
      'ui.bootstrap',
      'ngAnimate',
      'am.multiselect',
      'ui.grid',
      'ui.grid.autoResize',
      'ui.grid.expandable'
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

    vm.gridOptions = {
      enableExpandable: true,
      expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" style="height:150px;"></div>',
      expandableRowHeight: 150,
      enableSorting: true,
      columnDefs: [
        { field: 'cardNumber' },
        { field: 'name' },
        { field: 'type' },
        { field: 'cost' },
        { field: 'atk' },
        { field: 'def' },
        { field: 'team' },
        { field: 'powers', cellTemplate: '<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\"><ul class="powerlist"><li ng-repeat="power in COL_FIELD" ng-bind="power"></li></div>' },
        { field: 'health' }
      ]
    }

    $scope.$watch(function(){
      return cardService.results();
    },
    function(){
      var data = cardService.results();
      for(var i = 0, j = data.length; i < j; i++){
        data[i].subGridOptions = {
          columnDefs: [ { field: 'rules' }],
          data: [ {rules: data[i].rules} ]
        }
      }
      vm.gridOptions.data = data;
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

angular.module("card").run(["$templateCache", function($templateCache) {$templateCache.put("components/card-filters/card-filters.html","<form name=\"filters\" novalidate=\"\" ng-submit=\"vm.performQuery()\"><div class=\"form-group\"><label for=\"cardName\">Card Name</label> <input type=\"text\" class=\"form-control\" id=\"cardName\" ng-model=\"vm.query.name\"></div><div class=\"form-group\"><label for=\"cardType\">Card Type</label><am-multiselect class=\"input-lg\" multiple=\"true\" ms-selected=\"There are {{vm.query.types.length}} selected\" ng-model=\"vm.query.type\" ms-header=\"Select card types\" options=\"type for type in vm.cardTypes\" template-url=\"multiselect.tmpl.html\" change=\"selected()\"></am-multiselect></div><div class=\"form-group\"><label for=\"team\">Team</label><am-multiselect class=\"input-lg\" multiple=\"true\" ms-selected=\"There are {{vm.query.team.length}} selected\" ng-model=\"vm.query.team\" ms-header=\"Select teams\" options=\"team for team in vm.teams\" template-url=\"multiselect.tmpl.html\" change=\"selected()\"></am-multiselect></div><div class=\"form-group\"><label for=\"power\">Power</label><am-multiselect class=\"input-lg\" multiple=\"true\" ms-selected=\"There are {{vm.query.powers.length}} selected\" ng-model=\"vm.query.powers\" ms-header=\"Select powers\" options=\"power for power in vm.powers\" template-url=\"multiselect.tmpl.html\" change=\"selected()\"></am-multiselect></div><div class=\"form-group\"><label for=\"cardText\">Card Text</label> <input type=\"text\" class=\"form-control\" id=\"cardText\" ng-model=\"vm.query.rules\"></div><div class=\"form-group\"><label for=\"cardCost\">Card Cost</label><div class=\"row\"><div class=\"col-xs-6\"><select class=\"form-control\" ng-model=\"vm.costOp\"><option value=\"$eq\">&#61;</option><option value=\"$gt\">&gt;</option><option value=\"$gte\">&gt;&#61;</option><option value=\"$lt\">&lt;</option><option value=\"$lte\">&lt;&#61;</option></select></div><div class=\"col-xs-6\"><input type=\'text\"\' class=\"form-control\" id=\"cardCost\" ng-model=\"vm.cost\"></div></div></div><div class=\"form-group\"><label for=\"atk\">Attack</label><div class=\"row\"><div class=\"col-xs-6\"><select class=\"form-control\" ng-model=\"vm.atkOp\"><option value=\"$eq\">&#61;</option><option value=\"$gt\">&gt;</option><option value=\"$gte\">&gt;&#61;</option><option value=\"$lt\">&lt;</option><option value=\"$lte\">&lt;&#61;</option></select></div><div class=\"col-xs-6\"><input type=\"text\" class=\"form-control\" id=\"atk\" ng-model=\"vm.atk\"></div></div></div><div class=\"form-group\"><label for=\"def\">Defense</label><div class=\"row\"><div class=\"col-xs-6\"><select class=\"form-control\" ng-model=\"vm.defOp\"><option value=\"$eq\">&#61;</option><option value=\"$gt\">&gt;</option><option value=\"$gte\">&gt;&#61;</option><option value=\"$lt\">&lt;</option><option value=\"$lte\">&lt;&#61;</option></select></div><div class=\"col-xs-6\"><input type=\"text\" class=\"form-control\" id=\"def\" ng-model=\"vm.def\"></div></div></div><button type=\"submit\" class=\"btn btn-primary\">Search</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.performReset()\">Reset</button></form>");
$templateCache.put("components/card-results/card-results.html","<div id=\"cardResults\" ui-grid=\"vm.gridOptions\" class=\"card-results-grid\" ui-grid-expandable=\"\"></div>");}]);