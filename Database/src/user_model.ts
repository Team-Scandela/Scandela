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

const getUser = (request: Request, response: Response) => {
    pool.query('SELECT * FROM users', (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createUser = (request: Request, response: Response) => {
    const {
        email,
        right,
        username,
        password,
        moreinfo,
        darkmode,
        lastconnexion,
        uuidtown,
    } = request.body;

    if (email == null || username == null || password == null)
        throw new Error('email, username and password must be defined');

    const query =
        'INSERT INTO users (uuid, email, right, username, password, moreinfo, darkmode, lastconnexion, uuidtown) VALUES (CAST($1 AS uuid), $2, $3, $4, $5, $6, $7, $8, CAST($9 AS uuid)) RETURNING uuid';
    const values = [
        uuidv4(),
        email,
        right,
        username,
        password,
        moreinfo,
        darkmode,
        lastconnexion,
        uuidtown,
    ];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response
            .status(201)
            .send(`User added with ID: ${results.rows[0].uuid}`);
    });
};

const deleteUser = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    if (isUuid(uuid) == false) throw new Error('uuid is not valid');

    pool.query(
        'DELETE FROM users WHERE uuid = CAST($1 AS uuid)',
        [uuid],
        (error: any, results: any) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User deleted with ID: ${uuid}`);
        }
    );
};

const updateUser = (request: Request, response: Response) => {
    const uuid = request.params.uuid;
    const {
        email,
        right,
        username,
        password,
        moreinfo,
        darkmode,
        lastconnexion,
        uuidtown,
    } = request.body;

    const query =
        'UPDATE users SET email = $1, right = $2, username = $3, password = $4, moreinfo = $5, darkmode = $6, lastconnexion = $7, uuidtown = CAST($8 AS uuid) WHERE uuid = CAST($9 AS uuid)';
    const values = [
        email,
        right,
        username,
        password,
        moreinfo,
        darkmode,
        lastconnexion,
        uuidtown,
        uuid,
    ];

    pool.query(query, values, (error: any, results: any) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User modified with ID: ${uuid}`);
    });
};

module.exports = {
    getUser,
    createUser,
    deleteUser,
    updateUser,
};
