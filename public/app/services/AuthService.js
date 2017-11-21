(function() {
  angular.module('dashboard').service('Auth', ['$http','$q', function($http,$q) {

    var url_base = 'http://localhost:8080';

    this.signup = function(name,email,password){
      return $http.post(url_base+'/admins/account/signup',{
        'name': name,
        'email': email,
        'password': password
      }).then(function(result){
        return result;
      })
    };

    this.login = function(email,password){
      return $http.post(url_base+'/admins/auth/local/login',{
        'email': email,
        'password': password
      }).then(function(result){
        return result;
      });
    };

    this.isAuthenticated = function() {
      return $http.get(url_base+'/admins/auth/local/login').then(function(result) {
        console.log(result);
      });
    };

  }]);
}());
