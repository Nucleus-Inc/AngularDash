(function() {
  angular.module('Dashboard').controller('FormsController', ['$scope', function($scope) {

    var vm = this;

    vm.inputs = [];
    vm.alertMessage = {};

    vm.submit = function() {
      if ($scope.sampleForm.$valid) {
        vm.alertMessage.type = 'success';
        vm.alertMessage.message = 'Form is valid !';
      } else {
        vm.alertMessage.type = 'danger';
        vm.alertMessage.message = 'Form is invalid !';
      }
      vm.alertMessage.show = true;
    };

    vm.closeAlert = function() {
      vm.alertMessage.show = false;
    };

  }]);
}());
