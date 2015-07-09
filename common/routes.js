Router.route('/', function () {
    this.layout('mainLayout');
    this.render('aboutUs');
});


Router.route('/real', function () {
    this.layout('mainLayout');
    this.render('realEstate');
});

