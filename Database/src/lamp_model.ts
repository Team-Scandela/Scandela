const Pool = require('pg').Pool
require('dotenv').config();
import { uuid } from 'uuidv4';
import { Request, Response } from 'express';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'scandb',
    password: 'scandatabase85',
    port: 5432,
})

const getLamp = (request : Request, response : Response) => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM \"Lamp\"', (error : any, results : any) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

const createLamp = (request : Request, response : Response) => {
    return new Promise(function(resolve, reject) {
        const {lat, lng} = request.body;
        pool.query('INSERT INTO \"Lamp\" (UUID, lat, lng) VALUES ($1, $2, $3) RETURNING *', [uuid(), lat, lng], (error : any, results : any) => {
            if (error) {
                reject(error);
            }
            console.log("results \n\n\n" + results)
            resolve(`Lamp added with ID: ${results}`)
        });
    });
}

const deleteLamp = (request : Request, response : Response) => {
    return new Promise(function(resolve, reject) {
        const uuid = request.params.uuid;
        pool.query('DELETE FROM \"Lamp\" WHERE UUID = $1', [uuid], (error : any, results : any) => {
            if (error) {
                reject(error)
            }
            resolve(`Lamp deleted with ID: ${uuid}`)
        });
    });
}

const updateLamp = (request : Request, response : Response) => {
    return new Promise(function(resolve, reject) {
        const uuid = request.params.uuid;
        const {lat, lng} = request.body;
        pool.query('UPDATE \"Lamp\" SET lat = $1, lng = $2 WHERE UUID = $3', [lat, lng, uuid], (error : any, results : any) =>{
            if (error) {
                reject(error);
            }
            resolve(`Lamp modified with ID: ${uuid}`)
        });
    });
}

module.exports = {
    getLamp,
    createLamp,
    deleteLamp,
    updateLamp,
}