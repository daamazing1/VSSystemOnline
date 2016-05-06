(function(angular) {
  'use strict';
  angular
    .module('card')
    .factory('cardService', ['$q', '$http', CardService]);
  function CardService($q, $http) {
    return {
      query: function(criteria) {
        var deferred = $q.defer();
        $http
          .post('/api/cards/query', criteria)
          .success(function(cards) {
            deferred.resolve(cards)
          })
          .error(function(msg, data) {
            deferred.reject(msg);
          });
        return deferred.promise;
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
      }
    }
  }
})(window.angular);
