(function() {

  var app = angular.module('angularDash', ['ngRoute', 'chart.js', 'angularModalService', 'angular-table', 'cgNotify', 'alexjoffroy.angular-loaders'])

    .config(function($routeProvider, $locationProvider) {

      $locationProvider.hashPrefix('');

      $routeProvider.when("/", {
          templateUrl: "./views/dashboard.html",
          controller: "DashboardCtrl as dashCtrl"
        })

        .when("/login", {
          templateUrl: "./views/login.html"
        })

        .when("/forms", {
          templateUrl: "./views/forms.html",
          controller: "FormsCtrl as formsCtrl"
        })

        .when("/buttons", {
          templateUrl: "./views/buttons.html"
        })

        .when("/modals", {
          templateUrl: "./views/modals.html",
          controller: "ModalsCtrl as modalsCtrl"
        })

        .when("/tables", {
          templateUrl: "./views/tables.html",
          controller: "TablesCtrl as tablesCtrl"
        })

        .when("/notifications", {
          templateUrl: "./views/notifications.html",
          controller: "NotificationsCtrl as notificationsCtrl"
        })

        .when("/blank", {
          templateUrl: "./views/blank.html",
          controller: "BlankCtrl as blankCtrl"
        })

        .when("/account", {
          templateUrl: "./views/account.html",
          controller: "AccountCtrl as accountCtrl"
        })

        .when("/register", {
          templateUrl: "./views/register.html",
          controller: "RegisterCtrl as registerCtrl"
        })

        .when("/forgot", {
          templateUrl: "./views/forgot.html",
          controller: "ForgotCtrl as forgotCtrl"
        })

        .otherwise({
          redirectTo: "/"
        });
    })

    .run(function($rootScope, $location) {

      $rootScope.$on("$routeChangeStart", function(event, next, current) {
        console.log("Route Start");
      });

      $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        console.log("Route Change Error: " + rejection);
        $location.path("/");
      });

      $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (typeof previous != 'undefined') {
          console.log("Previous Url: " + previous.originalPath);
        }
        console.log("Current Url: " + current.originalPath);
      });
    });
})();
