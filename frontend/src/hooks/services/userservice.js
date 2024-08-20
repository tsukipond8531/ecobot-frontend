import api from 'utils/api';

export const apiFetchUUID = async (query) => {
    const data = await api({
        url: `/uuid`,
        query
    });

    return data;
}

export const apiGetGpt = async (query) => {
    const data = await api({
        url: `/gpt_message`,
        query,
        method: "POST",
    });

    return data;
}

export const apiSaveMessage = async (query) => {
    const data = await api({
        url: `/save_message`,
        query,
        method: "POST"
    });
    
    return data;
}

export const apiSetRate = async (query) => {
    const data = await api({
        url: `/set_message_rate`,
        query,
        method: "POST",
    });

    return data;
}