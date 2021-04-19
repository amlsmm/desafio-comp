const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/teste',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    });
    mongoose.Promise = global.Promise;

    return mongoose;
}