(function() {
  angular.module('dashboard').controller('PlansCtrl', ['$scope','filterFilter','Plans','Account','ModalService','notify','$localStorage','Socket',
    function($scope, filterFilter, Plans, Account, ModalService, notify, $localStorage,Socket) {

      var vm = this;

      vm.filter = "Filtros";
      vm.template = '';
      vm.position = 'center';
      vm.duration = '3000';

      vm.config = {
        itemsPerPage: 10
      };

      if($localStorage.planList == null) {
        $localStorage.planList = [];
        Plans.getPlans().then(function(res){
          for(var i=0;i<res.data.length;i++)
            $localStorage.planList.push(res.data[i]);
        });
      }

      vm.filteredList = $localStorage.planList;

      Socket.on('showCreatePlan',function(msg){
        var flag = true;
        $localStorage.planList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          $localStorage.planList.push(msg);
      });

      Socket.on('showUpdatePlan',function(msg){
        $localStorage.planList.filter(function(item){
          if(item._id === msg._id)
            item.title = msg.title;
        });
          vm.filteredList = $localStorage.planList;
      });

      vm.updateList = function() {
        vm.filter = "Filtros";
        vm.filteredList = filterFilter($localStorage.planList,vm.key);
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
        vm.filteredList = filterFilter($localStorage.planList,key);
      };

      vm.create = function(){
        vm.alertTitle = 'Aqui você cria seus planos';
        vm.label = 'Criar';
        vm.input = '';
        ModalService.showModal({
          templateUrl: 'app/views/modals/category-form-modal.html',
          controller: 'CategoryFormModalCtrl as categoryFormModalCtrl',
          inputs: {
            title: vm.alertTitle,
            input: vm.input,
            label: vm.label
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            vm.msg = result ? 'Plano criada com sucesso' : 'Sua novo plano não foi criado';
            vm.classes = result ? 'alert-success' : 'alert-danger';
            if(result){
              Plans.createPlan(result.name).then(function(res){
                Socket.emit('createPlan',res.data);
                notify({
                  message: vm.msg,
                  classes: vm.classes,
                  tamplateUrl: vm.template,
                  position: vm.position,
                  duration: vm.duration
                });
              }).catch(function(err){
                vm.msg = 'Erro ao tentar criar o novo Plano';
                vm.classes = 'alert-danger';
                notify({
                  message: vm.msg,
                  classes: vm.classes,
                  tamplateUrl: vm.template,
                  position: vm.position,
                  duration: vm.duration
                });
              });
            }else{
              notify({
                message: vm.msg,
                classes: vm.classes,
                tamplateUrl: vm.template,
                position: vm.position,
                duration: vm.duration
              });
            }
          });
        });
      };

      vm.delete = function(id){
        vm.alertTitle = 'Deletar plano';
        vm.alertQuestion = 'Tem certeza que deseja deletar esta plano?';
        $localStorage.planList.filter(function(item){
          if(item._id === id){
            vm.user = item.title;
            ModalService.showModal({
              templateUrl: 'app/views/modals/alert.html',
              controller: 'AlertModalCtrl as alertModalCtrl',
              inputs: {
                title: vm.alertTitle,
                question: vm.alertQuestion,
                user: vm.user
              }
            }).then(function(modal) {
              modal.element.modal();
              modal.close.then(function(result) {
                if(result) {
                  Plans.deletePlan(id).then(function(res){
                    console.log(res);
                  }).catch(function(err){
                    console.log(err);
                  });
                }else{

                }
              });
            });
          }
        });
      };

      vm.edit = function(id){
        vm.alertTitle = 'Atualize seu plano abaixo';
        vm.label = 'Atualizar';
        $localStorage.planList.filter(function(item){
          if(item._id === id){
            vm.input = item.title;
            ModalService.showModal({
              templateUrl: 'app/views/modals/category-form-modal.html',
              controller: 'CategoryFormModalCtrl as categoryFormModalCtrl',
              inputs: {
                title: vm.alertTitle,
                input: vm.input,
                label: vm.label
              }
            }).then(function(modal) {
              modal.element.modal();
              modal.close.then(function(result) {
                vm.msg = result ? 'Plano atualizado com sucesso' : 'Esta plano não foi atualizado';
                vm.classes = result ? 'alert-success' : 'alert-danger';
                if(result) {
                  Plans.updatePlan(id,result.name).then(function(res){
                    Socket.emit('updatePlan',res.data);
                    notify({
                      message: vm.msg,
                      classes: vm.classes,
                      tamplateUrl: vm.template,
                      position: vm.position,
                      duration: vm.duration
                    });
                  }).catch(function(err){
                    vm.msg = 'Erro ao tentar atualizar o plano';
                    vm.classes = 'alert-danger';
                    notify({
                      message: vm.msg,
                      classes: vm.classes,
                      tamplateUrl: vm.template,
                      position: vm.position,
                      duration: vm.duration
                    });
                  });
                }else{
                  notify({
                    message: vm.msg,
                    classes: vm.classes,
                    tamplateUrl: vm.template,
                    position: vm.position,
                    duration: vm.duration
                  });
                }
              });
            });
          }
        });
      };

  }]);
}());
