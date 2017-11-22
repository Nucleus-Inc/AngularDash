(function() {
  angular.module('dashboard').controller('categoriesCtrl', ['$scope','filterFilter','Categories','Account','ModalService','notify','$localStorage','Socket',
    function($scope, filterFilter, Categories, Account, ModalService, notify, $localStorage,Socket) {

      var vm = this;

      vm.filter = "Filtros";
      vm.template = '';
      vm.position = 'center';
      vm.duration = '3000';

      vm.config = {
        itemsPerPage: 10
      };

      if($localStorage.categoryList == null) {
        $localStorage.categoryList = [];
        Categories.getCategories().then(function(res){
          for(var i=0;i<res.data.length;i++)
            $localStorage.categoryList.push(res.data[i]);
        });
      }

      vm.filteredList = $localStorage.categoryList;

      Socket.on('category create',function(msg){
        $localStorage.categoryList.push(msg);
      });

      Socket.on('category update',function(msg){
        $localStorage.categoryList.filter(function(item){
          if(item._id === msg._id)
            item.title = msg.title;
        });
          vm.filteredList = $localStorage.categoryList;
      });

      vm.updateList = function() {
        vm.filter = "Filtros";
        vm.filteredList = filterFilter($localStorage.categoryList,vm.key);
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
        vm.filteredList = filterFilter($localStorage.categoryList,key);
      };

      vm.create = function(){
        vm.alertTitle = 'Aqui você cria suas categorias';
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
            vm.msg = result ? 'Categoria criada com sucesso' : 'Sua nova categoria não foi criada';
            vm.classes = result ? 'alert-success' : 'alert-danger';
            if(result){
              Categories.createCategory(result.name).then(function(res){
                Socket.emit('category create',res.data);
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
        vm.alertTitle = 'Deletar categoria';
        vm.alertQuestion = 'Tem certeza que deseja deletar esta categoria?';
        $localStorage.categoryList.filter(function(item){
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
                  Categories.deleteCategory(id).then(function(res){
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
        $localStorage.categoryList.filter(function(item){
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
                  Categories.updateCategory(id,result.name).then(function(res){
                    Socket.emit('category update',res.data);
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
