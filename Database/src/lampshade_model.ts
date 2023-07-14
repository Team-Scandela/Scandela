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

const getLampshade = (request : Request, response : Response) => {
    pool.query('SELECT * FROM lampshade', (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createLampshade = (request : Request, response : Response) => {
    const {reference, quality} = request.body

    if (reference == null)
        throw new Error('reference must be defined');

    const query = 'INSERT INTO lampshade (uuid, reference, quality) VALUES (CAST($1 AS uuid), $2, $3) RETURNING uuid';
    const values = [uuidv4(), reference, quality];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Lampshade added with ID: ${results.rows[0].uuid}`);
    });
}

const deleteLampshade = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false)
        throw new Error('uuid is not valid');

    pool.query('DELETE FROM lampshade WHERE uuid = CAST($1 AS uuid)', [uuid], (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Lampshade deleted with ID: ${uuid}`);
    });

}

const updateLampshade = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    const {reference, quality} = request.body;

    const query = 'UPDATE lampshade SET reference = $1, quality = $2 WHERE uuid = CAST($3 AS uuid)';
    const values = [reference, quality, uuid];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Lampshade modified with ID: ${uuid}`);
    });
}

module.exports = {
    getLampshade,
    createLampshade,
    deleteLampshade,
    updateLampshade
}