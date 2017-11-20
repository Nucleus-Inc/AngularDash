(function() {
  angular.module('dashboard').controller('ForgotCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.send = false;

    vm.close = function() {
      vm.send = false;
    };

    vm.submit = function() {
      if (!$scope.ForgotForm.$invalid) {
        vm.send = true;
      }
    };

  }]);
}());
