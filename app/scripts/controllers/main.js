'use strict';

angular.module( 'rescueTheDogApp' )
  .controller( 'MainCtrl', function( $scope, $http ) {
    $scope.text = {};

    $scope.getBeats = function() {
      return $http.get( './json/beats.json' )
        .success(function( data ) {
          $scope.beats = data;

          $scope.beats.forEach(function( beat ) {
            $scope.text[ beat.id ] = '';
          });
        });
    };

    $scope.getBeats();
  });
