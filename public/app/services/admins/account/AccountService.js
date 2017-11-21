(function() {
  angular.module('dashboard').service('Account', ['$http','$q', function($http,$q) {

    var url_base = Config.url_base;

    this.signup = function(name,email,password){
      return $http.post(url_base+'/admins/account/signup',{
        'name': name,
        'email': email,
        'password': password
      }).then(function(result){
        return result;
      })
    };

    this.setActivationCode = function(_id){
      return $http.put(url_base+'/admins/'+_id+'/account/activation').then(function(result){
        return result;
      });
    };

    this.setRecoveryToken = function(recoveryKey) {
      return $http.patch(url_base+'/admins/account/recovery', recoveryKey).then(function(result){
        return result;
      });
    };

  }]);
}());