const jtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try { 
        const token = req.headers.authorization.split(' ')[1];
        jtoken.verify(token, 'lçaklsd@@@---aklsdlas163dlwm,', (error, decoded) => {
            if(error) {
                console.error(error);
                res.status(401).send({error:'Acesso negado'});
            }else{
                req.id = decoded.id;
                next();
            }
        });
        }
    catch{ 
        res.status(401).send('Acesso negado')
        }      
}
