export const getDecisions = async () => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const urlRequest =
        process.env.REACT_APP_BACKEND_URL + 'decisions?pageNumber=0';

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
    const urlRequest =
        process.env.REACT_APP_BACKEND_URL + 'decisions/' + url;

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