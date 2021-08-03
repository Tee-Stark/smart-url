const userModel = require("../models/user.js");
const urlModel = require("../models/url.js");
const bcrypt = require("bcryptjs");

//add a url to a user's list of urls <only if it's a registered user>
const  addUrl = async (userId, urlId) => {
    const user = await userModel.findById(userId);
    if(!user) throw new Error("invalid request to add new url for non-existent user");
    await user.urls.push(urlId);
    return await user.save();
};
//to update user details
const updateUser = async (id, updates) => {
    if(updates.password){
        await bcrypt.hash(updates.password, 12, (err, hash) => {
            updates.password = hash;
        });
    }
    return userModel.findByIdAndUpdate(id, updates);
};

const deleteUser = async (id) => {
    return await userModel.findByIdAndDelete(id);
};

//to get all urls owned by a particular user
const getUrls = async (userId) => {
    const user = await userModel.findById(userId);
    const userUrls = await getUrlById(user.urls);
    if(!userUrls) return "No short URLs created yet"
    return userUrls;
}

//to get a shortened url by id
const getUrlById = async (id) => {
    return await urlModel.find({_id: id});
}

module.exports = {
    addUrl,
    updateUser,
    deleteUser,
    getUrls,
}