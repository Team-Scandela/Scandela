export const getLightScore = async () => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `lamps/lightScore`;
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const lightScore = await response.json();
        return lightScore;
    } catch (error) {
        console.log('ERROR GET lightScore = ' + error);
    }
};

export const getConsuptionScore = async () => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `lamps/consuptionScore`;
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const ConsuptionScore = await response.json();
        return ConsuptionScore;
    } catch (error) {
        console.log('ERROR GET ConsuptionScore = ' + error);
    }
};

export const getVegetalScore = async () => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `lamps/vegetalScore`;
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const vegetalScore = await response.json();
        return vegetalScore;
    } catch (error) {
        console.log('ERROR GET vegetalScore = ' + error);
    }
};

export const getAllScores = async () => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `lamps/allScores`;
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const allScores = await response.json();
        return allScores;
    } catch (error) {
        console.log('ERROR GET allScores = ' + error);
    }
};