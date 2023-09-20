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

const getDecisiontype = (request : Request, response : Response) => {
    pool.query('SELECT * FROM decisiontype', (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createDecisiontype = (request : Request, response : Response) => {
    const {title, moreinfo} = request.body

    if (title == null)
        throw new Error('title must be defined');

    const query = 'INSERT INTO decisiontype (uuid, title, moreinfo) VALUES (CAST($1 AS uuid), $2, $3) RETURNING uuid';
    const values = [uuidv4(), title, moreinfo];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Decisiontype added with ID: ${results.rows[0].uuid}`);
    });
}

const deleteDecisiontype = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false)
        throw new Error('uuid is not valid');

    pool.query('DELETE FROM decisiontype WHERE uuid = CAST($1 AS uuid)', [uuid], (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Decisiontype deleted with ID: ${uuid}`);
    });

}

const updateDecisiontype = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    const {title, moreinfo} = request.body;

    const query = 'UPDATE decisiontype SET title = $1, moreinfo = $2 WHERE uuid = CAST($3 AS uuid)';
    const values = [title, moreinfo, uuid];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Decisiontype modified with ID: ${uuid}`);
    });
}

module.exports = {
    getDecisiontype,
    createDecisiontype,
    deleteDecisiontype,
    updateDecisiontype
}