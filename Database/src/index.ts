import { Request, Response, NextFunction } from 'express';
const express = require('express');
const app = express();
const port = 3001;

const lamp_model = require('./lamp_model.ts');
const lampshade_model = require('./lampshade_model.ts');
const bulb_model = require('./bulb_model.ts');
const cabinet_model = require('./cabinet_model.ts');
const user_model = require('./user_model.ts');
const town_model = require('./town_model.ts');
const decision_model = require('./decision_model.ts');

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

app.get('/cabinet', (request : Request, response : Response) => {
    cabinet_model.getCabinet(request, response)
});

app.post('/cabinet', (request : Request, response : Response) => {
    cabinet_model.createCabinet(request, response)
});

app.delete('/cabinet/:uuid', (request : Request, response : Response) => {
    cabinet_model.deleteCabinet(request, response)
});

app.patch('/cabinet/:uuid', (request : Request, response : Response) => {
    cabinet_model.updateCabinet(request, response)
});

app.get('/user', (request : Request, response : Response) => {
    user_model.getUser(request, response)
});

app.post('/user', (request : Request, response : Response) => {
    user_model.createUser(request, response)
});

app.delete('/user/:uuid', (request : Request, response : Response) => {
    user_model.deleteUser(request, response)
});

app.patch('/user/:uuid', (request : Request, response : Response) => {
    user_model.updateUser(request, response)
});

app.get('/town', (request : Request, response : Response) => {
    town_model.getTown(request, response)
});

app.post('/town', (request : Request, response : Response) => {
    town_model.createTown(request, response)
});

app.delete('/town/:uuid', (request : Request, response : Response) => {
    town_model.deleteTown(request, response)
});

app.patch('/town/:uuid', (request : Request, response : Response) => {
    town_model.updateTown(request, response)
});

app.get('/decision', (request : Request, response : Response) => {
    decision_model.getDecision(request, response)
});

app.post('/decision', (request : Request, response : Response) => {
    decision_model.createDecision(request, response)
});

app.delete('/decision/:uuid', (request : Request, response : Response) => {
    decision_model.deleteDecision(request, response)
});

app.patch('/decision/:uuid', (request : Request, response : Response) => {
    decision_model.updateDecision(request, response)
});