(function() {
  angular.module('dashboard').service('Partnes', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPartnes = function(){
      return $http.get(url_base+'/admins',{etagCache: 'persistentCache'}).then(function(result,itemCache){
        itemCache.set(result);
        return result;
      }).ifCached(function(result,itemCache){
        return itemCache.get(itemCache.info().itemKey);
      });
    };

  }]);
}());
