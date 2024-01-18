const mongoose = require('mongoose');

//Connecting to our DB using mongoose, mongoose.connect() will return a promise therefore we will make this function async and consume the returned promise within this async function. Could use promise chains, but let's get more practice with the beautiful async await syntactic sugar!
const connectDB = async() => {
  try {
    //The actual connection, first argument is the environment variable holding the mongoDB connection string, second is an options object, which traversy used but is not required anymore, therefore we will omit it. The options object he used will be commented below.
    const connection = await mongoose.connect
    (process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    //Tells node to terminate the process in the event we run into an error with the code specified as an argument here it is 1 which will exit the process with a failure code.
    process.exit(1);
  }
}

module.exports = connectDB;

// {  
    //These options are set by default now.
//   useNewUrlParser:true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// }