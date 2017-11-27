(function() {
  angular.module('dashboard').service('Partnes', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPartnes = function(){
      return $http.get(url_base+'/partnes').then(function(result){
        return result;
      })
    };

  }]);
}());
