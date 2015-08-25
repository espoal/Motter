Template.list.onCreated(function () {
    // Use this.subscribe inside onCreated callback
    this.subscribe("locations");
});

Template.list.helpers({
    locations: function () {
        return Locations.find();
    }
});