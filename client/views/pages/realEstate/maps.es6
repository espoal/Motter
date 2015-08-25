Template.realEstate.helpers({
    mapOptions: function () {
        if (GoogleMaps.loaded()) {
            return mapOptions = {
                center: new google.maps.LatLng(51.541216, -0.095678),
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
                disableDefaultUI: false,
                scrollwheel: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_TOP
                }
            };
        }
    }
});

Template.realEstate.onCreated(function () {

    GoogleMaps.ready('realMap', function (map) {

        var location = Locations.findOne();

        prepareMarkerContent(location, map);



    });





});

Template.realEstate.onRendered(function () {


// Set map height to 100% ----------------------------------------------------------------------------------------------

    if ($(window).width() > 768) {


        $('.map-canvas').height($(window).height() - $('.header').height());
    }
    else {
        $('.map-canvas #map').height($(window).height() - $('.header').height());
    }

    //  Bootstrap Select ---------------------------------------------------------------------------------------------------

    var select = $('select');
    if (select.length > 0 ){
        select.selectpicker();
    }
    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('.dropdown-menu');
    bootstrapSelect.on('shown.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-out');
        dropDownMenu.addClass('animation-fade-in');
    });
    bootstrapSelect.on('hide.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-in');
        dropDownMenu.addClass('animation-fade-out');
    });
    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function() {
            $(_this).removeClass('open');
        }, 100);
    });

    //  iCheck -------------------------------------------------------------------------------------------------------------

    if ($('.checkbox').length > 0) {
        $('input').iCheck();
    }

    if ($('.radio').length > 0) {
        $('input').iCheck();
    }

    $('body').addClass('page-fade-in');

    $('a').on('click', function (e) {
        var attr = $(this).attr('href');
        //alert( $(this).attr('href') );
        if ( attr.indexOf('#') != 0 ) {
            e.preventDefault();
            var goTo = this.getAttribute("href");
            $('body').removeClass('page-fade-in');
            $('body').addClass('page-fade-out');
            setTimeout(function(){
                window.location = goTo;
            },200);
        }
        else if ( $(this).attr('href') == '#' ) {
            e.preventDefault();
        }
    });

    //  No UI Slider -------------------------------------------------------------------------------------------------------

    if( $('.ui-slider').length > 0 ){
        $('.ui-slider').each(function(){
            var step;
            if( $(this).attr('data-step') ) {
                step = parseInt( $(this).attr('data-step') );
            }
            else {
                step = 10;
            }
            var sliderElement = $(this).attr('id');
            var element = $( '#' + sliderElement);
            var valueMin = parseInt( $(this).attr('data-value-min') );
            var valueMax = parseInt( $(this).attr('data-value-max') );
            $(this).noUiSlider({
                start: [ valueMin, valueMax ],
                connect: true,
                range: {
                    'min': valueMin,
                    'max': valueMax
                },
                step: step
            });
            if( $(this).attr('data-value-type') == 'price' ) {
                if( $(this).attr('data-currency-placement') == 'before' ) {
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                }
                else if( $(this).attr('data-currency-placement') == 'after' ){
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                }
            }
            else {
                $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ decimals: 0 }));
                $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ decimals: 0 }));
            }
        });
    }

    // Scrollbar on "Results" section

    if( $('.items-list').length > 0 ){
        

        $(".items-list").mCustomScrollbar({
            mouseWheel:{ scrollAmount: 350 }
        });
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Push items to array and create <li> element in Results sidebar ------------------------------------------------------

pushItemsToArray = function pushItemsToArray(location){
    var itemPrice;
    return (
        '<li>' +
        '<div class="item" id="' + location.id + '">' +
        '<a href="#" class="image">' +
        '<div class="inner">' +
        '<div class="item-specific">' +
        drawItemSpecific(location) +
        '</div>' +
        '<img src="' + location.gallery[0] + '" alt="">' +
        '</div>' +
        '</a>' +
        '<div class="wrapper">' +
        '<a href="#" id="' + location.id + '"><h3>' + location.title + '</h3></a>' +
        '<figure>' + location.location + '</figure>' +
        drawPrice(location.price) +
        '<div class="info">' +
        '<div class="type">' +
        '<i><img src="' + location.type_icon + '" alt=""></i>' +
        '<span>' + location.type + '</span>' +
        '</div>' +
        '<div class="rating" data-rating="' + location.rating + '"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>'
    );

    function drawPrice(price){
        if( price ){
            itemPrice = '<div class="price">' + price +  '</div>';
            return itemPrice;
        }
        else {
            return '';
        }
    }
}

prepareMarkerContent = function prepareMarkerContent(location, map) {

    var markerContent = document.createElement('DIV');
    if( location.featured == 1 ) {
        markerContent.innerHTML =
            '<div class="map-marker featured' + location.color + '">' +
            '<div class="icon">' +
            '<img src="' + location.type_icon +  '">' +
            '</div>' +
            '</div>';
    }
    else {
        markerContent.innerHTML =
            '<div class="map-marker ' + location.color + '">' +
            '<div class="icon">' +
            '<img src="' + location.type_icon +  '">' +
            '</div>' +
            '</div>';
    }

    markerContent.className += 'bounce-animation marker-loaded';

    var marker = new RichMarker({
        position: map.instance.center,
        map: map.instance,
        draggable: false,
        content: markerContent,
        flat: true
    });

    var infoboxContent = document.createElement("div");
    var infoboxOptions = {
        content: infoboxContent,
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(-18, -42),
        zIndex: null,
        alignBottom: true,
        boxClass: "infobox",
        enableEventPropagation: true,
        closeBoxMargin: "0px 0px -30px 0px",
        closeBoxURL: "/images/close.png",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false
    };

    // Infobox HTML element ----------------------------------------------------------------------------------------

    var category = location.category;
    infoboxContent.innerHTML = drawInfobox(location, infoboxContent);

    // Create new markers ------------------------------------------------------------------------------------------

    marker.infobox = new InfoBox(infoboxOptions);



    $('.items-list .results').html(pushItemsToArray(location));





}

drawInfobox = function drawInfobox(category, infoboxContent){

    if(!location.gallery)     { location.gallery= 'images/default-item.jpg' }

    var ibContent = '';
    ibContent =
        '<div class="infobox ' + location.color + '">' +
        '<div class="inner">' +
        '<div class="image">' +
        '<div class="item-specific">' + drawItemSpecific(location) + '</div>' +
        '<div class="overlay">' +
        '<div class="wrapper">' +
        '<a href="#" class="quick-view" data-toggle="modal" data-target="#modal" id="' + location.id + '">Quick View</a>' +
        '<hr>' +
        '<a href="' + location.url +  '" class="detail">Go to Detail</a>' +
        '</div>' +
        '</div>' +
        '<a href="' + location.url +  '" class="description">' +
        '<div class="meta"> <div class="price">' +
        location.price +
        '</div><h2>' + location.title +  '</h2>' +
        '<figure>' + location.location +  '</figure>' +
        '<i class="fa fa-angle-right"></i>' +
        '</div>' +
        '</a>' +
        '<img src="' + location.gallery +  '">' +
        '</div>' +
        '</div>' +
        '</div>';

    return ibContent;
}

// Specific data for each item -----------------------------------------------------------------------------------------

drawItemSpecific = function drawItemSpecific(location){
    var itemSpecific = '';
    if( location.category ){
        if( location.category == 'real_estate' ){
            if( location.item_specific ){
                if( location.item_specific.bedrooms ){
                    itemSpecific += '<span title="Bedrooms"><img src="/images/bedrooms.png">' + location.item_specific.bedrooms + '</span>';
                }
                if( location.item_specific.bathrooms ){
                    itemSpecific += '<span title="Bathrooms"><img src="/images/bathrooms.png">' + location.item_specific.bathrooms + '</span>';
                }
                if( location.item_specific.area ){
                    itemSpecific += '<span title="Area"><img src="/images/area.png">' + location.item_specific.area + '<sup>2</sup></span>';
                }
                if( location.item_specific.garages ){
                    itemSpecific += '<span title="Garages"><img src="/images/garages.png">' + location.item_specific.garages + '</span>';
                }
                return itemSpecific;
            }
        }
        else if ( category == 'bar_restaurant' ){
            if( location.item_specific ){
                if( location.item_specific.menu ){
                    itemSpecific += '<span>Menu from: ' + location.item_specific.menu + '</span>';
                }
                return itemSpecific;
            }
            return itemSpecific;
        }
    }
    else {
        return '';
    }
    return '';
}