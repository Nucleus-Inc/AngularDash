(function() {
  angular.module('dashboard').controller('AdminsCtrl', ['$scope','filterFilter', function($scope, filterFilter) {

    var vm = this;

    vm.config = {
      itemsPerPage: 10
    };

    vm.personList = [{
      index: 1,
      name: "Kristin Hill",
      email: "kristin@hill.com",
      phone: "85996592604"
    }, {
      index: 2,
      name: "Valerie Francis",
      email: "valerie@francis.com",
      phone: "85996592604"
    }, {
      index: 3,
      name: "Bob Abbott",
      email: "bob@abbott.com",
      phone: "85996592604"
    }, {
      index: 4,
      name: "Greg Boyd",
      email: "greg@boyd.com",
      phone: "85996592604"
    }, {
      index: 5,
      name: "Peggy Massey",
      email: "peggy@massey.com",
      phone: "85996592604"
    }, {
      index: 6,
      name: "Janet Bolton",
      email: "janet@bolton.com",
      phone: "85996592604"
    }, {
      index: 7,
      name: "Maria Liu",
      email: "maria@liu.com",
      phone: "85996592604"
    }, {
      index: 8,
      name: "Anne Warren",
      email: "anne@warren.com",
      phone: "85996592604"
    }, {
      index: 9,
      name: "Keith Steele",
      email: "keith@steele.com",
      phone: "85996592604"
    }, {
      index: 10,
      name: "Jerome Lyons",
      email: "jerome@lyons.com",
      phone: "85996592604"
    }, {
      index: 11,
      name: "Jacob Stone",
      email: "jacob@stone.com",
      phone: "85996592604"
    }, {
      index: 12,
      name: "Marion Dunlap",
      email: "marion@dunlap.com",
      phone: "85996592604"
    }, {
      index: 13,
      name: "Stacy Robinson",
      email: "stacy@robinson.com",
      phone: "85996592604"
    }, {
      index: 14,
      name: "Luis Chappell",
      email: "luis@chappell.com",
      phone: "85996592604"
    }, {
      index: 15,
      name: "Kimberly Horne",
      email: "kimberly@horne.com",
      phone: "85996592604"
    }, {
      index: 16,
      name: "Andy Smith",
      email: "andy@smith.com",
      phone: "85996592604"
    }];

    vm.filteredList = vm.personList;

    vm.updateList = function() {
      vm.filteredList = filterFilter(vm.personList, vm.key);
    };

  }]);
}());
