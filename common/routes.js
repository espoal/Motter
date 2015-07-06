Router.route('/about_us', function () {
    this.render('about_us');
});

Router.route('/', function () {
    this.render('about_us');
});

Router.route('/real', function () {
    this.render('real_estate');
});