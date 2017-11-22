(function() {
  angular.module('dashboard').controller('ModalsCtrl', ['$scope','ModalService', function($scope, ModalService) {

    var vm = this;

    vm.alertTitle = 'I wanna know the answer';
    vm.alertQuestion = 'Do you like beer ?';

    vm.showAlertModal = function() {

      ModalService.showModal({
        templateUrl: 'app/views/modals/alert.html',
        controller: 'AlertModalCtrl as alertModalCtrl',
        inputs: {
          title: vm.alertTitle,
          question: vm.alertQuestion
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          vm.alertResult = result ? 'You said Yes' : 'You said No';
        });
      });
    };

    vm.showFormModal = function() {
      ModalService.showModal({
        templateUrl: 'app/views/modals/form-modal.html',
        controller: 'FormModalCtrl as formModalCtrl'
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          vm.formResult = result;
        });
      });
    };

  }]);
}());
