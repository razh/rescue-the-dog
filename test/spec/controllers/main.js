'use strict';

describe( 'Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach( module( 'rescueTheDogApp' ) );

  var createController, scope, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach( inject( function( $controller, $rootScope, $httpBackend ) {
    scope = $rootScope.$new();

    httpBackend = $httpBackend;

    createController = function() {
      return $controller( 'MainCtrl', {
        $scope: scope
      });
    };
  }));

  it( 'should make an xhr GET request for the beats listings', function() {
    httpBackend.when( 'GET', './json/beats.json' )
      .respond( 201, [ {}, {}, {} ] );

    createController();
    httpBackend.flush();
    expect( scope.beats.length ).toBe(3);
  });

  it( 'should retrieve and load valid data', function() {
    httpBackend.when( 'GET', './json/beats.json' )
      .respond( 201, [
        { id: 'test-0', description: 'test-desc-0', title: 'test-title-0' },
        { id: 'test-1', description: 'test-desc-1', title: 'test-title-1' },
        { id: 'test-2', description: 'test-desc-2', title: 'test-title-2' }
      ]);

    createController();
    httpBackend.flush();
    expect( scope.beats[0].id ).toBe( 'test-0' );
    expect( scope.beats[0].title ).toBe( 'test-title-0' );
    expect( scope.beats[0].description ).toBe( 'test-desc-0' );
  });
});
