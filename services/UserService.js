const User = require('../models/UserModel');

const createUser = async (username, password) => { // User Creation
    const user = new User({
        Username : username,
        Password : password
    });
    if(username === "admin" && password === "admin"){
        user.isAdmin = true;
    }
    const existsUser = await User.find({Username : username})
    if(existsUser){ // if user is undefined/null/false etc
        return await user.save();
    }
    return null;
};
const getUserByUsernameAndPassword = async (username, password) => { 
    return await User.findOne({Username: username, Password: password});
};
const getUserById = async (id) => {
    return await User.findById(id);
};
// --------------------------ONLY FOR ADMINS!!------------------------
const getAllUsers = async () => { 
    return await User.find({});
};
const updateUser = async (id, username , password) => { // for no change pass null values!
    const user = await getUserById(id);
    if (!User)
        return null;
    if(usernmae !== null){
        user.username = username;
    }
    if(password !== null){
        user.password = password;
    }
    await user.save();
    return user;
};
const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user)
        return null;
 // TODO :: DELETE CUSTOMER BY ID (SAME ID)
    await user.remove();
    return user;
};
module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    getUserByUsernameAndPassword,
    updateUser,
    deleteUser
}