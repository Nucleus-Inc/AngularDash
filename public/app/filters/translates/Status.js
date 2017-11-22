(function() {
  angular.module('dashboard').filter('status', function() {
    return function(string) {
      if(string == true)
        return 'Ativo';
      return 'Pendente';
    };
  });
}());
