(function() {
  angular.module('dashboard').controller('ResetCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.hidepasswordA = true;
    vm.hidepasswordB = true;
    vm.showA = true;
    vm.hideA = false;
    vm.showB = true;
    vm.hideB = false;
    vm.resetSuccess = false;
    vm.resetDanger = false;

    vm.toggle = function(param){
      if(param==='showA'){
        vm.hidepasswordA = false;
        vm.showA = false;
        vm.hideA = true;
      }else{
        if(param==='hideA'){
          vm.hidepasswordA = true;
          vm.showA = true;
          vm.hideA = false;
        }else{
          if(param==='showB'){
            vm.hidepasswordB = false;
            vm.showB = false;
            vm.hideB = true;
          }else{
            vm.hidepasswordB = true;
            vm.showB = true;
            vm.hideB = false;
          }
        }
      }
    };

    vm.submit = function() {
      if(!$scope.ResetForm.$invalid){
        vm.resetDanger = true;
      }else{
        vm.resetDanger = true;
      }
    };

    vm.close = function(code) {
      if(code=0)
        vm.resetSuccess = false;
      else
        vm.resetDanger = false;
    };

  }]);
}());
