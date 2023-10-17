const Database = require('better-sqlite3');
const db = new Database('database.db');

//fonction to create a table
function createTable(name, columns) {
    db.exec('CREATE TABLE IF NOT EXISTS ' + name + ' (' + columns + ')');
}

// remove a table
function removeTable(name) {
    db.exec('DROP TABLE ' + name);
}

// insert a column in a table
function insertColumn(table, column, type) {
    db.exec('ALTER TABLE ' + table + ' ADD COLUMN ' + column + ' ' + type);
}

//insert a row in a table
function insertRow(table, columns, values) {
    db.prepare(
        'INSERT INTO ' + table + ' (' + columns + ') VALUES (' + values + ')'
    ).run();
}

//fonction to create a user
function createUser(username, password) {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(
        username,
        password
    );
}

//function to get a user
function getUser(username) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

//fonction to check if a user exist
function userExist(username) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

//delete a user
function deleteUser(username) {
    db.prepare('DELETE FROM users WHERE username = ?').run(username);
}

//print all database
console.log(db.prepare('SELECT * FROM users').all());
