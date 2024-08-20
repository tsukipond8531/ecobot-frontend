import {runQuery, runSelect} from '../database';

let crypto = require('node:crypto');

function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export default class ChatService {

    static async fetchUUID() {
        try {
            const uuid = generateUUID();

            return uuid;
        } catch(err) {
            throw err;
        }
    }

    static async saveMessage(device_uuid, chatid, messages) {
        try {
            const query = "INSERT INTO messages (user_id, device_uuid, chat_id, role, content, created_at) VALUES (?, ?, ?, ?, ?, ?)";
            let epochTimeSeconds = Math.floor(Date.now());
            runQuery(query, ["", device_uuid, chatid, "user", messages[0], epochTimeSeconds]);
            epochTimeSeconds = Math.floor(Date.now());
            runQuery(query, ["", device_uuid, chatid, "assistant", messages[1], epochTimeSeconds]);

            return { success: true, message: "Saving succeeded"};
        } catch(err) {
            throw err;
        }
    }

    static async setMessageRate(device_uuid, chatid, rate) {
        try {
            let query = `SELECT id FROM messages WHERE chat_id = '${chatid}' ORDER BY created_at DESC LIMIT 1`;
            
            let msgid;
            const result = runSelect(query);
            if (result.length > 0 && result[0].values.length > 0) {
                msgid = result[0].values[0][0];
            } else {
                throw "Message not found";
            }

            if (rate == "like")
                query = "UPDATE messages SET like = '1', dislike = '0' WHERE id = ?";
            else 
                query = "UPDATE messages SET like = '0', dislike = '1' WHERE id = ?";

            runQuery(query, [msgid]);

            return { success: true, message: "Saving succeeded"};
        } catch(err) {
            throw err;
        }
    }
}