(function() {
  angular.module('dashboard').service('Plans', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPlans = function(){
      return $http.get(url_base+'/plans',{etagCache: 'persistentCache'}).then(function(result,itemCache){
        itemCache.set(result);
        return result;
      }).ifCached(function(result,itemCache){
        return itemCache.get(itemCache.info().itemKey);
      });
    };

    this.createPlan = function(title){
      return $http.post(url_base+'/plans',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.getPlan = function(id){
      return $http.get(url_base+'/plans/'+id,{etagCache: 'persistentCache'}).then(function(result,itemCache){
        itemCache.set(result);
        return result;
      }).ifCached(function(result,itemCache){
        return itemCache.get(itemCache.info().itemKey);
      });
    };

    this.updatePlan = function(id,title){
      return $http.put(url_base+'/plans/'+id,{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.deletePlan = function(id){
      return $http.delete(url_base+'/plans/'+id).then(function(result){
        return result;
      });
    };

  }]);
}());
