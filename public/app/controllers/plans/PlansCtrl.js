(function() {
  angular.module('dashboard').controller('PlansCtrl', ['$scope','$filter','Plans','Account','ModalService','notify','$localStorage','Socket',
    function($scope, $filter, Plans, Account, ModalService, notify, $localStorage,Socket) {

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
      vm.template = '';
      vm.position = 'center';
      vm.duration = '3000';

      vm.config = {
        itemsPerPage: 10
      };

      var buffer = [];
      vm.filteredList = [];
      Plans.getPlans().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
      });

      Socket.on('showCreatePlan',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
      });

      Socket.on('showUpdatePlan',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            item.title = msg.title;
        });
      });

      var search = function(item) {
        var _id = item._id;
        var title = item.title.toLowerCase();
        var key = vm.key;
        if( key != undefined ){
          key = key.toLowerCase();
        }
        if( _id.search(key) > -1 || title.search(key) > -1 )
          return item;
      };

      vm.update = function() {
        vm.filteredList = buffer.filter(function(item){
          return search(item);
        });
      };

      vm.clean = function() {
        vm.key = '';
        vm.selectedPredicate = vm.predicates[0].label;
        vm.filteredList = buffer;
      };

      vm.create = function(){
        vm.alertTitle = 'Aqui você cria seus planos';
        vm.label = 'Criar';
        vm.input = '';
        ModalService.showModal({
          templateUrl: 'app/views/modals/plan-form-modal.html',
          controller: 'PlanFormModalCtrl as planFormModalCtrl',
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
        vm.filteredList.filter(function(item){
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
        vm.filteredList.filter(function(item){
          if(item._id === id){
            vm.input = item.title;
            ModalService.showModal({
              templateUrl: 'app/views/modals/plan-form-modal.html',
              controller: 'PlanFormModalCtrl as planFormModalCtrl',
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
