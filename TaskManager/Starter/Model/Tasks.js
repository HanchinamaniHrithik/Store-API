const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({name:String, completed:Boolean})

module.exports= (mongoose.model('Task',taskschema)) 