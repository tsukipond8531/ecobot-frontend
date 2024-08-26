import express from 'express';
import cors, { CorsOptions } from 'cors';
import { Server, ic, query } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
} from 'azle/canisters/management';
import initSqlJs, { Database } from 'sql.js/dist/sql-asm.js';
import fs from 'fs';

import { getRouter as getRouterChat } from './entities/chat/router';

export let db: Database;

const DB_FILE = "/db.sqlite";

export async function initDb(): Promise<Database> {
    const SQL = await initSqlJs({});

    let db: Database;

    const fileBuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(fileBuffer);

    return db;
}

export function saveDb(): void {
    const data = db.export();
    fs.writeFileSync(DB_FILE, Buffer.from(data));
}

async function createDb() {
    db = await initDb();
}

export default Server(
    // Server section
    () => {
        const app = express();
        app.use(express.json());

        const corsOptions = {
            origin: "*", // Allow only this domain
            methods: "*", // Allow only specific HTTP methods
            allowedHeaders: ["Content-Type", "Authorization"], // Allow only specific headers
            optionsSuccessStatus: 200 // Some legacy browsers choke on 204
        };
          
        app.use(cors(corsOptions));

        createDb();
        
        app.use('/chat', getRouterChat());


        app.use(express.static('/dist'));
        return app.listen();
    },
    // Candid section
    {
        // The transformation function for the HTTP outcall responses.
        // Required to reach consensus among different results the nodes might get.
        // Only if they all get the same response, the result is returned, so make sure
        // your HTTP requests are idempotent and don't depend e.g. on the time.
        transform: query([HttpTransformArgs], HttpResponse, (args) => {
            return {
                ...args.response,
                headers: []
            };
        })
    }
);
