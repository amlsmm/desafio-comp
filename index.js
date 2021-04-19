const customExpress = require('./config/customExpress.js')

const app = customExpress()

const porta = 3000;

app.listen(porta, () => {
    console.log(`Servidor rodando. \nPorta:${porta}`)
});

