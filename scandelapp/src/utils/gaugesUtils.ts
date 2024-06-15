import { showToast } from '../components/Toastr';

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
        const urlRequest = process.env.REACT_APP_BACKEND_URL + `lamps/allScore`;
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const allScores = await response.json();

        if (allScores) {
            const vegetalScore = allScores.vegetalScore.toFixed(2);
            const consumptionScore = allScores.consumptionScore.toFixed(2);
            const lightScore = allScores.lightScore.toFixed(2);

            localStorage.setItem('vegetalScore', vegetalScore);
            localStorage.setItem('consumptionScore', consumptionScore);
            localStorage.setItem('lightScore', lightScore);
            showToast(
                'success',
                'Les jauges ont bien été mises à jour',
                'top-left',
                5000,
                false,
                true,
                false,
                true
            );
            console.log('SUCCES GET allScore');
        }

        return allScores;
    } catch (error) {
        console.log('ERROR GET allScores = ' + error);
    }
};
