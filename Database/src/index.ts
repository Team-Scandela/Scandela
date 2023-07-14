import { Request, Response, NextFunction } from 'express';
const express = require('express');
const app = express();
const port = 3001;

const lamp_model = require('./lamp_model.ts');
const lampshade_model = require('./lampshade_model.ts');
const bulb_model = require('./bulb_model.ts');

app.use(express.json());

app.use( function(req : Request, res : Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.get('/lamp', (request : Request, response : Response) => {
    lamp_model.getLamp(request, response)
});

app.post('/lamp', (request : Request, response : Response) => {
    lamp_model.createLamp(request, response)
});

app.delete('/lamp/:uuid', (request : Request, response : Response) => {
    lamp_model.deleteLamp(request, response)
});

app.patch('/lamp/:uuid', (request : Request, response : Response) => {
    lamp_model.updateLamp(request, response)
});

app.get('/lampshade', (request : Request, response : Response) => {
    lampshade_model.getLampshade(request, response)
});

app.post('/lampshade', (request : Request, response : Response) => {
    lampshade_model.createLampshade(request, response)
});

app.delete('/lampshade/:uuid', (request : Request, response : Response) => {
    lampshade_model.deleteLampshade(request, response)
});

app.patch('/lampshade/:uuid', (request : Request, response : Response) => {
    lampshade_model.updateLampshade(request, response)
});

app.get('/bulb', (request : Request, response : Response) => {
    bulb_model.getBulb(request, response)
});

app.post('/bulb', (request : Request, response : Response) => {
    bulb_model.createBulb(request, response)
});

app.delete('/bulb/:uuid', (request : Request, response : Response) => {
    bulb_model.deleteBulb(request, response)
});

app.patch('/bulb/:uuid', (request : Request, response : Response) => {
    bulb_model.updateBulb(request, response)
});