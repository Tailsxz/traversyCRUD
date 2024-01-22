//bringing in path to be able to call the join() method
const path = require('path');
//bringing in express to create our server
const express =require('express');
//bringing in cors to automagically setup cors headers for our server, CKEDITOR was running into cors errors.
const cors = require('cors');
//bringing in mongoose to be able to grab the current connection
const mongoose = require('mongoose');
//allows us to use enviroment variables
const dotenv = require('dotenv');
//Morgan request logger! Very useful!
const morgan = require('morgan');
const passport = require('passport');
//express session allows us to create sessions for each of our users
const session = require('express-session');
//We are storing the sessions into our database, which is done by passing session into connect-mongo
const MongoStore = require('connect-mongo');

//bringing in the handlebars template engine, aliasing it with expressHandlebars
const { engine:expressHandlebars } = require('express-handlebars');
//
const connectDB = require('./config/db.js');

// Loading the config for our environment variables
dotenv.config({ path: './config/config.env' });

//Setting up the Passport config, passing in the passport module into this file
require('./config/passport')(passport);

//Calling the connectDB() we exported from db.js to connect to the database.
connectDB();

//Initializing the express app server instance
const app = express();

// Bringing in the urlencoded(for POST form data)/json body parser middleware, built into express now :D
//option of extended: false, uses the querystring library to parse the urlencoded data rather than the qs library.
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Initializing cors middleware;
app.use(cors());


//Here we are using the morgan middleware only if the current env variable NODE_ENV is equal to development, indicating that we are running our server in development mode with nodemon. This is so we only use morgan(a request logger middleware) in development mode.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Setting up our view engine, which we will be using handlebars as the template engine in this project, brought in by the express-handlebars package.

//Using app.engine() we will specify that any files with the extension hbs will be processed by the Handlebars template engine, passing into it the expressHandlebars factory function and an optional configs object. This will produce the engine() function being registered for this file extension.
//Here we see that when we call this function a function with the description [Function: bound renderView] is produced.
// console.log(expressHandlebars());
//It essentially is the callback that will be executed to process any files we are rendering with the .hbs extension
app.engine('.hbs', expressHandlebars({ defaultLayout: 'main' ,extname: '.hbs' }));
//With the set method of the app, we can specify settings for our server. We can set really any key value pair we want, but there are certain names when set, like 'view engine' below, which can be used to configure specific behaviors of our express server.
//Here we set the view engine setting, to default to .hbs, so that when we call res.render() without specifying an extension, it is automagically assumed to be one ending in .hbs
app.set('view engine', '.hbs');
//for custom settings, one that is not on the predefined list of configurable settings, we can access the value by passing in the name as an argument to a app.get() call.

//Setting up the Sessions middleware
app.use(session({
  //Secret that is used to sign the session cookie
  secret: 'zjww83k1kl4bu15059xad32',
  //Don't resave a session if nothing has been modified
  resave: false,
  //Don't create a session until something is stored
  saveUninitialized: false,
  //here we are specifying our session store, which is setup with connect mongo, we specify in the options object the current mongoose connection accessed as a property on the mongoose object
  // store: new MongoStore({ mongooseConnection: mongoose.connection }) wow! Lets go we just debugged the issue with this video being so outdated, it seems from before accessing mongoose.connection gave the connection string directly, but now upon logging what mongoose.connection gave, it gave a huge object with all the connection details, from which we are now only accessing the connection string. Resetted server and now have working persisting sessions!!!!
  store: MongoStore.create({ mongoUrl: mongoose.connection._connectionString })
}));
// Setting up the Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting up the static express middleware which will define routes for static files we want to serve automatically. We will be serving from the public directory existing in the current directory. We can use the path core module to form the full path by referencing __dirname(current directory) and joining it with public
app.use(express.static(path.join(__dirname, 'public')))

//Connecting to all of our routers
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

//Setting up our port to be either the environment variable PORT or if it doesn't exist use 3000
const PORT = process.env.PORT || 3000;


//Binding our express server instance to the environment port
app.listen(PORT, console.log(`The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));