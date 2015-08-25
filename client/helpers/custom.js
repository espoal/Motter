Meteor.startup(function(){
    if (!GoogleMaps.loaded()) {
        console.log('Loading GoogleMaps...');
        GoogleMaps.load();
        GoogleMaps.loadUtilityLibrary('/js/richmarker.js');
        GoogleMaps.loadUtilityLibrary('/js/infobox.js');
    }
});