const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testeDB',{
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
        .then( () => {
            console.log('Conectado ao DB');
        })
        .catch( err => {
            console.log(err);
            console.log('Erro ao conectar no DB');
        })

module.exports = mongoose;