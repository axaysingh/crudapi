module.exports = (app) =>{
    const user = require('./users.controller.js');

    // Create a new users
    app.post('/user', user.create);

    //fetch all users
    app.get('/fetchUser',user.fetchUser);

    //fetch user from username
    app.get('/findUser/:username',user.findUser);

    //code to update user details
    app.put('/updateUser/:userId',user.updateUser);

    //code to delete the user
    app.delete('/deleteUser/:userId',user.deleteUser);
}