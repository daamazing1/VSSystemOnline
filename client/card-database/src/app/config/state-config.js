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
