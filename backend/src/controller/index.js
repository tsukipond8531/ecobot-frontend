import ChatService from "../services/chatservice";
import GptService from "../services/gptservice";

export const fetchUUID = async (req, res, next) => {
    try {
        const uuid = await ChatService.fetchUUID();

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
        const device_uuid = req.device_uuid;
        const { chatid, messages } = req.query;

        const ret = await ChatService.saveMessage(device_uuid, chatid, messages);

        res.json(ret)
    } catch (err) {
        next(err)
    }
}

export const setMessageRate = async (req, res, next) => {
    try {
        const device_uuid = req.device_uuid;
        const { chatid, rate } = req.query;

        const ret = await ChatService.setMessageRate(device_uuid, chatid, rate);

        res.json(ret)
    } catch (err) {
        next(err)
    }
}