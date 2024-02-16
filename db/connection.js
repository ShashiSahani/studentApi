const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/studentsapi',{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    serverSelectionTimeoutMS: 5000,
}).then(()=>{
    console.log("connected to MongoDB")
}).catch((e)=>{
    console.log("Not connected to Database",e)
})