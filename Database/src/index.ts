import { Request, Response, NextFunction } from 'express';
const express = require('express');
const app = express();
const port = 3001;

const lamp_model = require('./lamp_model.ts');

app.use(express.json());

app.use( function(req : Request, res : Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/lamp', (request : Request, response : Response) => {
    lamp_model.getLamp(request, response)
    .then((result : any) => {
        response.status(200).json(result.rows);
    })
    .catch( (error : any) => {
        throw error;
    });
});

app.post('/lamp', (request : Request, response : Response) => {
    lamp_model.createLamp(request, response)
    .then((result : any) => {
        response.status(201).send(`Lamp added with ID: ${result.rows[0].uuid}`);
    })
    .catch( (error : any) => {
        throw error;
    });
});

app.delete('/lamp/:uuid', (request : Request, response : Response) => {
    lamp_model.deleteLamp(request, response)
    .then((result : any) => {
        response.status(200).send(`Lamp deleted with ID: ${request.params.uuid}`);
    })
    .catch( (error : any) => {
        throw error;
    });
});

app.patch('/lamp/:uuid', (request : Request, response : Response) => {
    lamp_model.updateLamp(request, response)
    .then((result : any) => {
        response.status(200).send(`Lamp modified with ID: ${request.params.uuid}`);
    })
    .catch( (error : any) => {
        throw error;
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
