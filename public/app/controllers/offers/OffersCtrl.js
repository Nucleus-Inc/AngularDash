(function() {
  angular.module('dashboard').controller('OffersCtrl', ['$scope','$filter','Offers','Account','ModalService','notify','$localStorage','Socket',
    function($scope, $filter, Offers, Account, ModalService, notify, $localStorage,Socket) {

      var vm = this;

      vm.filter = "Filtros";
      vm.template = '';
      vm.position = 'center';
      vm.duration = '3000';

      vm.config = {
        itemsPerPage: 10
      };

      var buffer = [];
      vm.filteredList = [];
      Offers.getOffers().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
      });

      Socket.on('showCreateOffers',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
      });

      Socket.on('showUpdateOffers',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id){
            item.title = msg.title;
          }
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
        vm.alertTitle = 'Aqui você cria uma oferta';
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
            vm.msg = result ? 'Oferta criada com sucesso' : 'Sua nova oferta não foi criada';
            vm.classes = result ? 'alert-success' : 'alert-danger';
            if(result){
              /*Offers.createOffer(result.name).then(function(res){
                Socket.emit('createOffer',res.data);
                notify({
                  message: vm.msg,
                  classes: vm.classes,
                  tamplateUrl: vm.template,
                  position: vm.position,
                  duration: vm.duration
                });
              }).catch(function(err){
                vm.msg = 'Erro ao tentar criar a nova categoria';
                vm.classes = 'alert-danger';
                notify({
                  message: vm.msg,
                  classes: vm.classes,
                  tamplateUrl: vm.template,
                  position: vm.position,
                  duration: vm.duration
                });
              });*/
            }else{
              /*notify({
                message: vm.msg,
                classes: vm.classes,
                tamplateUrl: vm.template,
                position: vm.position,
                duration: vm.duration
              });*/
            }
          });
        });
      };

      vm.delete = function(id){
        vm.alertTitle = 'Deletar oferta';
        vm.alertQuestion = 'Tem certeza que deseja deletar esta oferta?';
        vm.filteredList.filter(function(item){
          if(item._id === id){
            //vm.user = item.title;
            vm.user = '';
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
                  Offers.deleteOffer(id).then(function(res){
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
        vm.alertTitle = 'Atualize sua categoria abaixo';
        vm.label = 'Atualizar';
        vm.filteredList.filter(function(item){
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
                vm.msg = result ? 'Categoria atualizada com sucesso' : 'Esta categoria não foi atualizada';
                vm.classes = result ? 'alert-success' : 'alert-danger';
                if(result) {
                  /*Offers.updateOffer(id,result.name).then(function(res){
                    Socket.emit('updateOffer',res.data);
                    notify({
                      message: vm.msg,
                      classes: vm.classes,
                      tamplateUrl: vm.template,
                      position: vm.position,
                      duration: vm.duration
                    });
                  }).catch(function(err){
                    vm.msg = 'Erro ao tentar atualizar a categoria';
                    vm.classes = 'alert-danger';
                    notify({
                      message: vm.msg,
                      classes: vm.classes,
                      tamplateUrl: vm.template,
                      position: vm.position,
                      duration: vm.duration
                    });
                  });*/
                }else{
                  /*notify({
                    message: vm.msg,
                    classes: vm.classes,
                    tamplateUrl: vm.template,
                    position: vm.position,
                    duration: vm.duration
                  });*/
                }
              });
            });
          }
        });
      };

  }]);
}());
