var mapStyles = [ {"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"on"},{"lightness":10}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":50}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]}, {featureType:'road.highway',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:60},{visibility:'on'}]}, {featureType:'landscape.natural',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-71},{lightness:-18},{visibility:'on'}]},  {featureType:'poi',elementType:'all',stylers:[{hue:'#d9d5cd'},{saturation:-70},{lightness:20},{visibility:'on'}]} ];

App = {};

App.UI = {};

Template.mainLayout.onRendered( function() {

    console.log('mainLayout rendered');

    onRendered();




});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

onRendered = function () {

    console.log('function called');

    if( $('body').hasClass('navigation-fixed') ){
        $('.off-canvas-navigation').css( 'top', - $('.header').height() );
        $('#page-canvas').css( 'margin-top',$('.header').height() );
    }

    rating();
    setInputsWidth();
    adaptBackgroundHeight();

    // Scrollbar on "Results" section

    if( $('.items-list').length > 0 ){
        $(".items-list").mCustomScrollbar({
            mouseWheel:{ scrollAmount: 350 }
        });
    }

    // Bootstrap tooltip

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    $('.off-canvas-navigation header').css( 'line-height', $('.header').height() + 'px' );

    // Date & Time picker

    if( $('.input-group.date').length > 0 ){
        $('.input-group.date').datepicker({ });
    }
    if( $('.input-daterange').length > 0 ){
        $('.input-daterange').datepicker({
            todayHighlight: true
        });
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

// Keyboard Shortcuts --------------------------------------------------------------------------------------------------

    $(document).bind('keypress', 'F', function(){
        $('.redefine-search .expand-content').trigger('click');
        if( !$('.search-bar').hasClass('collapsed') ){
            setTimeout(function() {
                $('.search-bar input').first().focus();
            }, 200);
        }
        return false;
    });

    $(document).bind('keypress', 'M', function(){
        $('.header .toggle-navigation').trigger('click');
        return false;
    });

    $(document).bind('keypress', '+', function(){
        $('.header .submit-item').trigger('click');
        return false;
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                $('.item-slider').trigger('prev.owl.carousel');
                break;
            case 39: // right
                $('.item-slider').trigger('next.owl.carousel');
                break;
            case 27: // ESC
                $('.modal-background').trigger('click');
                break;
        }
    });

//  Smooth Navigation Scrolling ----------------------------------------------------------------------------------------

    $('.navigation .nav a[href^="#"], a[href^="#"].roll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if ($(window).width() > 768) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - $('.navigation').height()
            }, 2000)
        } else {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 2000)
        }
        return false;
    });

//  Items scripts ------------------------------------------------------------------------------------------------------

    $('.item.admin-view .hide-item').on('click',function (e) {
        $(this).closest('.item').toggleClass('is-hidden');
    });




}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Template.mainLayout.events(

    {
        'window load': function (event) {
        var $equalHeight = $('.equal-height');
        for (var i = 0; i < $equalHeight.length; i++) {
            equalHeight($equalHeight);
        }
    },
        'window resize': function (event) {
            adaptBackgroundHeight();
            var $equalHeight = $('.equal-height');
            for (var i = 0; i < $equalHeight.length; i++) {
                equalHeight($equalHeight);
            }
        }



    });







function setInputsWidth(){
    var $inputRow = $('.search-bar.horizontal .input-row');
    for( var i=0; i<$inputRow.length; i++ ){
        if( $inputRow.find( $('button[type="submit"]') ).length ){
            $inputRow.find('.form-group:last').css('width','initial');
        }
    }

    var searchBar =  $('.search-bar.horizontal .form-group');
    for( var a=0; a<searchBar.length; a++ ){
        if( searchBar.length <= ( 1 + 1 ) ){
            $('.main-search').addClass('inputs-1');
        }
        else if( searchBar.length <= ( 2 + 1 ) ){
            $('.main-search').addClass('inputs-2');
        }
        else if( searchBar.length <= ( 3 + 1 ) ){
            $('.main-search').addClass('inputs-3');
        }
        else if( searchBar.length <= ( 4 + 1 ) ){
            $('.main-search').addClass('inputs-4');
        }
        else if( searchBar.length <= ( 5 + 1 ) ){
            $('.main-search').addClass('inputs-5');
        }
        else {
            $('.main-search').addClass('inputs-4');
        }
        if( $('.search-bar.horizontal .form-group label').length > 0 ){
            $('.search-bar.horizontal .form-group:last-child button').css('margin-top', 25)
        }
    }
}

// Autocomplete address ------------------------------------------------------------------------------------------------

function autoComplete(){
    if( !$("script[src='assets/js/leaflet.js']").length ){
        var input = document.getElementById('location') ;
        var autocomplete = new google.maps.places.Autocomplete(input, {
            types: ["geocode"]
        });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
        });
    }
}

// Rating --------------------------------------------------------------------------------------------------------------

function rating(element){
    var ratingElement =
            '<span class="stars">'+
            '<i class="fa fa-star s1" data-score="1"></i>'+
            '<i class="fa fa-star s2" data-score="2"></i>'+
            '<i class="fa fa-star s3" data-score="3"></i>'+
            '<i class="fa fa-star s4" data-score="4"></i>'+
            '<i class="fa fa-star s5" data-score="5"></i>'+
            '</span>'
        ;
    if( !element ) { element = ''; }
    $.each( $(element + ' .rating'), function(i) {
        $(this).append(ratingElement);
        if( $(this).hasClass('active') ){
            $(this).append('<input readonly hidden="" name="score_' + $(this).attr('data-name') +'" id="score_' + $(this).attr('data-name') +'">');
        }
        var rating = $(this).attr('data-rating');
        for( var e = 0; e < rating; e++ ){
            var rate = e+1;
            $(this).children('.stars').children( '.s' + rate ).addClass('active');
        }
    });

    var ratingActive = $('.rating.active i');
    ratingActive.on('hover',function(){
            for( var i=0; i<$(this).attr('data-score'); i++ ){
                var a = i+1;
                $(this).parent().children('.s'+a).addClass('hover');
            }
        },
        function(){
            for( var i=0; i<$(this).attr('data-score'); i++ ){
                var a = i+1;
                $(this).parent().children('.s'+a).removeClass('hover');
            }
        });
    ratingActive.on('click', function(){
        $(this).parent().parent().children('input').val( $(this).attr('data-score') );
        $(this).parent().children('.fa').removeClass('active');
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).addClass('active');
        }
        return false;
    });
}

// Adapt background height to block element ----------------------------------------------------------------------------

function adaptBackgroundHeight(){
    $('.background').each(function(){
        if( $(this).children('img').height() < $(this).height() ){
            //$(this).children('img').css('right', ( $(this).children('img').width()/2 -  $(window).width())/2 );
            $(this).children('img').css('width', 'auto');
            $(this).children('img').css('height', '100%');
        }
    });

}
