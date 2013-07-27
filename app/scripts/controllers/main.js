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

    $scope.select = function( index ) {
      index = Math.min( Math.max( index, 0 ), $scope.beats.length - 1 );
      $location.path( '/beat/' + $scope.beats[ index ].id );
    };

    /**
     * Check if index is at start (index is 0).
     */
    $scope.isStart = function( index ) {
      return index === 0;
    };

    /**
     * Check if index is at end (index is length - 1).
     */
    $scope.isEnd = function( index ) {
      return index === $scope.beats.length - 1;
    };


    /**
     * Get the index of the beat at distance away from the current beat.
     */
    $scope.jump = function( distance ) {
      return $scope.selected.index + distance;
    };

    $scope.prev = function() { return $scope.jump(-1); };
    $scope.next = function() { return $scope.jump(1); };

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
            $scope.select( $scope.prev() );
          } else if ( event.which === 40 ) {
            // CTRL + DOWN.
            $scope.select( $scope.next() );
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
