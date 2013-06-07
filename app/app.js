'use strict';
// npm install express express-hbs

var express = require('express');
var app = express();
var hbs = require('express-hbs');
var path = require('path');
var viewsDir = __dirname + '/views';

var graph = require('fbgraph');

app.configure('development', function() {
    app.use(express.bodyParser({ keepExtensions: true, uploadDir: './tmp/upload' }));
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    // Static
    app.use('/images',express.static(__dirname + '/images'));
    app.use('/styles',express.static(__dirname + '/styles'));
    app.use('/data',express.static(__dirname + '/data'));
    app.use('/templates',express.static(__dirname + '/templates'));
    app.use('/scripts',express.static(__dirname + '/scripts'));
    // use livereload middleware
    app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);

});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// Hook in express-hbs and tell it where known directories reside
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layout/default.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', viewsDir);


app.get('/', function(req, res) {
  res.render('content/index', {
    title: 'express-hbs example'
  });
});

app.get('/c/:image', function(req, res) {
    res.render('content/index', {
        title: req.params.image
    });
});


if (require.main === module) {
  app.listen(3000);
  console.log('Express server listening on port 3000');
}
else {
  module.exports = app;
}
