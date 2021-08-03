const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {type: String, required: true},
    urls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Urls',
    }]
    },
    {
        timestamps: true
    }
);

mongoose.plugin(uniqueValidator, "user already exists");
module.exports = Users = mongoose.model('Users', userSchema);