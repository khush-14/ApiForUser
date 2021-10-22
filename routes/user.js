const express = require('express');
const router = express();
const mongorequest = require('./datafetch');

router.get('/',mongorequest.getAllUsers);

router.post('/',mongorequest.addUser);

router.get('/userput/:id',mongorequest.updateUser);

router.get('/userdelete/:id',mongorequest.deleteUser);

module.exports = router;