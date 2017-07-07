(function() {

    var app = angular.module('Dashboard', ['ngRoute', 'chart.js', 'angularModalService', 'angular-table', 'cgNotify'])


    .config(function($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $routeProvider.when("/", {
            templateUrl: "./views/dashboard.html",
            controller: "DashboardController as dashCtrl"
        })

        .when("/login", {
            templateUrl: "./views/login.html"
        })

        .when("/forms", {
            templateUrl: "./views/forms.html",
            controller: "FormsController as formsCtrl"
        })

        .when("/buttons", {
            templateUrl: "./views/buttons.html"
        })

        .when("/modals", {
            templateUrl: "./views/modals.html",
            controller: "ModalsController as modalsCtrl"
        })

        .when("/tables", {
            templateUrl: "./views/tables.html",
            controller: "TablesController as tablesCtrl"
        })

        .when("/notifications", {
            templateUrl: "./views/notifications.html",
            controller: "NotificationsController as notificationsCtrl"
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
