(function() {
    angular.module('Dashboard').controller('NotificationsController', ['$scope', 'notify', function($scope, notify) {

        var vm = this;


        vm.msg = 'Hello! This is a sample message!';
        vm.template = '';

        vm.positions = ['center', 'left', 'right'];
        vm.position = vm.positions[0];

        vm.duration = 10000;

        vm.demo = function() {
            notify({
                message: vm.msg,
                classes: vm.classes,
                templateUrl: vm.template,
                position: vm.position,
                duration: vm.duration
            });
        };

        vm.closeAll = function() {
            notify.closeAll();
        };

        vm.demoMessageTemplate = function() {

            var messageTemplate = '<span>This is an example using a dynamically rendered Angular template for the message text. ' +
                'I can have <a href="" ng-click="clickedLink()">hyperlinks</a> with ng-click or any valid Angular enhanced html.</span>';

            notify({
                messageTemplate: messageTemplate,
                classes: vm.classes,
                scope: $scope,
                templateUrl: vm.template,
                position: vm.position,
            });

        };

        vm.clickedLink = function() {
            notify('You clicked a link!');
        };

    }]);
}());
