const mongoose  = require("mongoose")

const movieSchema = new mongoose.Schema({
    name:{type:String,required:true, unique:true},
    id:{type:String,required:true},
    boxOfficeCollection:{type:Number,required:true},
    rating:{type:Number,required:true},
    directors:{type:Array,required:true}
})

const movieModel = mongoose.model("Movie",movieSchema)

module.exports = movieModel;