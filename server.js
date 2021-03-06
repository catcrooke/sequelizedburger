var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing (middleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// changes methods in forms from posts to puts
app.use(methodOverride('_method'));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// shortcut to file system
app.use(express.static('public'));

// Import routes and give the server access to them.
var routes = require("./controllers/burger_controller.js")(app);

// sequelize is syncing to the database and then..
db.sequelize.sync().then(function() {
    // Starts the server to begin listening
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
