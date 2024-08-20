import ChatService from "../services/chatservice";
import GptService from "../services/gptservice";

export const fetchUUID = async (req, res, next) => {
    try {
        const uuid = await ChatService.fetchUUID();

        console.log("uuid: ", uuid);
  
        res.json({ uuid })
    } catch (err) {
        next(err)
    }
}

export const fetchGptMessage = async (req, res, next) => {
    try {
        const { mode, question, history } = req.query;
        //const answer = await GptService.fetchGptMessage(mode, question, history);
        const answer = "Hello. GPT Test Answer!!!";
  
        res.json({answer})
    } catch (err) {
        next(err)
    }
}

export const saveMessage = async (req, res, next) => {
    try {
        let ret;

        res.json({ret})
    } catch (err) {
        next(err)
    }
}

export const setMessageRate = async (req, res, next) => {
    try {
        const device_uuid = req.device_uuid;
        const { chatid, rate } = req.query;

        console.log(req.query);

        res.json({device_uuid})
    } catch (err) {
        next(err)
    }
}