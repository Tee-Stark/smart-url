const userModel = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config.js');

const createUser = async (user) => {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    const newUser = new userModel({
        name: user.name,
        email: user.email,
        password: user.password
    });
    const createdUser = await newUser.save();
    try{
        return {
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        token: generateToken(createdUser),
        message: 'Welcome! account successfully created...'
        };
    }
    catch(err) { return err; } 
};

const login = async (email) => {
    const validUser = await userModel.findOne({email: email});
    if(!validUser) throw new Error("invalid email address...User not found");
    return validUser;
};

const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    const secret = config.JWT_SECRET;
    const options = { expiresIn: '5m'};
    return jwt.sign(payload, secret, options);
};

module.exports = {
    createUser,
    login,
    generateToken
}