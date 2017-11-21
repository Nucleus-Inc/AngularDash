(function() {
  angular.module('dashboard').factory('Config', [ function() {
    return {
      url_base: 'http://localhost:8080'
    }
  }]);
}());
