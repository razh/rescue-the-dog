'use strict';

angular.module( 'rescueTheDogApp' )
  .controller( 'BeatCtrl', function( $scope, $routeParams ) {
    var beatId = $routeParams.beatId;
    for ( var i = 0, l = $scope.beats.length; i < l; i++ ) {
      if ( $scope.beats[i].id === beatId ) {
        $scope.selected.beat = $scope.beats[i];
        break;
      }
    }
  });
