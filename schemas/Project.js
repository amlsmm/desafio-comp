const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/testeDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
    });

mongoose.Promise = global.Promise;

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

