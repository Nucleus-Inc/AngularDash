(function() {
  angular.module('dashboard').service('Plans', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPlans = function(){
      return $http.get(url_base+'/plans').then(function(result){
        return result;
      })
    };

    this.createPlan = function(title){
      return $http.post(url_base+'/plans',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.getPlan = function(id){
      return $http.get(url_base+'/plans/'+id).then(function(result){
        return result;
      })
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
