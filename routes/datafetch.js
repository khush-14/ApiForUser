const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/keys').MongoUri;
const User = require('../models/users');


const client = new MongoClient(url);

exports.getAllUsers = async (req,res) =>{
    try {
        const users = await User.find().exec();
        res.render('dashboard',{
            users
        })
    }catch(err){
        console.log(err);
    }
}

exports.addUser = async (req,res) =>{
    const {name,date,status} = req.body;
    const errors = [];
    const users = await User.find().exec();
    if(name=="" || date==""){
        errors.push({msg : 'please insert all the fields'});
    }
    if(errors.length >0){
        res.render('dashboard',{
            errors,
            users,
            name,
            date,
            status
        })
    }
    else{
        User.findOne({date:date , name:name}).
        then(user =>{
            if(user){
                errors.push({msg : 'User already exist'});
                res.render('dashboard',{
                    errors,
                    users,
                    name,
                    date,
                    status
                })
            }
            else{
                const obj = req.body;
                users.push(obj);
                const newUser = new User({
                    name,
                    date,
                    status
                });
                newUser.save().then( 
                    res.redirect('/')
                ).catch( err =>console.log(err));

            }
        });
    }
}

exports.updateUser = async (req,res) =>{
    try{
        const id = req.params.id;
        
        const update_user =await User.findByIdAndUpdate(id,req.body,{new:true},function(err,model){
            if(err){
                console.log(err);
            }
            else{
                console.log(model.status);
                if(model.status === "active")
                model.status = "pending";
                else
                model.status = "active";

                model.save();
            }
        }).clone();
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
}

exports.deleteUser = async (req,res) =>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
}