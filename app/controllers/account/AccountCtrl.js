(function() {
  angular.module('angularDash').controller('AccountCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.account = [];
    vm.account.token = 'asadASHyshd371389';

    vm.tab = 1;

    vm.setTab = function(newTab) {
      vm.tab = newTab;
    };

    vm.isSet = function(tabNum) {
      return vm.tab === tabNum;
    };

  }]);
}());
