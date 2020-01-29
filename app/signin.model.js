const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    username : String,
    email : String,
    password : String
},{
    timestamps : true
})

module.exports = mongoose.model('UserDetail',userSchema);