(function() {
  angular.module('dashboard').controller('NavbarCtrl', ['$scope','Auth','$location', function($scope,Auth,$location) {

      var vm = this;

      vm.logout = function(){
        Auth.logout().then(function(res){
          $location.path('/login');
        }).catch(function(err){});
      };

  }]);
}());
