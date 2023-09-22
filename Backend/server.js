 const express=require('express');
const app=express();
const PORT=process.env.PORT || 5000;
const cors=require('cors');
const mongoose=require('mongoose');
const userRoutes = require('./routes/users');
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

const mongoURI='mongodb+srv://amanaigole9167:Aman@123@cluster0.e4qjctp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI,{
    useNewUrlParser:true,//tells mongoose to use new url parser when connecting to mongodb
    useUnifiedTopology:true,//enables mong to use new server discovery and monotoring engine
    // useFindAndModify:false,//to prevent warnings
    // useCreateIndex:true//tells mongoos to use createIndex() method when defining indexxes on your mongoDB schemas,indexes are essential for optimizing query performance in mongodb
    //useFindAndModify and useCreateIndex are not supported. These options are commonly used with Mongoose, a MongoDB library for Node.js, but they are no longer supported in newer versions of Mongoose.
});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDb connection error:'));
db.once('open',()=>{console.log('Connected to MongoDB')});



app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});