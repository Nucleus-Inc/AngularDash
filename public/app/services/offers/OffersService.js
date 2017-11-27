(function() {
  angular.module('dashboard').service('Offers', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getOffers = function(){
      return $http.get(url_base+'/offers').then(function(result){
        return result;
      })
    };

    this.createOffer = function(title){
      return $http.post(url_base+'/offers',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.getOffer = function(id){
      return $http.get(url_base+'/offers/'+id).then(function(result){
        return result;
      })
    };

    this.updateOffer = function(id,title){
      return $http.put(url_base+'/offers/'+id,{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.deleteOffer = function(id){
      return $http.delete(url_base+'/offers/'+id).then(function(result){
        return result;
      });
    };

  }]);
}());
