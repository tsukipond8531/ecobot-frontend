export const migration0 = `
    CREATE TABLE users
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        age INTEGER NOT NULL
    );

    CREATE TABLE messages
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        device_uuid TEXT NOT NULL,
        chat_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        like INTEGER,
        dislike INTEGER,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;
