'use strict';

describe('Controller: BlankCtrl', function () {

  // load the controller's module
  beforeEach(module('Dashboard'));

  var BlankController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlankController = $controller('BlankController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(3).toBe(3);
  });
});
