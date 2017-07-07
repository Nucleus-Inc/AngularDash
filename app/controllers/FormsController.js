(function() {
    angular.module('Dashboard').controller('FormsController', ['$scope', function($scope) {

        var vm = this;

        this.inputs = [];

        $scope.test = function() {
            if ($scope.formModal.$valid) {
                console.log("valid");
            } else {
                console.log("not valid");
            }
        }
    }]);
}());
