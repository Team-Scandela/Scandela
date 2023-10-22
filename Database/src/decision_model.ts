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

const getDecision = (request: Request, response: Response) => {
    pool.query('SELECT * FROM decision', (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createDecision = (request: Request, response: Response) => {
    const {
        description,
        validate,
        cost,
        benefits,
        uuiddecisiontype,
        uuiduser,
    } = request.body;

    if (description == null) throw new Error('description must be defined');

    const query =
        'INSERT INTO decision (uuid, description, validate, cost, benefits, uuiddecisiontype, uuiduser) VALUES (CAST($1 AS uuid), $2, $3, $4, $5, CAST($6 AS uuid), CAST($7 AS uuid)) RETURNING uuid';
    const values = [
        uuidv4(),
        description,
        validate,
        cost,
        benefits,
        uuiddecisiontype,
        uuiduser,
    ];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response
            .status(201)
            .send(`Decision added with ID: ${results.rows[0].uuid}`);
    });
};

const deleteDecision = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false) throw new Error('uuid is not valid');

    pool.query(
        'DELETE FROM decision WHERE uuid = CAST($1 AS uuid)',
        [uuid],
        (error: any, results: any) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Decision deleted with ID: ${uuid}`);
        }
    );
};

const updateDecision = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    const {
        description,
        validate,
        cost,
        benefits,
        uuiddecisiontype,
        uuiduser,
    } = request.body;

    const query =
        'UPDATE decision SET description = $1, validate = $2, cost = $3, benefits = $4, uuiddecisiontype = CAST($5 AS uuid), uuiduser = CAST($6 AS uuid) WHERE uuid = CAST($7 AS uuid)';
    const values = [
        description,
        validate,
        cost,
        benefits,
        uuiddecisiontype,
        uuiduser,
        uuid,
    ];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Decision modified with ID: ${uuid}`);
    });
};

module.exports = {
    getDecision,
    createDecision,
    deleteDecision,
    updateDecision,
};
