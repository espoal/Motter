Template.realEstate.helpers({
    rendered: function () {
    // Use the Packery jQuery plugin
    var _latitude = 51.541216;
    var _longitude = -0.095678;
    var jsonPath = 'json/real-estate.json';

    // Load JSON data and create Google Maps

    jQuery.getJSON(jsonPath)
        .done(function(json) {
            var createHomepageGoogleMap = UI._globalHelpers.createHomepageGoogleMap(_latitude,_longitude,json);
        })
        .fail(function( jqxhr, textStatus, error ) {
            console.log(error);
        })
    ;

    // Set if language is RTL and load Owl Carousel



}});