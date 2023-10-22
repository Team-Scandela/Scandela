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

const getBulb = (request: Request, response: Response) => {
    pool.query('SELECT * FROM bulb', (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createBulb = (request: Request, response: Response) => {
    const { reference, intensity, consumption, type } = request.body;

    if (reference == null) throw new Error('reference must be defined');

    const query =
        'INSERT INTO bulb (uuid, reference, intensity, consumption, type) VALUES (CAST($1 AS uuid), $2, $3, $4, $5) RETURNING uuid';
    const values = [uuidv4(), reference, intensity, consumption, type];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response
            .status(201)
            .send(`Bulb added with ID: ${results.rows[0].uuid}`);
    });
};

const deleteBulb = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false) throw new Error('uuid is not valid');

    pool.query(
        'DELETE FROM bulb WHERE uuid = CAST($1 AS uuid)',
        [uuid],
        (error: any, results: any) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Bulb deleted with ID: ${uuid}`);
        }
    );
};

const updateBulb = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    const { reference, intensity, consumption, type } = request.body;

    const query =
        'UPDATE bulb SET reference = $1, intensity = $2, consumption = $3, type = $4 WHERE uuid = CAST($5 AS uuid)';
    const values = [reference, intensity, consumption, type, uuid];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Bulb modified with ID: ${uuid}`);
    });
};

module.exports = {
    getBulb,
    createBulb,
    deleteBulb,
    updateBulb,
};
