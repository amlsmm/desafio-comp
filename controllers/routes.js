const model = require('../schemas/Project.js');
const users = require('../schemas/users.js');
const jtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth.js');


const schema = model;

module.exports = app => {
    app.get('/', auth, (req, res) => {
        schema.find()
            .then(datas => {
                res.send(datas);
            })
            .catch(error => {
                console.error(error);
                res.status(400).send({error: 'Não foi possível abrir seu DB'})
            })
    });

    app.post('/', auth, (req, res) =>{
        const {title,description} = req.body;
        schema.create({title,description})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                console.error(error)
                res.status(400).send({error: 'Não foi possivel salvar'})
            })
    })

    app.get('/id/:ID', auth, (req, res) => {
        schema.findById(req.params.ID)
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                console.error(error);
                res.status(400).send({error: 'Não foi possível encontrar esse ID.'});
            })
    });

    app.put('/edit/id/:ID', auth, (req,res) => {
        const {title,description} = req.body;   
        schema.findByIdAndUpdate(req.params.ID,{title,description}, {new:true})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                console.error(error);
                res.status(400).send({error:'Não foi possível atualizar'});
            });
    });

    app.delete('/delete/id/:ID', auth, (req,res) => {
        schema.findByIdAndDelete(req.params.ID)
            .then( () => {
                res.send('Removido com sucesso');
            })
            .catch(error => {
                console.error(error);
                res.status(400).send({error:'Não foi possível remover'});
            })
    })

    
    app.post('/register', (req,res) => {
        const {user,email,password} = req.body;
        users.findOne({email})
            .then(data => {
                if(data){
                    res.status(400).send({error:'Esse email já está cadastrado'});
                } else {
                    users.create({user, email, password}).then(users => {
                        res.send({users});
                    }).catch(error => {
                        console.error(error);
                        res.status(400).send({error: 'Falha registro'});
                    })
                }          
            })
            .catch(error => {
                console.error(error);
                res.status(400).send({error: 'Não foi possível cadastrar'});
            });
    })

    app.post('/login', (req,res) => {
        const {email, password} = req.body;
        users.findOne({email})
            .then(data => {
                if(bcrypt.compare(password,data.password)){
                    const token = jtoken.sign({id:data.id}, 'lçaklsd@@@---aklsdlas163dlwm,',{expiresIn:172800});
                    res.send({token: token});
                }else{
                    res.status(404).send('Senha incorreta.');
                    }
            })
            .catch(error => {
                console.error(error);
                res.status(400).send({error: 'Email não encontrado'});
            });
    })

    app.post('/new-password', (req,res) => {
        const {email} = req.body;
        users.findOne({email})
            .then(data => {
                if(data){
                    const mailtoken = jtoken.sign({id:data.id}, 'askld12@-,',{expiresIn:9000});
                    
                }else{
                    res.status(404);
                }
        })
            .catch(error => {
                console.error(error);
                res.status(400).send({error: 'Erro.'});
            })
    })

};
