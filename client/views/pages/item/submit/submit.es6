Template.itemSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var item = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('itemSubmit', item, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
            FlowRouter.go('home');
        });
    }
});
