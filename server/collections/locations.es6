Meteor.startup(function(){
    if ( Locations.find().count() === 0 ) {

        Locations.insert({
            "id": 2,
            "submitted": new Date(),
            "category": "real_estate",
            "title": "Doppia Femminile",
            "location": "Corso Lodi 11",
            "latitude": 45.466740,
            "longitude": 9.223510,
            "url": "/rentals/1",
            "type": "Apartment",
            "type_icon": "/icons/real-estate/apartment-3.png",
            "gallery": [
                "/images/rentals/1/1.jpg",
                "/images/rentals/1/2.jpg",
                "/images/rentals/1/3.jpg",
                "/images/rentals/1/4.jpg",
                "/images/rentals/1/5.jpg",
                "/images/rentals/1/6.jpg",
                "/images/rentals/1/7.jpg",
            ],
            "features": [
                "Air Conditioning",
                "WiFi",
                "Balcony",
                "Bedding",
                "Cable TV",
                "Dishwasher",
                "Family Room",
                "Fireplace",
                "Grill",
                "Outdoor Kitchen",
                "Sauna",
                "Trees and Landscaping"
            ],
            "price": "350.00",
            "featured": 0,
            "color": "red",
            "special_offer": 0,
            "item_specific": {
                "bedrooms": 2,
                "bathrooms": 2,
                "rooms": 4,
            },
            "description": "Questo e' un appartamento esclusivamente femminile"
        });

        Locations.insert({
            "id": 1,
            "submitted": new Date(),
            "category": "real_estate",
            "title": "Doppia Femminile",
            "location": "Viale Campania 45",
            "latitude": 45.466740,
            "longitude": 9.223510,
            "url": "/rentals/1",
            "type": "Apartment",
            "type_icon": "/icons/real-estate/apartment-3.png",
            "gallery": [
                "/images/rentals/1/1.jpg",
                "/images/rentals/1/2.jpg",
                "/images/rentals/1/3.jpg",
                "/images/rentals/1/4.jpg",
                "/images/rentals/1/5.jpg",
                "/images/rentals/1/6.jpg",
                "/images/rentals/1/7.jpg",
            ],
            "features": [
                "Air Conditioning",
                "WiFi",
                "Balcony",
                "Bedding",
                "Cable TV",
                "Dishwasher",
                "Family Room",
                "Fireplace",
                "Grill",
                "Outdoor Kitchen",
                "Sauna",
                "Trees and Landscaping"
            ],
            "price": "350.00",
            "featured": 0,
            "color": "red",
            "special_offer": 0,
            "item_specific": {
                "bedrooms": 2,
                "bathrooms": 2,
                "rooms": 4,
            },
            "description": "Questo e' un appartamento esclusivamente femminile"
        });

    }

});


Meteor.publish('locations', function() {
    return Locations.find();
});

Meteor.methods({
    itemSubmit: function(itemAttributes) {

        check(itemAttributes, {
            title: String,
            url: String
        });

        var item = _.extend(itemAttributes, {
            submitted: new Date()
        });
        var itemId = Locations.insert(item);
        return {
            _id: itemId
        };
    },
    itemUpdate: function(itemAttributes) {

        check(itemAttributes, {
            title: String,
            url: String
        });

        var item = _.extend(itemAttributes, {
            submitted: new Date()
        });
        var itemId = Locations.update(item);
        return {
            _id: itemId
        };
    }
});