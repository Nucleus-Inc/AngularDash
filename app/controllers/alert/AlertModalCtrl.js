(function() {
  angular.module('angularDash').controller('AlertModalCtrl', ['$scope', 'title', 'question', 'ModalService', 'close',
    function($scope, title, question, ModalService, close) {
      var vm = this;
      vm.title = title;
      vm.question = question;

      vm.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
      };
    }
  ]);
}());
