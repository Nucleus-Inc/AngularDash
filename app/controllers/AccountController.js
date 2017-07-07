(function() {
    angular.module('Dashboard').controller('AccountController', ['$scope', function($scope) {

        var vm = this;

        vm.account = [];
        vm.account.token = "asadASHyshd371389";

        $scope.tab = 1;

        $scope.setTab = function(newTab) {
            $scope.tab = newTab;
        };

        $scope.isSet = function(tabNum) {
            return $scope.tab === tabNum;
        };

    }]);
}());
