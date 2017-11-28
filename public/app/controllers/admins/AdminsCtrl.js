(function() {
  angular.module('dashboard').controller('AdminsCtrl', ['$scope','$filter','Admins','Account','ModalService','notify','$localStorage','Socket','Config',
    function($scope, $filter, Admins, Account, ModalService, notify, $localStorage, Socket, Config) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          name: 'empty',
          label: 'Filtros'
        },
        {
          _id: 1,
          name: 'actives',
          label: 'Consultores Ativos'
        },
        {
          _id: 2,
          name: 'noactives',
          label: 'Consultores Pendentes'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;

      vm.config = {
        itemsPerPage: 10
      };

      var buffer = [];
      vm.filteredList = [];
      Admins.getAdmins().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
      });

      Socket.on('admin add',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
      });

      Socket.on('admin active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      var search = function(item) {
        var name = item.name.toLowerCase();
        var email = item.email.toLowerCase();
        var key = vm.key;
        if(key != undefined){
          key = key.toLowerCase();
        }
        if( email.search(key) > -1 || name.search(key) > -1 )
          return item;
      };

      vm.update = function() {
        vm.filteredList = buffer.filter(function(item){
          if(vm.selectedPredicate === vm.predicates[1].label){
            if(item.isActive)
              return search(item);
          }else{
            if(vm.selectedPredicate === vm.predicates[2].label){
              if(!item.isActive)
                return search(item);
            }else
              return search(item);
          }
        });
      };

      vm.clean = function() {
        vm.key = '';
        vm.selectedPredicate = vm.predicates[0].label;
        vm.filteredList = buffer;
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
