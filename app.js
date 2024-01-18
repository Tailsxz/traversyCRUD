const express =require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Loading the config for our environment variables
dotenv.config({ path: './config/config.env' });

connectDB();

//Initializing the express app server instance
const app = express();

//Setting up our port to be either the environment variable PORT or if it doesn't exist use 3000
const PORT = process.env.PORT || 3000;


//Binding our express server instance to the environment port
app.listen(PORT, console.log(`The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));