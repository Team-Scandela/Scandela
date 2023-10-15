import { Request, Response, NextFunction } from 'express';
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

const lamp_model = require('./lamp_model.ts');

app.use(cors());
app.use(express.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers'
    );
    next();
});

app.get('/lamp', (request: Request, response: Response) => {
    lamp_model.getLamp(request, response);
});

app.post('/script', (request: Request, response: Response) => {
    lamp_model.launchScript(request, response);
});

app.post('/lamp', (request: Request, response: Response) => {
    lamp_model.createLamp(request, response);
});

app.delete('/lamp/:uuid', (request: Request, response: Response) => {
    lamp_model.deleteLamp(request, response);
});

app.delete('/lamps', (request: Request, response: Response) => {
    lamp_model.deleteAllLamp(request, response);
});

app.patch('/lamp/:uuid', (request: Request, response: Response) => {
    lamp_model.updateLamp(request, response);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
