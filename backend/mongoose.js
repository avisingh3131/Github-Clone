var mongoose=require("mongoose");

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Note_Todo_App');//to connect with the mongodb

module.exports={mongoose};