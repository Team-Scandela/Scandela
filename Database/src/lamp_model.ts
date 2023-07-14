const Pool = require('pg').Pool
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { isUuid } from 'uuidv4';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const getLamp = (request : Request, response : Response) => {
    pool.query('SELECT * FROM lamp', (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createLamp = (request : Request, response : Response) => {
    const { lat, lng, lighton, lightoff, height, moreinfo, name } = request.body;

    if (lat == null || lng == null)
        throw new Error('lat and lng must be defined');

    const query = 'INSERT INTO lamp (uuid, lat, lng, lighton, lightoff, height, moreinfo, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [uuidv4(), lat, lng, lighton, lightoff, height, moreinfo, name];


    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Lamp added with ID: ${results.rows[0].uuid}`);
    });
}

const deleteLamp = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false)
        throw new Error('uuid is not valid');

    pool.query('DELETE FROM lamp WHERE uuid = CAST($1 AS uuid)', [uuid], (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Lamp deleted with ID: ${uuid}`);
    });

}

const deleteAllLamp = (request : Request, response : Response) => {
    pool.query('DELETE FROM lamp)', (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`All Lamps have been deleted`);
    });
}

const launchScript = (request : Request, response : Response) => {
   
    // pool.query('DELETE FROM lamp WHERE uuid = CAST($1 AS uuid)', [uuid], (error : any, results : any) => {
    //     if (error) {
    //         throw error;
    //     }
    //     response.status(200).send(`Lamp deleted with ID:}`);
    // });

}

const updateLamp = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    const {lat, lng, lighton, lightoff, height, moreinfo, name} = request.body;

    const query = 'UPDATE lamp SET lat = $1, lng = $2, lighton = $3, lightoff = $4, height = $5, moreinfo = $6 , name = $7 WHERE uuid = CAST($8 AS uuid)';
    const values = [lat, lng, lighton, lightoff, height, moreinfo, name, uuid];

    pool.query(query, values, (error : any, results : any) => {
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
    deleteAllLamp,
    launchScript,
    updateLamp,
}