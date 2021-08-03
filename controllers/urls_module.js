const urlModel = require("../models/url.js");

//to create a new short url and add to the db
const createShort = async (url) => {
    const shortUrl = new urlModel({ full: url });
    const createdUrl = await shortUrl.save();
    if(!createdUrl) return {message: "unable to shorten url"};
    return createdUrl;
};

//to get a shortened url from the db
const getShort = async (shortUrl) => {
    const record = await urlModel.findOne({short: shortUrl});
    if(!record) throw new Error("URL does not exist...");
    return record;
};

//in case a user would like to modify his short url
const modifyShort = async (id, newShort) => {
    //check if currentUrl is valid/exists and update it
    const modifiedShort = await urlModel.findByIdAndUpdate(id, {short: newShort});
    if(!modifiedShort) throw new Error("Invalid url...");
    return await modifiedShort.save();   
}

const deleteShort = async (shortUrl) => {
    return await urlModel.findOneAndDelete({short: shortUrl});
};

module.exports = {
    createShort,
    getShort,
    modifyShort,
    deleteShort
}