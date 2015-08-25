FlowRouter.route('/', {
    name: 'home',
    action: function() {
        BlazeLayout.render('mainLayout');
    }
});

FlowRouter.route('/list', {
    name: 'list',
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'list'} );
    }
});

FlowRouter.route('/rentals/:rentId', {
    name: 'rental',
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'item'});
    }
});

FlowRouter.route('/rentals/edit/:rentId', {
    name: 'itemEdit',
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'itemUpdate'});
    }
});


FlowRouter.route('/submit', {
    name: 'submit',
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'itemSubmit'});
    }
});

