const mongoose = require('mongoose');
const User = require('../models/users');
const userist = document.getElementById('userList');
function intialize(){
    
//     getAllUsers = async (req,res)=>{
//     try{
//         const users = await User.find();
//         UpdateList(users);
//     }
//     catch(err){
//         res.status(400).json({
//             status:'fail',
//             message : err
//         })
//     }
// }
}
function UpdateList(users){
    users.forEach(user => {
        let User = document.createElement('div');
        User.setAttribute('id','userdetails');
        let name = document.createElement('div');
        name.setAttribute('id','name');
        let date = document.createElement('div');
        date.setAttribute('id','date');
        let status = document.createElement('button');
        status.setAttribute('id','status');
        name.innerHTML = user.name;
        date.innerHTML = user.date;
        status.innerHTML = user.status;
        User.appendChild(name,date,status);
        userList.appendChild(User);
    });
}

const btn = document.getElementById('add');
btn.addEventListener('click',()=>{
    
    const users = await User.find();
    UpdateList(users);
    console.log('inside');
})