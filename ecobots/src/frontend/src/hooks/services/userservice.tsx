import api from "../../utils/api";

// Define the type for the query parameter, assuming it's a key-value pair object
interface QueryParams {
  [key: string]: any;
}

// Function to fetch UUID
export const apiFetchUUID = async (): Promise<any> => {
  const data = await api({
    url: `/uuid`,
  });

  return data;
}

// Function to get GPT response
export const apiGetGpt = async (query: QueryParams): Promise<any> => {
  const data = await api({
    url: `/gpt_message`,
    query,
    method: "POST"
  });

  return data;
}

// Function to save message
export const apiSaveMessage = async (query: QueryParams): Promise<any> => {
  const data = await api({
    url: `/save_message`,
    query,
    method: "POST"
  });

  return data;
}

// Function to set message rate
export const apiSetRate = async (query: QueryParams): Promise<any> => {
  const data = await api({
    url: `/set_message_rate`,
    query,
    method: "POST"
  });

  return data;
}
