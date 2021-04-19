const schema = require('./../schemas/Project.js')

module.exports = app => {
    app.get('/', (req, res) => res.send('Servidor rodando'));

    app.post('/', (req, res) =>{
        console.log(req.body) 
        res.send('Você está realizando um POST')
    })

    app.post('/teste', (req,res) => {
        console.log('Método POST enviado pela /teste')
        res.send('Você enviou um POST pela página teste')
    })
}
