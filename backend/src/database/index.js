import initSqlJs, { Databasee, QueryExecResult, SqlValue } from 'sql.js/dist/sql-asm';
import fs from 'fs';

import config from '../config/config.js';

import { migrations } from './migrations';

var db;

async function initDb() {
    const SQL = await initSqlJs({});

    let db;
    if (fs.existsSync(config.DB_FILE)) {
        const filebuffer = fs.readFileSync(config.DB_FILE);
        db = new SQL.Database(filebuffer);
    } else {
        db = new SQL.Database();
        for (const migration of migrations) {
            db.run(migration);
        }
    }

    return db;
}

async function init () {
    db = await initDb();
}

init();

export function runQuery(query, args) {
    db.run(query, args);

    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(config.DB_FILE, buffer);
}

export function runSelect(query) {
    const result = db.exec(query);
    return result;
}