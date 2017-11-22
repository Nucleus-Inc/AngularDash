(function() {
  angular.module('dashboard').service('Verification', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.adminVerifyEmail = function(email) {
      return $http.get(url_base+'/verifications/admins?email=' + email).then(function(result){
        return result;
      });
    };

  }]);
}());
