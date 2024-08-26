import initSqlJs, { Database, SqlValue, QueryExecResult } from 'sql.js/dist/sql-asm.js';
import fs from 'fs';
import { migrations } from './migrations';

const DB_FILE = "db.sqlite";
var db: Database;

export async function initDb(): Promise<void> {
    const SQL = await initSqlJs({});

    let db: Database;
    if (fs.existsSync(DB_FILE)) {
        const fileBuffer = fs.readFileSync(DB_FILE);
        db = new SQL.Database(fileBuffer);
    } else {
        db = new SQL.Database();
        runMigrations(db);
        saveDb(db);
    }
}

function runMigrations(db: Database): void {
    db.exec('BEGIN TRANSACTION');
    try {
        migrations.forEach(migration => db.run(migration));
        db.exec('COMMIT');
    } catch (error) {
        db.exec('ROLLBACK');
        throw new Error(`Migration failed`);
    }
}

function saveDb(db: Database): void {
    const data = db.export();
    fs.writeFileSync(DB_FILE, Buffer.from(data));
}

async function init(): Promise<void> {
    await initDb();
}

init();

export function runQuery(query: string, args?: SqlValue[]): void {
    db.run(query, args);
    saveDb(db);
}

export function runSelect(query: string): QueryExecResult[] {
    return db.exec(query);
}
