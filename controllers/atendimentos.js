const model = require('../schemas/Project.js');

const schema = model;

module.exports = app => {
    app.get('/', (req, res) => res.send('Servidor rodando'));

    app.post('/', (req, res) =>{
        const {title,description} = req.body;
        schema.create({title,description})
            .then(project => {
                res.status(200).send(project);
            })
            .catch(error => {
                console.error('Erro ao salvar no DB')
                res.status(400).send({error: 'Não foi possivel salvar'})
            })
    })

    app.post('/teste', (req,res) => {
        console.log('Método POST enviado pela /teste')
        res.send('Você enviou um POST pela página teste')
    })
}
