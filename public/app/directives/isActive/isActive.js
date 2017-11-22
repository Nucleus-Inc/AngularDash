(function() {
  angular.module('dashboard').directive('isActive', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          console.log('alterou');
          if(value)
            console.log(value);
        });
      }
    };
  });
}());
