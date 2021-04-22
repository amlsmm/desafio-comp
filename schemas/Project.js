const mongoose = require('../database/db.js')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
        },
    description: {
        type: String,
        required: true,
        },
    createdAt: {
        type: Date,
        default: Date.now
        }
    });

const model = mongoose.model('Schema', schema);

module.exports = model;

