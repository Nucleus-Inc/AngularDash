(function() {
  angular.module('dashboard').controller('HomeCtrl', ['$scope','$timeout','Auth', function($scope,$timeout,Auth) {

    var vm = this;

    vm.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    vm.series = ['Series A', 'Series B'];
    vm.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    vm.onClick = function(points, evt) {
      console.log(points, evt);
    };

    // Simulate async data update
    $timeout(function() {
      vm.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [65, 59, 80, 81, 56, 55, 40]
      ];
    }, 3000);

    vm.donutLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    vm.donutData = [300, 500, 100];

    vm.infos = [
      {
        "label": "Consultores",
        "number": "3"
      },
      {
        "label": "New Orders",
        "number": "12"
      },
      {
        "label": "Reports",
        "number": "22"
      },
      {
        "label": "Issues",
        "number": "5"
      }
    ]

  }]);
}());
