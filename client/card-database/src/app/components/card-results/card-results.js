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
