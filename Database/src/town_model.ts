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

const getTown = (request : Request, response : Response) => {
    pool.query('SELECT * FROM town', (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createTown = (request : Request, response : Response) => {
    const {name, lat, lng, electrictyprice, eleclevel, ecolevel, qualilevel} = request.body

    if (name == null)
        throw new Error('name must be defined');

    const query = 'INSERT INTO town (uuid, name, lat, lng, electrictyprice, eleclevel, ecolevel, qualilevel) VALUES (CAST($1 AS uuid), $2, $3, $4, $5, $6, $7, $8) RETURNING uuid';
    const values = [uuidv4(), name, lat, lng, electrictyprice, eleclevel, ecolevel, qualilevel];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Town added with ID: ${results.rows[0].uuid}`);
    });
}

const deleteTown = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false)
        throw new Error('uuid is not valid');

    pool.query('DELETE FROM town WHERE uuid = CAST($1 AS uuid)', [uuid], (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Town deleted with ID: ${uuid}`);
    });

}

const updateTown = (request : Request, response : Response) => {
    const uuid = request.params.uuid;
    const {name, lat, lng, electrictyprice, eleclevel, ecolevel, qualilevel} = request.body;

    const query = 'UPDATE town SET name = $1, lat = $2, lng = $3, electrictyprice = $4, eleclevel = $5, ecolevel = $6, qualilevel = $7 WHERE uuid = CAST($8 AS uuid)';
    const values = [name, lat, lng, electrictyprice, eleclevel, ecolevel, qualilevel, uuid];

    pool.query(query, values, (error : any, results : any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Town modified with ID: ${uuid}`);
    });
}

module.exports = {
    getTown,
    createTown,
    deleteTown,
    updateTown,
}