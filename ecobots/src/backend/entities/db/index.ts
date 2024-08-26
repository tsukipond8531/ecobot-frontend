import initSqlJs, { Database, SqlValue, QueryExecResult } from 'sql.js/dist/sql-asm.js';
import { migrations } from './migrations';

import { db, saveDb } from '../../backend';


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

export function runQuery(query: string, args?: SqlValue[]): void {
    db.run(query, args);
    saveDb();
}

export function runSelect(query: string): QueryExecResult[] {
    return db.exec(query);
}
