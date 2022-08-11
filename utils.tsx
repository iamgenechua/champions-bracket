import { RANKINGS_ENDPOINT } from "./routes";

export const sendPostRequest = async (endpoint: string, data: {}) => {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export const fetchRankings = async () => {
    return fetch(RANKINGS_ENDPOINT).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}