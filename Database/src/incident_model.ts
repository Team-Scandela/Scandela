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

const getIncident = (request: Request, response: Response) => {
    pool.query('SELECT * FROM incident', (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createIncident = (request: Request, response: Response) => {
    const { title, description, impactElec, impactEco, impactQuali, uuidtown } =
        request.body;

    if (title == null && uuidtown == null)
        throw new Error(
            'title, description, impactElec, impactEco, impactQuali and uuidtown must be defined'
        );

    const query =
        'INSERT INTO incident (uuid, title, description, impactElec, impactEco, impactQuali, uuidtown) VALUES (CAST($1 AS uuid), $2, $3, $4, $5, $6, CAST($7 AS uuid)) RETURNING uuid';
    const values = [
        uuidv4(),
        title,
        description,
        impactElec,
        impactEco,
        impactQuali,
        uuidtown,
    ];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response
            .status(201)
            .send(`Incident added with ID: ${results.rows[0].uuid}`);
    });
};

const deleteIncident = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false) throw new Error('uuid is not valid');

    pool.query(
        'DELETE FROM incident WHERE uuid = CAST($1 AS uuid)',
        [uuid],
        (error: any, results: any) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Incident deleted with ID: ${uuid}`);
        }
    );
};

const updateIncident = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    const { title, description, impactElec, impactEco, impactQuali, uuidtown } =
        request.body;

    const query =
        'UPDATE incident SET title = $1, description = $2, impactElec = $3, impactEco = $4, impactQuali = $5, uuidtown = CAST($6 AS uuid) WHERE uuid = CAST($7 AS uuid)';
    const values = [
        title,
        description,
        impactElec,
        impactEco,
        impactQuali,
        uuidtown,
        uuid,
    ];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Incident modified with ID: ${uuid}`);
    });
};

module.exports = {
    getIncident,
    createIncident,
    deleteIncident,
    updateIncident,
};
