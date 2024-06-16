import { showToast } from '../components/Toastr';

/**
 * Fetches the light score data.
 * 
 * @async
 * @function getLightScore
 * @returns {Promise<any>} A promise that resolves to the light score data.
 */
export const getLightScore = async (): Promise<any> => {
    console.debug('getLightScore started');
    
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest = process.env.REACT_APP_BACKEND_URL + 'lamps/lightScore';
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const lightScore = await response.json();
        console.debug('getLightScore successful');
        return lightScore;
    } catch (error) {
        console.error('ERROR GET lightScore =', error);
    }
};

/**
 * Fetches the consumption score data.
 * 
 * @async
 * @function getConsuptionScore
 * @returns {Promise<any>} A promise that resolves to the consumption score data.
 */
export const getConsuptionScore = async (): Promise<any> => {
    console.debug('getConsuptionScore started');
    
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest = process.env.REACT_APP_BACKEND_URL + 'lamps/consuptionScore';
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const consumptionScore = await response.json();
        console.debug('getConsuptionScore successful');
        return consumptionScore;
    } catch (error) {
        console.error('ERROR GET consumptionScore =', error);
    }
};

/**
 * Fetches the vegetal score data.
 * 
 * @async
 * @function getVegetalScore
 * @returns {Promise<any>} A promise that resolves to the vegetal score data.
 */
export const getVegetalScore = async (): Promise<any> => {
    console.debug('getVegetalScore started');
    
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest = process.env.REACT_APP_BACKEND_URL + 'lamps/vegetalScore';
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const vegetalScore = await response.json();
        console.debug('getVegetalScore successful');
        return vegetalScore;
    } catch (error) {
        console.error('ERROR GET vegetalScore =', error);
    }
};

/**
 * Fetches all score data and stores it in local storage.
 * 
 * @async
 * @function getAllScores
 * @returns {Promise<any>} A promise that resolves to the score data if the fetch was successful.
 */
export const getAllScores = async (): Promise<any> => {
    console.debug('getAllScores started');
    
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest = process.env.REACT_APP_BACKEND_URL + 'lamps/allScore';
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
            console.debug('getAllScores successful');
        }

        return allScores;
    } catch (error) {
        console.error('ERROR GET allScores =', error);
    }
};
