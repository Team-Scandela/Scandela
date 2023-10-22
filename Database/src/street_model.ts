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

const getLampshade = (request: Request, response: Response) => {
    pool.query('SELECT * FROM lampshade', (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createLampshade = (request: Request, response: Response) => {
    const { adress, uuidhood } = request.body;

    if (adress == null && uuidhood == null)
        throw new Error('adress and uuidhood must be defined');

    const query =
        'INSERT INTO lampshade (uuid, adress, uuidhood) VALUES (CAST($1 AS uuid), $2, CAST($3 AS uuid)) RETURNING uuid';
    const values = [uuidv4(), adress, uuidhood];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response
            .status(201)
            .send(`Lampshade added with ID: ${results.rows[0].uuid}`);
    });
};

const deleteLampshade = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false) throw new Error('uuid is not valid');

    pool.query(
        'DELETE FROM lampshade WHERE uuid = CAST($1 AS uuid)',
        [uuid],
        (error: any, results: any) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Lampshade deleted with ID: ${uuid}`);
        }
    );
};

const updateLampshade = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    const { adress, uuidhood } = request.body;

    const query =
        'UPDATE lampshade SET adress = $1, uuidhood = CAST($2 AS uuid) WHERE uuid = CAST($3 AS uuid)';
    const values = [adress, uuidhood, uuid];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Lampshade modified with ID: ${uuid}`);
    });
};

module.exports = {
    getLampshade,
    createLampshade,
    deleteLampshade,
    updateLampshade,
};
