const express = require("express");
/**
 * Generaaly Schema is used define structure/type for the Objects we use in the backend/Database
 * we will create model from that schema and use that from DB operation for that particular Object(Route,
 * here for example we working with Movies and Directors.
 * so we need to create one scheme for Movies and one for Director)
 */

// have created all the schemas inside model folder and routers inside routs folder
// to maintian proper folder structure

// importing Movie Schema
const Movie = require("../model/movie");
// importing Director Schema
const Director = require("../model/director");

// creating Router instance for routing fetatures
const route = express.Router();

//********** movies APIs*************************************** */

/**
 * There are mainly 4 types of Requests
 * 1.GET --> Used to fetch the existing data
 * 2.POST --> Used to insert the new data into DB
 * 3.PUT -- > Used to update the existing record.
 * 4.DELETE --> Used to delete the data
 */

//---------------GET Movie API start------------------------------
// we use async and await concept for handling asynchronous operations like fetching/woking with Database

route.get("/movies", async function (req, res) {
  try {
    /* Here we have asynchronous operation(generally it means when there is an orpation which takes some time). 
       which is fetcing data from the database. so we indicate to the program by using await keyword.
       so the program flow will continue here once we get the data from the DB
    */
    const movies = await Movie.find();
    // returing the response
    // .json() formats the db response to json objects
    res.json(movies);
    // if you want to return error resonse based on your validations
    // you can do here like how i did inside catch block
  } catch (err) {
    // Generally if anything goes wrong we will send error resonse here based the the error object
    // we received in the catch block
    res.status(400).json({ errMsg: err.message });
  }
  /**
   * And hey!!! why the async keyword???
   *
   * wait mannn!!!
   *
   * whenever we do asysnchronous oprations, we use await keyword, right?
   * So if you are going to use await inside any function, we just need to mention that
   * function as asynchronuos function by async keyword
   */
});

//----------------POST Movie API start-----------------------------------//
// we will get a input data means whatever the movie user wants to create
// it will be sent over req.body object here.
route.post("/movies", async function (req, res) {
  try {
    let movie = new Movie();
    // Getting the sent data through req.body and setting it to our object and storing in DB
    movie.name = req.body.name;
    movie.id = req.body.id;
    movie.boxOfficeCollection = req.body.boxOfficeCollection;
    movie.rating = req.body.rating;
    movie.directors = req.body.directors;
    // storing the data, aware of the mongo db oprations
    await movie.save();
    // You can add any business logics/validations here
    res.json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//----------------POST Movie API end-----------------------------------//
/**
 * Hold on....
 *
 * To work with PUT or DELETE.. we need unique property of the record for which user wants to update
 * it will be sent throught router parameter
 * for example :name is the parameter we specified here
 * so if anything sent after /movies in the route it will be considered as movie name
 * example: movies/salaar
 * movies/kgf
 * movies/bahubali
 *
 * you can use any unique property here like id,name ets..
 * i have used name here
 */
//----------------PUT Movie API start-----------------------------------//
route.put("/movies/:name", async function (req, res) {
  try {
    // This is how we will get the parameter sent over the router
    const name = req.params.name;
    // updating record
    res.json({ message: "success" });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
});
//----------------PUT Movie API end-----------------------------------//

//----------------DELETE Movie API start-----------------------------------//
// here i have used id as unique parameter to delete the movie
// ex: movies/1
// movies/2
route.delete("/movies/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await Movie.deleteOne({ id: id });
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(400).json({ errMsg: err.message });
  }
});
//----------------DELETE Movie API end-----------------------------------//

//=========================================================================//

/**
 * Below are the other APIs which i used for the sample project, you can refer for more understanding
 */
route.get("/directors", async function (req, res) {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (err) {
    res.status(400).json({ errMsg: err.message });
  }
});
route.post("/directors", async function (req, res) {
  try {
    let director = new Director();
    director.name = req.body.name;
    director.age = req.body.age;
    director.gender = req.body.gender;
    director.awardCount = req.body.awardCount;

    await director.save();
    res.json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

route.get("/directors/:name", async function (req, res) {
  try {
    const name = req.params.name;
    console.log(name);
    let movies = await Movie.find({ directors: [name] });
    res.json(movies);
  } catch (err) {
    res.json({ errMsg: err.message });
  }
});

route.get("/directors/details/:name", async function (req, res) {
  try {
    const name = req.params.name;
    console.log(name);
    let directorDetails = await Director.findOne({ name: name });
    res.json(directorDetails);
  } catch (err) {
    res.json({ errMsg: err.message });
  }
});

route.put("/directors/:name", async function (req, res) {
  try {
    const name = req.params.name;

    await Director.updateOne({ name: name }, { $set: req.body });
    res.json({ message: "success" });
  } catch (err) {
    res.json({ errMsg: err.message });
  }
});

//This is how we export our modules,so these will be imported in other files and used
module.exports = route;
