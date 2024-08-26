import { runQuery, runSelect } from '../db';

export default class ChatService {
    static async saveMessage(
        device_uuid: string,
        chatid: string,
        messages: string[]
    ): Promise<{ success: boolean; message: string }> {
        try {
            const query =
                "INSERT INTO messages (user_id, device_uuid, chat_id, role, content, created_at) VALUES (?, ?, ?, ?, ?, ?)";

                // Save the user's message
            let epochTimeSeconds = Math.floor(Date.now() / 1000);
            runQuery(query, ["", device_uuid, chatid, "user", messages[0], epochTimeSeconds]);

            // Save the assistant's response
            epochTimeSeconds = Math.floor(Date.now() / 1000);
            runQuery(query, ["", device_uuid, chatid, "assistant", messages[1], epochTimeSeconds]);

            return { success: true, message: "Saving succeeded" };
        } catch (err) {
            throw new Error(`Failed to save message: ${err}`);
        }
    }

    static async setMessageRate(
        device_uuid: string,
        chatid: string,
        rate: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            const selectQuery = `SELECT id FROM messages WHERE chat_id = '${chatid}' ORDER BY created_at DESC LIMIT 1`;
            const result = runSelect(selectQuery);

            let msgid: string | undefined;
            if (result.length > 0 && result[0].values.length > 0) {
                msgid = result[0].values[0][0] as string;
            } else {
                throw new Error("Message not found");
            }

            const updateQuery =
                rate === "like"
                    ? "UPDATE messages SET like = '1', dislike = '0' WHERE id = ?"
                    : "UPDATE messages SET like = '0', dislike = '1' WHERE id = ?";

            runQuery(updateQuery, [msgid]);

            return { success: true, message: "Saving succeeded" };
        } catch (err) {
            throw new Error(`Failed to set message rate: ${err}`);
        }
    }
}
