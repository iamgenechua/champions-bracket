import { RANKINGS_ENDPOINT, MATCHES_ENDPOINT, DELETE_ALL_DATA_ENDPOINT } from "./routes";

export const maxNumberGroups = 2;

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

export const fetchMatches = async () => {
    return fetch(MATCHES_ENDPOINT).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

export const deleteAllData = async (setLatestUpdated: (latestUpdated: any) => void) => {
    return fetch(DELETE_ALL_DATA_ENDPOINT).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const responseJson = response.json();
        setLatestUpdated(responseJson);
        return responseJson;
    })
}