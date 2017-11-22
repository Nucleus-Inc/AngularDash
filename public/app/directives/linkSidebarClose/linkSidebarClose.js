(function() {
  angular.module('dashboard').directive('linkSidebarClose', function() {
    return {
      restrict: 'AEC',
      priority: 900,
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        var width = angular.element(window).width();
        iElement.bind('click',function() {
          if(width < 768) {
            angular.element('#sidebar').removeClass('sidebar-visible');
            angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up');
          }
        });
      }
    };
  });
}());
