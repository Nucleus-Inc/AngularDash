(function() {
    angular.module('Dashboard').controller('FormModalController', ['$scope', 'ModalService', 'close',
        function($scope, ModalService, close) {

            var vm = this;

            vm.inputs = [];

            vm.title = 'My Title';
            vm.question= 'My Question';

            vm.close = function(result) {
              //  console.log('here');
                //console.log(vm.inputs);
                close(vm.inputs, 500); // close, but give 500ms for bootstrap to animate
                angular.element('.modal').modal('hide');
            };
        }
    ]);
}());
