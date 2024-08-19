import ChatService from "../services/chatservice";
import GptService from "../services/gptservice";

export const fetchUUID = async (req, res, next) => {
    try {
        const uuid = ChatService.fetchUUID();
  
        res.json({ uuid })
    } catch (err) {
        next(err)
    }
}

export const fetchGptMessage = async (req, res, next) => {
    try {
        const { question, history } = req.query;
        const answer = GptService.fetchGptMessage(question, history);
  
        res.json({answer})
    } catch (err) {
        next(err)
    }
}