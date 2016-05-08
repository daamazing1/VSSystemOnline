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
