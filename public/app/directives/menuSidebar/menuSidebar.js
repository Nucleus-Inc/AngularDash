(function() {
  angular.module('dashboard').directive('menuSidebar', function() {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuSidebar/menuSidebar.html',
      controller: 'MenuSidebarCtrl as menuSidebarCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        var width = angular.element(window).width();

        var toogle = function() {
          angular.element('#sidebar').toggleClass('sidebar-visible');
          angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
        }

        if(width < 768) {

          if(angular.element('#sidebar').hasClass('sidebar-visible')) {
            angular.element('#sidebar').toggleClass('sidebar-visible');
            angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
          }

          angular.element('.side-toogle').bind('click',function() {
            if(angular.element('#sidebar').hasClass('sidebar-visible'))
              toogle();
          });

        }
      }
    };
  });
}());
