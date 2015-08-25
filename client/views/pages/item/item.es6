

Template.item.helpers({
    itemMapOptions: function () {

        if (GoogleMaps.loaded()) {
            var location = Locations.findOne();
            return mapOptions = {
                center: new google.maps.LatLng(location.latitude, location.longitude),
                styles: [
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [
                            {"visibility": "simplified"},
                            {"lightness": 20}]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "all",
                        "stylers": [
                            {"visibility": "off"}]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "all",
                        "stylers": [
                            {"visibility": "on"}]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {"saturation": -100},
                            {"visibility": "on"},
                            {"lightness": 10}]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [{"visibility": "on"}]
                    },
                    {"featureType": "road.local", "elementType": "all", "stylers": [{"visibility": "on"}]},
                    {"featureType": "road.highway", "elementType": "labels", "stylers": [{"visibility": "simplified"}]},
                    {"featureType": "poi", "elementType": "labels", "stylers": [{"visibility": "off"}]},
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels",
                        "stylers": [{"visibility": "on"}, {"lightness": 50}]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{"hue": "#a1cdfc"}, {"saturation": 30}, {"lightness": 49}]
                    },
                    {"featureType": "road.highway", "elementType": "geometry", "stylers": [{"hue": "#f49935"}]},
                    {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"hue": "#fad959"}]},
                    {
                        "featureType": 'road.highway',
                        elementType: 'all',
                        stylers: [{hue: '#dddbd7'}, {saturation: -92}, {lightness: 60}, {visibility: 'on'}]
                    },
                    {
                        "featureType": 'landscape.natural',
                        elementType: 'all',
                        stylers: [{hue: '#c8c6c3'}, {saturation: -71}, {lightness: -18}, {visibility: 'on'}]
                    },
                    {
                        "featureType": 'poi',
                        elementType: 'all',
                        stylers: [{hue: '#d9d5cd'}, {saturation: -70}, {lightness: 20}, {visibility: 'on'}]
                    }],
                zoom: 14,
                disableDefaultUI: true,
                scrollwheel: false,
                panControl: false,
                zoomControl: false,
                draggable: true
            };
        }
    },
    rental: function () {

        var rentId = parseInt( FlowRouter.getParam('rentId'));
        var rental = Locations.findOne({id:  rentId  }) || {};
        return rental;
    }
});

Template.item.onCreated(function () {

    GoogleMaps.ready('itemMap', function (map) {




        var location = Locations.findOne();

        prepareMarkerContent(location, map);



    });


});

Template.item.onRendered(function () {

    console.log('item rendered');



/*
    if ( ( $('.slider-for').length !== 0 ) && ( $(".slick-initialized").length === 0 )  ) {}
*/

        this.$('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav',
            adaptiveHeight: 'true'
        });
        this.$('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: true,
            appendArrows: '.slider-for',
            centerMode: true,
            focusOnSelect: true
        });





});

