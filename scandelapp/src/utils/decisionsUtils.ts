export const getDecisions = async () => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'decisions';

    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('ERROR GET ALL DECISIONS = ' + error);
    }
};

export const getDecisionsSpecificAlgo = async (url: string) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'decisions/' + url;

    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('ERROR GET DECISIONS = ' + error);
    }
};

export const getState = async (id: string) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const urlRequest = process.env.REACT_APP_BACKEND_URL +`decisions/${id}/state`;

    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });
        const data = await response.text();
        console.log("answer data = ", data);
        return data;
    } catch (error) {
        console.log('ERROR GET State = ' + error);
    }
}

export const setState = async (id: string, state : string) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const urlRequest = process.env.REACT_APP_BACKEND_URL +`decisions/${id}/state`;

    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: state
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('ERROR SET STATE = ' + error);
    }
}