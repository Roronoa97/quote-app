const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    profilename: {
        type: String,
        required:true
    },
    nickname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        min: 6,
        required: true
    },
    followers:[], 
    following: [],
    quoteList: [{
        type:mongoose.Schema.Types.ObjectId,
    }],
},{ timestamps: true });

module.exports = mongoose.model('users', UserSchema);