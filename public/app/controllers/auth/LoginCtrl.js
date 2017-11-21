(function() {
  angular.module('dashboard').controller('LoginCtrl', ['$scope','Auth','$location', function($scope,Auth,$location) {

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
          if(res.status == 200 && res.data && res.data.isActive)
            $location.path('/');
          else
            vm.errLogin = true;
        }).catch(function(err){
          vm.errLogin = true;
        });
      }else{
        vm.errLogin = true;
      }
    };

  }]);
}());
