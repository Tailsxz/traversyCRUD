const express =require('express');
const dotenv = require('dotenv');

// Loading the config for our environment variables
dotenv.config({ path: './config/config.env' });

//Initializing the express app server instance
const app = express();



//Binding our express server instance to the environment port
app.listen();