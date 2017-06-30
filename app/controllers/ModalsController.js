(function() {
    angular.module('Dashboard').controller('ModalsController', ['$scope', 'ModalService', function($scope, ModalService) {

        var vm = this;
        vm.alertTitle = 'I wanna know the answer';
        vm.alertQuestion = 'Do you like beer ?'

        vm.showAlertModal = function() {

            // Just provide a template url, a controller and call 'showModal'.
            ModalService.showModal({
                templateUrl: "./modals/alert.html",
                controller: "AlertModalController as alertModalCtrl",
                inputs: {
                    title: vm.alertTitle,
                    question: vm.alertQuestion
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function(result) {
                    vm.alertResult = result ? "You said Yes" : "You said No";
                });
            });
        };

        vm.showFormModal = function() {

            // Just provide a template url, a controller and call 'showModal'.
            ModalService.showModal({
                templateUrl: "./modals/form-modal.html",
                controller: "FormModalController as formModalCtrl"
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function(result) {
                    vm.formResult = result;
                    console.log('HERE'+ result.email);
                });
            });
        };
    }]);
}());
