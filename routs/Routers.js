const express = require("express");

const Movie = require("../model/movie")

const Director = require("../model/director")

const route = express.Router()


route.get("/directors",async function(req,res){
    try{
        const directors = await Director.find(); 
        res.json(directors);
    }catch(err){
        res.status(400).json({errMsg:err.message})
    }
})
route.post("/directors", async function(req,res){
    try{
        
        let director = new Director()
        director.name=req.body.name;
        director.age=req.body.age;
        director.gender=req.body.gender;
        director.awardCount=req.body.awardCount;
        
        await director.save();
        res.json({message:"success"})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

route.get("/directors/:name", async function(req,res){
    
    try{
       
       const name = req.params.name;
       console.log(name)
       let movies = await Movie.find({directors:[name]})
       res.json(movies)
     
    }
    catch(err){
        res.json({errMsg:err.message})
    }
    

})

route.get("/directors/details/:name", async function(req,res){
    
    try{
       
       const name = req.params.name;
       console.log(name)
       let directorDetails = await Director.findOne({name: name})
       res.json(directorDetails)
     
    }
    catch(err){
        res.json({errMsg:err.message})
    }
    

})

route.put("/directors/:name", async function(req,res){
    
    try{
       
       const name = req.params.name;

       await Director.updateOne({"name": name},{$set :req.body})
       res.json({message:"success"})
    }
    catch(err){
        res.json({errMsg:err.message})
    }
    

})

route.get("/movies",async function(req,res){
    try{
        const movies = await Movie.find(); 
        res.json(movies);
    }catch(err){
        res.status(400).json({errMsg:err.message})
    }
})


route.post("/movies", async function(req,res){
    try{
        
        let movie = new Movie()
        movie.name=req.body.name;
        movie.id=req.body.id;
        movie.boxOfficeCollection=req.body.boxOfficeCollection;
        movie.rating=req.body.rating;
        movie.directors=req.body.directors
        
        const director = await Director.findOne({name:movie.directors[0]}); 
        if(!director){
            res.json({error:"unknown director"})
        }
        else{
            await movie.save();
            res.json({message:"success"})
        }
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

route.delete("/movies/:name", async function(req,res){
    try{
        const name = req.params.name
        await Movie.deleteOne({name:name});
        res.json({message:"deleted"})
    }
    catch(err){
        res.status(400).json({errMsg:err.message})
    }
})





module.exports = route;