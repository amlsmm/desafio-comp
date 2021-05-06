const mongoose = require('../database/db.js');
const bcrypt = require('bcrypt');

const SchemaUsers = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass_token: {
        type: String,
        select: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

SchemaUsers.pre('save', function(next) {
    const salt = 8;
    bcrypt.hash(this.password, salt, (err, hash) => {
        if (err){
            console.log(err);
        }
        this.password = hash;
        next();
    });
});

const model = mongoose.model('Users', SchemaUsers);

module.exports = model;