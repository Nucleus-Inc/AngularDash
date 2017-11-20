(function() {
  angular.module('dashboard').directive('uiEmail', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope', function($scope) {

        $scope.verifyPartnerEmail = function(email,view){
          view.$setValidity("emailExists",true);
        };

      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        scope.$watch('ngModel', function (value) {
          if(value){ //exists an input value
            var str = ""+value;
            var res = str.match(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/);
            if(res){ //email is match
              ngModelCtrl.$setValidity("invalidEmail",true);
              scope.verifyPartnerEmail(scope.ngModel,ngModelCtrl);
            }else //email no match
              ngModelCtrl.$setValidity("invalidEmail",false);
          }else //no input value
            ngModelCtrl.$setValidity("invalidEmail",false);
        });

      }
    };
  });
}());
