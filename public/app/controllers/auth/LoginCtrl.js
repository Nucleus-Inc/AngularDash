(function() {
  angular.module('dashboard').controller('LoginCtrl', ['$scope','Auth', function($scope,Auth) {

    var vm = this;

    vm.hidepassword = true;
    vm.show = true;
    vm.hide = false;
    vm.errLogin = false;

    vm.toggle = function(param){
      if(param==='show'){
        vm.hidepassword = false;
        vm.show = false;
        vm.hide = true;
      }else{
        vm.hidepassword = true;
        vm.show = true;
        vm.hide = false;
      }
    };

    vm.close = function(){
      vm.errLogin = false;
    };

    vm.submit = function() {
      if(!$scope.LoginForm.$invalid) {
        Auth.login(vm.user.email,vm.user.password).then(function(res){
          console.log(res);
        }).catch(function(err){
          console.log(err);
        });
        vm.errLogin = false;
      }else{
        vm.errLogin = true;
      }
    };

  }]);
}());
