(function() {
  angular.module('dashboard').service('Categories', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getCategories = function(){
      return $http.get(url_base+'/categories',{etagCache: 'persistentCache'}).then(function(result,itemCache){
        itemCache.set(result);
        return result;
      }).ifCached(function(result,itemCache){
        return itemCache.get(itemCache.info().itemKey);
      });
    };

    this.createCategory = function(title){
      return $http.post(url_base+'/categories',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.getCategory = function(id){
      return $http.get(url_base+'/categories/'+id,{etagCache: 'persistentCache'}).then(function(result,itemCache){
        itemCache.set(result);
        return result;
      }).ifCached(function(result,itemCache){
        return itemCache.get(itemCache.info().itemKey);
      });
    };

    this.updateCategory = function(id,title){
      return $http.put(url_base+'/categories/'+id,{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.deleteCategory = function(id){
      return $http.delete(url_base+'/categories/'+id).then(function(result){
        return result;
      });
    };

  }]);
}());
