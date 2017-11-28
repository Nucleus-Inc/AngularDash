'use strict';

/**
 * @ngdoc overview
 * @name dashboard
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */

angular
  .module('dashboard',[
      'ngRoute',
      'ngStorage',
      'http-etag',
      'chart.js',
      'angularModalService',
      'angular-table',
      'cgNotify',
      'alexjoffroy.angular-loaders',
      'ngMessages',
      'ngAnimate',
      'ngSanitize',
      'ui.utils.masks',
      'zxcvbn',
      'validation.match',
      'angularMoment'
  ])
  .config(function($routeProvider, $locationProvider, $httpProvider, httpEtagProvider) {

    // Remove '!' from path
    $locationProvider.hashPrefix('');

    // Allow cross domain requests
    $httpProvider.defaults.withCredentials = true;

    httpEtagProvider
     .defineCache('persistentCache', {
       cacheService: 'localStorage'
     });

    $routeProvider
      .when('/',{
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeCtrl as homeCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/consultores',{
        templateUrl: 'app/views/admins/admins.html',
        controller: 'AdminsCtrl as adminsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/parceiros',{
        templateUrl: 'app/views/partnes/partnes.html',
        controller: 'PartnesCtrl as partnesCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/categorias',{
        templateUrl: 'app/views/categories/categories.html',
        controller: 'CategoriesCtrl as categoriesCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/planos',{
        templateUrl: 'app/views/plans/plans.html',
        controller: 'PlansCtrl as plansCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/ofertas',{
        templateUrl: 'app/views/offers/offers.html',
        controller: 'OffersCtrl as offersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/perfil',{
        templateUrl: 'app/views/profile/profile.html',
        controller: 'ProfileCtrl as profileCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/settings',{
        templateUrl: 'app/views/profile/settings.html',
        controller: 'SettingsCtrl as settingsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/problemas',{
        templateUrl: 'app/views/report/report.html',
        controller: 'ReportCtrl as reportCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/tables',{
        templateUrl: 'app/views/uiElements/tables.html',
        controller: 'TablesCtrl as tablesCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/forms',{
        templateUrl: 'app/views/uiElements/forms.html',
        controller: 'FormsCtrl as formsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/buttons',{
        templateUrl: 'app/views/uiElements/buttons.html',
        controller: 'ButtonsCtrl as buttonsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/notifications',{
        templateUrl: 'app/views/uiElements/notifications.html',
        controller: 'NotificationsCtrl as notificationsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/modals',{
        templateUrl: 'app/views/uiElements/modals.html',
        controller: 'ModalsCtrl as modalsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/blank',{
        templateUrl: 'app/views/pages/blank.html',
        controller: 'BlankCtrl as blankCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/login',{
        templateUrl: 'app/views/auth/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/cadastrar',{
        templateUrl: 'app/views/auth/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'registerCtrl'
      })
      .when('/recuperar',{
        templateUrl: 'app/views/auth/forgot.html',
        controller: 'ForgotCtrl',
        controllerAs: 'forgotCtrl'
      })
      .when('/consultores/:recoveryKey/redefinir-senha/:token',{
        templateUrl: 'app/views/auth/reset.html',
        controller: 'ResetCtrl',
        controllerAs: 'resetCtrl'
      })
      .when('/activation/:token',{
        templateUrl: 'app/views/auth/activation.html',
        controller: 'ActivationCtrl',
        controllerAs: 'activationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })

  .run(function($rootScope, $location) {

    /* Route events */
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      console.log("Route Start");
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      console.log("Route Change Error: " + rejection);
      $location.path("/login");
    });

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      if (typeof previous != 'undefined') {
        console.log("Previous Url: " + previous.originalPath);
      }
      console.log("Current Url: " + current.originalPath);
    });

  });
