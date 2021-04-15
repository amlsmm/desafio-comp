import express, { Router } from 'express';
import { main } from './app/controller/index.js'


const app = express();
const port = 3000;

app.use('/main', main)

app.listen(port);