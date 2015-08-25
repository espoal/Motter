Template.itemUpdate.events({
    'submit form': function(e) {
        e.preventDefault();

        var item = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('itemUpdate', item, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
            FlowRouter.go('home');
        });
    }
});

Template.itemUpdate.helpers({
    rental: function () {

        var rentId = parseInt( FlowRouter.getParam('rentId'));
        var rental = Locations.findOne({id:  rentId  }) || {};
        return rental;
    }
});