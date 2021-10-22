const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:'active'
    }
})

const user = mongoose.model('userofrestapi',UserSchema);
module.exports = user;
