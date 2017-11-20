(function() {
  angular.module('dashboard').directive('linkSidebar', function() {
    return {
      restrict: 'AEC',
      priority: 100,
      controller: ['$scope','$location', function($scope,$location) {
        $scope.path = function(href){
          $location.path(href);
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        iElement.bind('click',function() {
          scope.path(iAttrs.href);
          scope.$apply();
        });
      }
    };
  });
}());
