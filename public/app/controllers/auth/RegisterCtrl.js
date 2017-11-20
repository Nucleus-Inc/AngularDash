(function() {
  angular.module('dashboard').controller('RegisterCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.hidepasswordA = true;
    vm.hidepasswordB = true;
    vm.showA = true;
    vm.hideA = false;
    vm.showB = true;
    vm.hideB = false;
    vm.create = true;
    vm.sendSuccess = false;
    vm.sendDanger = false;

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
      if(!$scope.RegisterForm.$invalid) {
        vm.create = false;
      }
    };

    vm.send = function() {
      vm.sendDanger = true;
    };

    vm.close = function(code) {
      if(code==0)
        vm.sendSuccess = false;
      else
        vm.sendDanger = false;
    };

  }]);
}());
