'use strict';

angular.module( 'rescueTheDogApp', [] )
  .config( function( $routeProvider, $locationProvider ) {
    $routeProvider
      .when( '/', {
        templateUrl: 'views/main.html'
      })
      .when( '/beat/:beatId', {
        templateUrl: 'views/beat.html',
        controller: 'BeatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
