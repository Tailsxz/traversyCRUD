const express =require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//
const { engine:expressHandlebars } = require('express-handlebars');
const connectDB = require('./config/db.js');

// Loading the config for our environment variables
dotenv.config({ path: './config/config.env' });

//Calling the connectDB() we exported from db.js to connect to the database.
connectDB();

//Initializing the express app server instance
const app = express();

//Here we are using the morgan middleware only if the current env variable NODE_ENV is equal to development, indicating that we are running our server in development mode with nodemon. This is so we only use morgan(a request logger middleware) in development mode.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Setting up our view engine, which we will be using handlebars as the template engine in this project, brought in by the express-handlebars package.

//Using app.engine() we will specify that any files with the extension hbs will be processed by the Handlebars template engine, passing into it the expressHandlebars factory function and an optional configs object. This will produce the engine() function being registered for this file extension.
app.engine('.hbs', expressHandlebars({ defaultLayout: 'main' ,extname: '.hbs' }));
//With the set method of the app, we can specify settings for our server. We can set really any key value pair we want, but there are certain names when set, like 'view engine' below, which can be used to configure specific behaviors of our express server.
app.set('view engine', '.hbs');
//for custom settings, one that is not on the predefined list of configurable settings, we can access the value by passing in the name as an argument to a app.get() call.

//Connecting to all of our routers
app.use('/', require('./routes/index'));

//Setting up our port to be either the environment variable PORT or if it doesn't exist use 3000
const PORT = process.env.PORT || 3000;


//Binding our express server instance to the environment port
app.listen(PORT, console.log(`The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));