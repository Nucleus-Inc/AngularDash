(function() {
  angular.module('dashboard').controller('SettingsCtrl', ['$scope','Account','notify','$localStorage','Config','Auth','$location',
    function($scope, Account, notify, $localStorage, Config, Auth, $location) {

      var vm = this;
      vm.tab = 1;
      vm.template = '';
      vm.position = 'center';
      vm.duration = '3000';

      var list = function(){
        Account.getAccount(Config._id).then(function(res){
          vm.inputs = {
            'name': res.data.name,
            'email': res.data.email,
            'bio': ''
          }
        });
      };

      if(Config._id === ''){
        Auth.isAuthenticated().then(function(res){
          Config._id = res.data._id;
          list();
        });
      }else
        list();

      vm.submit = function(){
        Account.updatePassword(Config._id,vm.account.currentPassword,vm.account.newPassword).then(function(res){
          vm.msg = 'Senha atualizada com sucesso';
          vm.classes = 'alert-success';
          notify({
              message: vm.msg,
              classes: vm.classes,
              templateUrl: vm.template,
              position: vm.position,
              duration: vm.duration
          });
          Auth.logout().then(function(res){
            $location.path('/login');
          });
        }).catch(function(err){
          vm.msg = 'Erro ao tentar atualizar a senha';
          vm.classes = 'alert-danger';
          notify({
              message: vm.msg,
              classes: vm.classes,
              templateUrl: vm.template,
              position: vm.position,
              duration: vm.duration
          });
        });
      };

      vm.setTab = function(newTab) {
        vm.tab = newTab;
      };

      vm.isSet = function(tabNum) {
        return vm.tab === tabNum;
      };

  }]);
}());
