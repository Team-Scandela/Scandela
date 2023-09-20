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

const getHood = (request : Request, response : Response) => {
    pool.query('SELECT * FROM hood', (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createHood = (request : Request, response : Response) => {
    const {name, lat, lng, uuidtown} = request.body

    if (name == null && uuidtown == null)
        throw new Error('name and uuidtown must be defined');

    const query = 'INSERT INTO hood (uuid, name, lat, lng, uuidtown) VALUES (CAST($1 AS uuid), $2, $3, $4, CAST($5 AS uuid)) RETURNING uuid';
    const values = [uuidv4(), name, lat, lng, uuidtown];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Hood added with ID: ${results.rows[0].uuid}`);
    });
}

const deleteHood = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false)
        throw new Error('uuid is not valid');

    pool.query('DELETE FROM hood WHERE uuid = CAST($1 AS uuid)', [uuid], (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Hood deleted with ID: ${uuid}`);
    });

}

const updateHood = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    const {name, lat, lng, uuidtown} = request.body;

    const query = 'UPDATE hood SET name = $1, lat = $2, lng = $3, uuidtown = CAST($4 AS uuid) WHERE uuid = CAST($5 AS uuid)';
    const values = [name, lat, lng, uuidtown, uuid];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Hood modified with ID: ${uuid}`);
    });
}

module.exports = {
    getHood,
    createHood,
    deleteHood,
    updateHood,
}