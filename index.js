const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require('mongoose')

const routs = require("./routs/Routers")

const app = express();

const MONGO_URL = 'mongodb+srv://sreenath:7477@cluster0.kabfb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json());
app.use(cors())
app.use('/',routs);


const port = process.env.PORT || 8090;

app.listen(port,function(){
    console.log(`server is listening at ${port}`)
})
