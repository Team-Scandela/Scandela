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

const getLampdecision = (request: Request, response: Response) => {
    pool.query('SELECT * FROM lampdecision', (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createLampdecision = (request: Request, response: Response) => {
    const { uuidlamp, uuiddecision } = request.body;

    if (uuidlamp == null && uuiddecision == null)
        throw new Error('uuidlamp and uuiddecision must be defined');

    const query =
        'INSERT INTO lampdecision (uuid, uuidlamp, uuiddecision) VALUES (CAST($1 AS uuid), CAST($2 AS uuid), CAST($3 AS uuid)) RETURNING uuid';
    const values = [uuidv4(), uuidlamp, uuiddecision];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response
            .status(201)
            .send(`Lampdecision added with ID: ${results.rows[0].uuid}`);
    });
};

const deleteLampdecision = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false) throw new Error('uuid is not valid');

    pool.query(
        'DELETE FROM lampdecision WHERE uuid = CAST($1 AS uuid)',
        [uuid],
        (error: any, results: any) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Lampdecision deleted with ID: ${uuid}`);
        }
    );
};

const updateLampdecision = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    const { uuidlamp, uuiddecision } = request.body;

    const query =
        'UPDATE lampdecision SET uuidlamp = CAST($1 AS uuid), uuiddecision = CAST($2 AS uuid) WHERE uuid = CAST($3 AS uuid)';
    const values = [uuidlamp, uuiddecision, uuid];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Lampdecision modified with ID: ${uuid}`);
    });
};

module.exports = {
    getLampdecision,
    createLampdecision,
    deleteLampdecision,
    updateLampdecision,
};
