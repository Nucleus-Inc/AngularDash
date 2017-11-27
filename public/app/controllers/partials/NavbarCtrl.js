(function() {
  angular.module('dashboard').controller('NavbarCtrl', ['$scope','Auth','$location','Config','Account', function($scope,Auth,$location,Config,Account) {

      var vm = this;

      Auth.isAuthenticated().then(function(res){
        Config._id = res.data._id;
        Account.getAccount(Config._id).then(function(res){
          vm.user = {
            'name': res.data.name,
            'email': res.data.email
          }
        });
      });

      vm.logout = function(){
        Auth.logout().then(function(res){
          $location.path('/login');
        }).catch(function(err){});
      };

  }]);
}());
