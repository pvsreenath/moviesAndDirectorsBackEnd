// All the comments here are my understandings,  once you refer articles/analyze,
// you will get clear idea..
// modify if you find any comments if they can be/should be.

// Importing required modules express, mongoose for mongodb, cors, bodyParser

// impoting express js module. This provides all features to work with APIs EASILY
const express = require("express");
// refer an article for this body parser
const bodyParser = require("body-parser");
// this is for sharing resources across other domains. will share notes for this
const cors = require("cors");
// this is mongobd module
const mongoose = require("mongoose");

// importing routers which we have created to navigate
const routs = require("./routs/Routers");

// screating instance of express to use its features
const app = express();

// mongoDB connection:
// currently Using localhost mongo db database url,
// or you can create your mongo db account and you will have free db access upto 5 gb and use that url
const MONGO_URL = "mongodb://127.0.0.1:27017/exampleDb";
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// we use app.use() function to use any imported modules
app.use(bodyParser.json());
app.use(cors());
app.use("/", routs);

const port = 8090;

// Creating a server
app.listen(port, function () {
  console.log(`server is listening at ${port}`);
});
