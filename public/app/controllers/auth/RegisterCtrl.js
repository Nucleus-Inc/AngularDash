(function() {
  angular.module('dashboard').controller('RegisterCtrl', ['$scope','Account', function($scope,Account) {

    var vm = this;
    var _id = -1;

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
        Account.signup(vm.user.name,vm.user.email,vm.user.password).then(function(res){
          if(res.data)
            _id = res.data._id;
          vm.create = false;
        });
      }
    };

    vm.send = function() {
      if(_id!=-1){
        Account.setActivationCode(_id).then(function(res){
          if(res.status==200){
            vm.sendSuccess = true;
            vm.sendDanger = false;
          }else{
            vm.sendSuccess = false;
            vm.sendDanger = true;
          }
        });
      }
    };

    vm.close = function(code) {
      if(code==0)
        vm.sendSuccess = false;
      else
        vm.sendDanger = false;
    };

  }]);
}());
