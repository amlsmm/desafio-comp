const posts = require('../schemas/Posts.js');
const users = require('../schemas/users.js');
const jtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../config/authentication.js');
const transport = require('../config/mail.js');


module.exports = app => {
    app.get('/', auth, (req, res) => {
        posts.find()
            .then(datas => {
                res.send(datas);
            })
            .catch(err => {
                console.log(err);
                res.send('Não foi possível abrir seu DB')
            })
    });

    app.post('/', auth, (req, res) =>{
        const {title,post} = req.body;
        const author = req.id;
        users.findById(author)
            .then( user => {
                const postBy = user.user;
                posts.create({title,post,postBy})
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        console.log(err);
                        res.send('Não foi possivel salvar');
                    })
            })
            .catch(err => {
                console.log(err);
                res.send('Erro');
            })
    });

    app.get('/id/:ID', auth, (req, res) => {
        posts.findById(req.params.ID)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log(err);
                res.send('Não foi possível encontrar esse ID.');
            })
    });

    app.post('/edit/id/:ID', auth, (req,res) => {
        users.findById(req.id)
        .then(user => {
            posts.findById(req.params.ID).then( post => {
                if(user.user == post.postBy){
                    const {title,post} = req.body;   
                    posts.findByIdAndUpdate(req.params.ID,{title,post}, {new:true})
                        .then(data => {
                            res.send(data);
                        })
                        .catch(err => {
                            console.log(err);
                            res.send('Não foi possível atualizar');
                        });
                }else{
                    res.send('Você não tem permissão para editar esse post');
                }
            })
            .catch(err => {
                console.log(err);
                res.send('Erro');
            })
        })
        .catch( err => {
            console.log(err);
            res.send('Erro');
        })
    });


    app.delete('/delete/id/:ID', auth, (req,res) => {
        users.findById(req.id)
        .then(user => {
            posts.findById(req.params.ID)
                .then( post => {
                    if(user.user == post.postBy){
                        const {title,post} = req.body;
                        posts.findByIdAndDelete(req.params.ID)
                            .then( () => {
                                res.send('Removido com sucesso');
                            })
                            .catch(err => {
                                console.log(err);
                                res.send('Não foi possível remover');
                            })
                    }else{
                        res.send('Você não tem autorização para remover esse post')
                    }
                })
                .catch( err => {
                    console.log(err);
                    res.send('Erro');
                })
        })
        .catch( err => {
            console.log(err);
            res.send('Erro');
        })    
    });

    
    app.post('/register', (req,res) => {
        const {user,email,password} = req.body;
        users.findOne({email})
            .then(data => {
                if(data){
                    res.send('Esse email já está cadastrado');
                } else {
                    users.create({user, email, password}).then(users => {
                        res.send({users});
                    }).catch(err => {
                        console.log(err);
                        res.send('Falha registro');
                    })
                }          
            })
            .catch(err => {
                console.log(err);
                res.send('Não foi possível cadastrar');
            });
    })

    app.post('/login', (req,res) => {
        const {email, password} = req.body;
        users.findOne({email})
            .then(data => {
                bcrypt.compare(password, data.password, function(err, response){
                    if (err){
                        console.log(err);
                        res.send('Erro, verifique o email e tente novamente');
                    }
                    if(response){
                        const token = jtoken.sign({id:data.id}, 'lçaklsd@@@---aklsdlas163dlwm,',{expiresIn:172800});
                        res.send({token: token});
                    }
                    else{
                        res.send('Erro, verifique o email e a senha e tente novamente');
                    }
                    });
                })
            .catch( err => {
                console.log(err);
                res.send('Erro');
            })
    })

    app.post('/forget-password', (req,res) => {
        const {email} = req.body;
        users.findOne({email})
            .then(data => {
                if(data){
                    const mailtoken = jtoken.sign({id:data.id}, 'askld12@-,');
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
                                    console.log(err);
                                    res.send('Erro');
                                }); 
                        })
                        .catch(err =>{
                            console.log(err);
                            res.send('Erro ao enviar email');
                        })       
                }else{
                    res.send('Erro: email não encontrado');
                }
            })
            .catch(err => {
                console.log(err);
                res.send('Erro.');
            })
    })

    app.post('/new-password', (req,res) => {
        const {email, password, token} = req.body;
        if(token){
            users.findOne({email}).select('pass_token')
                .then( data => {
                    if(data.pass_token == token){
                        data.pass_token = undefined;
                        data.password = password;
                        data.save();
                        res.send('Senha atualizada!')
                    }
                    else{
                        res.send('Token incorreto.')
                    } 
                })
                .catch( err => {
                    console.log(err);
                    res.send(err);
                })
        }else{
            res.send('Insira o token');
        }
    })
};
