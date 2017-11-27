(function() {
  angular.module('dashboard').directive('currentPassword', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Auth','Config','$localStorage', function($scope,Auth,Config,$localStorage) {
        $scope.checkPassword = function(password, view){
          $localStorage.personList.filter(function(item){
            if(item._id === Config._id){
              Auth.login(item.email,password).then(function(res){
                if(res.status === 200)
                  view.$setValidity("currentPassword", true);
                else
                  view.$setValidity("currentPassword", false);
              }).catch(function(err){
                view.$setValidity("currentPassword", false);
              });
            }
          });
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("currentPassword", true);
          if(value)
            scope.checkPassword(value,ngModelCtrl);
        });
      }
    };
  });
}());
