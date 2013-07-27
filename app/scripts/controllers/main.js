'use strict';

angular.module( 'rescueTheDogApp' )
  .controller( 'MainCtrl', function( $scope, $http, $window, $location ) {
    $scope.selected = {
      beat: null,
      index: null
    };

    $scope.text = {};

    // Grab beat title and description data.
    $http.get( './json/beats.json' )
      .success(function( data ) {
        $scope.beats = data;

        $scope.beats.forEach(function( beat ) {
          $scope.text[ beat.id ] = '';
        });
      });

    $scope.isSelected = function( index ) {
      return index === $scope.selected.index;
    };

    // Handle jumping from beat to beat with key commands.
    $scope.jumpId = function( distance ) {
      var length = $scope.beats.length,
          index = $scope.selected.index || 0,
          newIndex = Math.min( Math.max( 0, index + distance ), length - 1 );

      return $scope.beats[ newIndex ].id;
    };

    $scope.prevId = function() {
      return $scope.jumpId(-1);
    };

    $scope.nextId = function() {
      return $scope.jumpId(1);
    };

    // This needs to be cleaned up.
    function onKeyDown( event ) {
      if ( event.ctrlKey ) {
        if ( event.which === 32 ||
             event.which === 38 ||
             event.which === 40 ) {
          event.preventDefault();


          if ( event.which === 32 ) {
            // Go back if we're already previewing.
            if ( $location.path() === '/preview' ) {
              $window.history.back();
            } else {
              $location.path( '/preview' );
            }
          } else if ( event.which === 38 ) {
            // CTRL + UP.
            $location.path( '/beat/' + $scope.prevId() );
          } else if ( event.which === 40 ) {
            // CTRL + DOWN.
            $location.path( '/beat/' + $scope.nextId() );
          }

          $scope.$apply();
        }
      }

      // ESC.
      if ( event.which === 27 ) {
        event.preventDefault();

        // Since we're back at home, we don't have an index selected.
        $scope.selected.index = null;

        $location.path( '/' );
        $scope.$apply();
      }
    }

    angular.element( $window ).bind( 'keydown', onKeyDown );
  });
