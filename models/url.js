const mongoose = require('mongoose');
const shortId = require('shortid');
const uniqueValidator = require('mongoose-unique-validator');

const urlSchema = mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        default: `tim.ly/${shortId.generate()}`,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    }
    },
    {
    timestamps: true
});
mongoose.plugin(uniqueValidator, {message: "is already taken"});

module.exports =  Urls = mongoose.model('Urls', urlSchema);