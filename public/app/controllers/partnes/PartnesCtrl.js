(function() {
  angular.module('dashboard').controller('PartnesCtrl', ['$scope','filterFilter','Partnes','Account','ModalService','notify','$localStorage','Socket',
    function($scope, filterFilter, Partnes, Account, ModalService, notify, $localStorage, Socket) {

      var vm = this;

      vm.filter = "Filtros";

      vm.config = {
        itemsPerPage: 10
      };

      if($localStorage.partnesList == null) {
        $localStorage.partnesList = [];
        Partnes.getPartnes().then(function(res){
          for(var i=0;i<res.data.length;i++)
            $localStorage.partnesList.push(res.data[i]);
        });
      }

      Socket.on('admin add',function(msg){
        $localStorage.partnesList.push(msg);
      });

      Socket.on('admin active',function(msg){
        $localStorage.partnesList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
        vm.filteredList = $localStorage.partnesList;
      });

      vm.filteredList = $localStorage.partnesList;

      vm.updateList = function() {
        vm.filter = "Filtros";
        vm.filteredList = filterFilter($localStorage.partnesList,vm.key);
      };

      vm.update = function(){
        vm.key = '';
        var key = '';
        if(vm.filter == 1)
          key = true;
        else {
          if(vm.filter == 2)
            key = false;
          else
            key = '';
        }
        vm.filteredList = filterFilter($localStorage.partnesList,key);
      };

      vm.active = function(_id, email, isActive) {

        vm.alertTitle = isActive ? 'Desativar usuário' : 'Ativar usuário';
        vm.alertQuestion = isActive ? 'Você desja realmente desativar este usuário?' : 'Você deseja realmente ativar este usuário?';

        vm.template = '';
        vm.position = 'center';
        vm.duration = '3000';

        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
          inputs: {
            title: vm.alertTitle,
            question: vm.alertQuestion,
            user: email
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result){
              Account.active(_id).then(function(res){
                Socket.emit('admin active',_id);
                vm.msg = isActive ? 'Usuário desativado com sucesso' : 'Usuário ativado com sucesso';
                vm.classes = 'alert-success';
                notify({
                    message: vm.msg,
                    classes: vm.classes,
                    templateUrl: vm.template,
                    position: vm.position,
                    duration: vm.duration
                });
              }).catch(function(err){
                  vm.msg = isActive ? 'Erro ao tentar desativar o usuário' : 'Erro ao tentar ativar o usuário';
                  vm.classes = 'alert-danger';
                  notify({
                      message: vm.msg,
                      classes: vm.classes,
                      templateUrl: vm.template,
                      position: vm.position,
                      duration: vm.duration
                  });
              });
            }
          });
        });
      };

  }]);
}());
