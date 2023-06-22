const User = require('../models/User');
const Customer = require('../models/Customer');
const createUser = async (username, password) => { // User Creation
    const user = new User({
        username : username,
        password : password
    });
    if(username === "admin" && password === "admin"){
        user.isAdmin = true;
    }
    return await User.save();
};
const getUserById = async (id) => {
    return await User.findById(id);
};
// --------------------------ONLY FOR ADMINS!!------------------------
const getAllUsers = async () => { 
    return await User.find({});
};
const updateUser = async (id, username , password) => { // for no change pass null values!
    const User = await getUserById(id);
    if (!User)
        return null;
    if(usernmae !== null){
        User.username = username;
    }
    if(password !== null){
        User.password = password;
    }
    await User.save();
    return User;
};
const deleteUser = async (id) => {
    const User = await getUserById(id);
    if (!User)
        return null;
 // TODO :: DELETE CUSTOMER BY ID (SAME ID)
    await User.remove();
    return User;
};
module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
}