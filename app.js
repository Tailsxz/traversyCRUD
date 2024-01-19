const express =require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
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

//Setting up our port to be either the environment variable PORT or if it doesn't exist use 3000
const PORT = process.env.PORT || 3000;


//Binding our express server instance to the environment port
app.listen(PORT, console.log(`The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));