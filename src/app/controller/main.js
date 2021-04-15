import express, { Router } from 'express';
import Project from '../schemas/project.js';

const router = new Router();

router.get('/teste', function(req, res){
    res.sendFile('main.html');
});

router.post('/', (req, res) => {
    const {title, slug, description, category} = req.body;
    Project.create({title, slug, description, category})
        .then(project => {
            res.status(200).send(project);
        })
        .catch(error => {
            console.error('Erro no banco de dados');
            res.status(400).send({error:'Não foi possivel salvar'})
        })
});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

export default router;
