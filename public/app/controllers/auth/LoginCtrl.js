(function() {
  angular.module('dashboard').controller('LoginCtrl', ['$scope', function($scope) {

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
        vm.errLogin = true;
      }else{
        vm.errLogin = true;
      }
    };

  }]);
}());
