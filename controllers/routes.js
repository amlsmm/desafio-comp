const model = require('../schemas/Posts.js');
const users = require('../schemas/users.js');
const jtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../config/auth.js');
const transport = require('../config/mail.js');

const schema = model;

module.exports = app => {
    app.get('/', auth, (req, res) => {
        schema.find()
            .then(datas => {
                res.send(datas);
            })
            .catch(error => {
                console.error(err);
                res.status(400).send({err: 'Não foi possível abrir seu DB'})
            })
    });

    app.post('/', auth, (req, res) =>{
        const {title,post} = req.body;
        const author = req.id;
        users.findById(author)
            .then( user => {
                const postBy = user.user;
                schema.create({title,post,postBy})
                    .then(data => {
                        res.status(200).send(data);
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(400).send({err: 'Não foi possivel salvar'});
                    })
            })
            .catch(err => {
                console.error(err);
                res.status(400).send('Erro');
            })
    });

    app.get('/id/:ID', auth, (req, res) => {
        schema.findById(req.params.ID)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({err: 'Não foi possível encontrar esse ID.'});
            })
    });

    app.post('/edit/id/:ID', auth, (req,res) => {
        const {title,post} = req.body;   
        schema.findByIdAndUpdate(req.params.ID,{title,post}, {new:true})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({err:'Não foi possível atualizar'});
            });
    });

    app.delete('/delete/id/:ID', auth, (req,res) => {
        schema.findByIdAndDelete(req.params.ID)
            .then( () => {
                res.send('Removido com sucesso');
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({err:'Não foi possível remover'});
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
                        console.error(err);
                        res.status(400).send({err: 'Falha registro'});
                    })
                }          
            })
            .catch(error => {
                console.error(err);
                res.status(400).send({err: 'Não foi possível cadastrar'});
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
                console.error(err);
                res.status(400).send({err: 'Email não encontrado'});
            });
    })

    app.post('/forget-password', (req,res) => {
        const {email} = req.body;
        users.findOne({email})
            .then(data => {
                if(data){
                    const mailtoken = jtoken.sign({id:data.id}, 'askld12@-,',{expiresIn:9000});
                    users.findByIdAndUpdate(data.id, {$set:{pass_token: mailtoken}})
                        .then( () => {
                            transport.sendMail({
                                from: '"Recuperação senha" <teste@teste.com',
                                to: email,
                                subject: 'Seu token de senha',
                                text: 'Use esse token para trocar sua senha: ' + mailtoken
                                })
                                .then( sended => {
                                    console.log(sended);
                                    res.send('Token enviado ao email:' + email);
                                })
                                .catch( err => {
                                    console.error(err);
                                    res.status(400);
                                }); 
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(400).send('Erro ao enviar email');
                        })       
                }else{
                    res.status(400).send('Erro: email não encontrado');
                }
            })
            .catch(err => {
                console.log('erro')
                console.error(err);
                res.status(400).send({err: 'Erro.'});
            })
    })

    app.post('/new-password', (req,res) => {
        const {email, password, token} = req.body;
        users.findOne({email})
            .then( data => {
                if(data.pass_token == token){
                    data.pass_token = undefined;
                    data.password = password;
                    data.save();
                    res.send('Senha atualizada!')
                } 
            })
            .catch( err => {
                console.error(err);
                res.status(400).send(err);
            })
    })

};
