const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers: require("./utils/helpers") });

// Creates express app and sets port
const app = express();
const PORT = process.env.PORT || 3001;

// Setting up session object with cookie, store and secret
const sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};

// Using session middleware with object
app.use(session(sess));

//Parsing url-encoded data and JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serving static files from public
app.use(express.static("public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");