const express = require('express');
const app = express();
const path = require('path');
const user = require('./routes/user');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const PORT =  process.env.PORT || 3000 ;


// DB config
const db = require('./config/keys').MongoUri;

//connect
mongoose.connect(db,{useNewUrlParser: true})
  .then(()=> console.log("monogoose is connected"))
  .catch(err => console.log(err));



// start ejs
app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/',user);

app.listen(PORT,(req,res)=>{
    console.log('server started on localhost://');
});