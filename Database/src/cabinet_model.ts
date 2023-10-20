const Pool = require('pg').Pool;
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
});

const getCabinet = (request: Request, response: Response) => {
    pool.query('SELECT * FROM cabinet', (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createCabinet = (request: Request, response: Response) => {
    const { reference, lat, lng } = request.body;

    if (reference == null) throw new Error('reference must be defined');

    const query =
        'INSERT INTO cabinet (uuid, reference, lat, lng) VALUES (CAST($1 AS uuid), $2, $3, $4) RETURNING uuid';
    const values = [uuidv4(), reference, lat, lng];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response
            .status(201)
            .send(`Cabinet added with ID: ${results.rows[0].uuid}`);
    });
};

const deleteCabinet = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false) throw new Error('uuid is not valid');

    pool.query(
        'DELETE FROM cabinet WHERE uuid = CAST($1 AS uuid)',
        [uuid],
        (error: any, results: any) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Cabinet deleted with ID: ${uuid}`);
        }
    );
};

const updateCabinet = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    const { reference, lat, lng } = request.body;

    const query =
        'UPDATE cabinet SET reference = $1, lat = $2, lng = $3 WHERE uuid = CAST($4 AS uuid)';
    const values = [reference, lat, lng, uuid];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Cabinet modified with ID: ${uuid}`);
    });
};

module.exports = {
    getCabinet,
    createCabinet,
    deleteCabinet,
    updateCabinet,
};
