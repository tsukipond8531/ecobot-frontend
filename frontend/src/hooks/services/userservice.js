import api from 'utils/api';

export const apiFetchUUID = async (query) => {
    const data = await api({
        url: `/uuid`,
        query
    });

    return data;
}