const mongoose  = require("mongoose")

const directorSchema = new mongoose.Schema({
    name:{type:String,required:true, unique:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    awardCount:{type:Number,required:true},
    
})

const directorModel = mongoose.model("Director",directorSchema)

module.exports = directorModel;