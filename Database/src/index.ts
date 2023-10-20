import { Request, Response, NextFunction } from 'express';
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

const lamp_model = require('./lamp_model.ts');
const lampshade_model = require('./lampshade_model.ts');
const bulb_model = require('./bulb_model.ts');
const cabinet_model = require('./cabinet_model.ts');
const user_model = require('./user_model.ts');
const town_model = require('./town_model.ts');
const decision_model = require('./decision_model.ts');
const decisiontype_model = require('./decisiontype_model.ts');
const hood_model = require('./hood_model.ts');
const incident_model = require('./incident_model.ts');
const lampdecision_model = require('./lampdecision_model.ts');
const street_model = require('./street_model.ts');

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

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
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

app.get('/lampshade', (request: Request, response: Response) => {
    lampshade_model.getLampshade(request, response);
});

app.post('/lampshade', (request: Request, response: Response) => {
    lampshade_model.createLampshade(request, response);
});

app.delete('/lampshade/:uuid', (request: Request, response: Response) => {
    lampshade_model.deleteLampshade(request, response);
});

app.patch('/lampshade/:uuid', (request: Request, response: Response) => {
    lampshade_model.updateLampshade(request, response);
});

app.get('/bulb', (request: Request, response: Response) => {
    bulb_model.getBulb(request, response);
});

app.post('/bulb', (request: Request, response: Response) => {
    bulb_model.createBulb(request, response);
});

app.delete('/bulb/:uuid', (request: Request, response: Response) => {
    bulb_model.deleteBulb(request, response);
});

app.patch('/bulb/:uuid', (request: Request, response: Response) => {
    bulb_model.updateBulb(request, response);
});

app.get('/cabinet', (request: Request, response: Response) => {
    cabinet_model.getCabinet(request, response);
});

app.post('/cabinet', (request: Request, response: Response) => {
    cabinet_model.createCabinet(request, response);
});

app.delete('/cabinet/:uuid', (request: Request, response: Response) => {
    cabinet_model.deleteCabinet(request, response);
});

app.patch('/cabinet/:uuid', (request: Request, response: Response) => {
    cabinet_model.updateCabinet(request, response);
});

app.get('/user', (request: Request, response: Response) => {
    user_model.getUser(request, response);
});

app.post('/user', (request: Request, response: Response) => {
    user_model.createUser(request, response);
});

app.delete('/user/:uuid', (request: Request, response: Response) => {
    user_model.deleteUser(request, response);
});

app.patch('/user/:uuid', (request: Request, response: Response) => {
    user_model.updateUser(request, response);
});

app.get('/town', (request: Request, response: Response) => {
    town_model.getTown(request, response);
});

app.post('/town', (request: Request, response: Response) => {
    town_model.createTown(request, response);
});

app.delete('/town/:uuid', (request: Request, response: Response) => {
    town_model.deleteTown(request, response);
});

app.patch('/town/:uuid', (request: Request, response: Response) => {
    town_model.updateTown(request, response);
});

app.get('/decision', (request: Request, response: Response) => {
    decision_model.getDecision(request, response);
});

app.post('/decision', (request: Request, response: Response) => {
    decision_model.createDecision(request, response);
});

app.delete('/decision/:uuid', (request: Request, response: Response) => {
    decision_model.deleteDecision(request, response);
});

app.patch('/decision/:uuid', (request: Request, response: Response) => {
    decision_model.updateDecision(request, response);
});

app.get('/decisiontype', (request: Request, response: Response) => {
    decisiontype_model.getDecisiontype(request, response);
});

app.post('/decisiontype', (request: Request, response: Response) => {
    decisiontype_model.createDecisiontype(request, response);
});

app.delete('/decisiontype/:uuid', (request: Request, response: Response) => {
    decisiontype_model.deleteDecisiontype(request, response);
});

app.patch('/decisiontype/:uuid', (request: Request, response: Response) => {
    decisiontype_model.updateDecisiontype(request, response);
});

app.get('/hood', (request: Request, response: Response) => {
    hood_model.getHood(request, response);
});

app.post('/hood', (request: Request, response: Response) => {
    hood_model.createHood(request, response);
});

app.delete('/hood/:uuid', (request: Request, response: Response) => {
    hood_model.deleteHood(request, response);
});

app.patch('/hood/:uuid', (request: Request, response: Response) => {
    hood_model.updateHood(request, response);
});

app.get('/incident', (request: Request, response: Response) => {
    incident_model.getIncident(request, response);
});

app.post('/incident', (request: Request, response: Response) => {
    incident_model.createIncident(request, response);
});

app.delete('/incident/:uuid', (request: Request, response: Response) => {
    incident_model.deleteIncident(request, response);
});

app.patch('/incident/:uuid', (request: Request, response: Response) => {
    incident_model.updateIncident(request, response);
});

app.get('/lampdecision', (request: Request, response: Response) => {
    lampdecision_model.getLampdecision(request, response);
});

app.post('/lampdecision', (request: Request, response: Response) => {
    lampdecision_model.createLampdecision(request, response);
});

app.delete('/lampdecision/:uuid', (request: Request, response: Response) => {
    lampdecision_model.deleteLampdecision(request, response);
});

app.patch('/lampdecision/:uuid', (request: Request, response: Response) => {
    lampdecision_model.updateLampdecision(request, response);
});

app.get('/street', (request: Request, response: Response) => {
    street_model.getStreet(request, response);
});

app.post('/street', (request: Request, response: Response) => {
    street_model.createStreet(request, response);
});

app.delete('/street/:uuid', (request: Request, response: Response) => {
    street_model.deleteStreet(request, response);
});

app.patch('/street/:uuid', (request: Request, response: Response) => {
    street_model.updateStreet(request, response);
});
