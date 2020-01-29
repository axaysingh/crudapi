const Users = require('./signin.model.js');
var sha256 = require('sha256');

//User register code
exports.create = (req,res) =>{
    if(!req.body){
        return res.status(400).send({
            message: "Feilds cannot reamin empty!"
        });
    }

    //register users
    const register = new Users({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : sha256(req.body.password)
    });

    //save the data to database
    register.save()
    .then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Something went wrong while insert in database!"
        });
    });
};

//code to fetch all users data
exports.fetchUser = (req,res) =>{
    Users.find()
    .then(user =>{
        res.send(user);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "Failed to fetch the data!"
        });
    });
}

//code to fetch user from username
exports.findUser = (req,res) => {
    Users.findById(req.params.username)
    .then(user => {
        if(!user){
            return res.status(404).send({
                message: "Username not found, with username " +req.params.username
            })
        }
        res.send(user);
    }).catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Username not found, with username " +req.params.username
            });
        }
        return res.status(500).send({
            message: "Somehting went wrong to find Username with " +req.params.username
        });
    })
}

//code to update the data
exports.updateUser = (req,res) => {
    if(!req.body){
        return res.status(400).send({
            message:"Field cannot be empty!"
        });
    }
    //code to find & update the data
    Users.findByIdAndUpdate(req.params.userId,{
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : sha256(req.body.password)
    },{new:true})
    .then(user =>{
        if(!user){
            return res.status(400).send({
                message:"User not found with Id: " +req.params.userId
            })
        }
        res.send(user);
    })
    .catch(err =>{
        if(err.kind === 'ObjectId' ){
            return res.status(400).send({
                message:"User not found with Id: " +req.params.userId
            })
        }
        return res.status(500).send({
            message: "Somehting went wrong to find Username with " +req.params.userId
        })
    })
}

//code to delete the data
exports.deleteUser = (req,res) => {
    if(!req.body){
        return res.status(400).send({
            message:"Field cannot be empty!"
        });
    }
    //code to find & update the data
    Users.findByIdAndRemove(req.params.userId)
    .then(user =>{
        if(!user){
            return res.status(400).send({
                message:"User not found with Id: " +req.params.userId
            })
        }
        res.send({message: "User deleted successfully!"});
    })
    .catch(err =>{
        if(err.kind === 'ObjectId' ){
            return res.status(400).send({
                message:"User not found with Id: " +req.params.userId
            })
        }
        return res.status(500).send({
            message: "Somehting went wrong to find Username with " +req.params.userId
        })
    })
}