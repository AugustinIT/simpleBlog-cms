var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Initializing the app
var app = express();
var port = process.env.PORT || 1337;

// Including the routes
var singlePost = require('./routes/singlePost');
var aboutRoute = require('./routes/aboutRoute');
var homeRoute = require('./routes/homeRoute');
var adminRoute = require('./routes/adminRoute');

// Setting up the template engine
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
	secret: "simpleBlog",
	resave: true,
	saveUninitialized: true
}));

// Including the Passport config
require('./config/passport')(app);


// Route middleware
app.use('/post', singlePost);
app.use('/about', aboutRoute);
app.use('/admin', adminRoute);
app.use('/', homeRoute);

// Listening settings
app.listen(port, function() {
	console.log('App starting...');
	console.log('Listening on port ' + port);
});