const Pool = require('pg').Pool
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const getLamp = (request : Request, response : Response) => {
    pool.query('SELECT * FROM \"Lamp\"', (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createLamp = (request : Request, response : Response) => {
    const {lat, lng} = request.body;
    pool.query('INSERT INTO \"Lamp\" (\"UUID\", lat, lng) VALUES ($1, $2, $3) RETURNING *', [uuidv4(), lat, lng], (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Lamp added with ID: ${results.rows[0].UUID}`);
    });
}

const deleteLamp = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    pool.query('DELETE FROM \"Lamp\" WHERE UUID = $1', [uuid], (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Lamp deleted with ID: ${uuid}`);
    });

}

const updateLamp = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    const {lat, lng} = request.body;
    pool.query('UPDATE \"Lamp\" SET lat = $1, lng = $2 WHERE UUID = $3', [lat, lng, uuid], (error : any, results : any) =>{
        if (error) {
            throw error;
        }
        response.status(200).send(`Lamp modified with ID: ${uuid}`);
    });
}

module.exports = {
    getLamp,
    createLamp,
    deleteLamp,
    updateLamp,
}