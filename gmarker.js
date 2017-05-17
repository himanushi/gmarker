/*!
 * gMarker v1.0.1
 * http://himakan.net/tool/gmarker
 */
( function(){
  "use strict";

  var gDivs = $( "[id ^= 'gmarkerDiv']" );

  if ( gDivs.length > 0 ) {
    var
      apiKey  = $( '#gmarkerjs' ).data( 'key' ),
      gMapUrl = 'https://maps.googleapis.com/maps/api/js?callback=initGMarker&key=' + apiKey;

    window.initGMarker = function () {

      $.each( gDivs, function( _, gDiv ) {
        var
          mapData = $( gDiv ).children( 'span' ),
          centerMarker = {
            lat: $( mapData[0] ).data( 'longitude' ),
            lng: $( mapData[0] ).data( 'latitude' )
          };

        // Set Map
        var map = new google.maps.Map( document.getElementById( gDiv.id ), {
          zoom:   $( gDiv ).data( 'zoom' ),
          center: centerMarker
        } );

        // Set Marker
        $.each( mapData, function( _, mData ) {

          var marker = new google.maps.Marker( {
            position: { lat: $( mData ).data( 'longitude' ),
                        lng: $( mData ).data( 'latitude' ) },
            map: map,
            title: $( mData ).data( 'title' )
          } );

          // Set Icon
          if ( $( mData ).data( 'icon' ) ) {
            marker.setOptions( { icon: { url: $( mData ).data( 'icon' ) } } )
          }

          // Set anime
          if ( $( mData ).data( 'anime' ) ) {
            marker.setAnimation( selectAnimation( $( mData ).data( 'anime' ) ) );
          }

          // Set Event
          if ( $( mData ).data( 'event' ) ) {
            var infoWindow = new google.maps.InfoWindow( { content: $( mData ).data( 'event' ) } );
            marker.addListener( 'click', function() {
              infoWindow.open( map, marker );
            } );
          }
        } );
      } );

      function selectAnimation(anime) {
        if ( anime == 'bounce' ) {
          return google.maps.Animation.BOUNCE
        } else if ( anime == 'drop' ) {
          return google.maps.Animation.DROP
        } else if ( anime == 'lo' ) {
          return google.maps.Animation.lo
        } else if ( anime == 'jo' ) {
          return google.maps.Animation.jo
        }
      }
    };

    $.getScript( gMapUrl );
  }
} )();
