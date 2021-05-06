const mongoose = require('../database/db.js')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
        },
    post: {
        type: String,
        required: true,
        },
    postBy: {
        type: String,
        required: true,
        },
    date: {
        type: Date,
        default: Date.now
        }
    });

const model = mongoose.model('Schema', schema);

module.exports = model;

