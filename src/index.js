const { Router } = require("express");
const express = require("express");

const app = express();
const port = 3000;

const router = new Router();

router.get('/',(req, res) => {
    return res.status(200).send({message:"bolsonitro"})
});

router.post('/teste', (req,res) => {
    return res.status(200).send({dados:req.body})
});

app.use(router);
app.listen(3000);