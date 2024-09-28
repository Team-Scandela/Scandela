import { lampsAtom, isLoadingAtom, errorAtom } from '../atoms/lampsAtom';
import { useSetAtom } from 'jotai';

/**
 * An array to store all lamp data.
 * @type {any[]}
 */
export const allLamps: any[] = [];

/**
 * Fetches all lamp data for a specified town and stores it in the `allLamps` array.
 *
 * @async
 * @function getAllLamps
 * @param {string} town - The name of the town for which to fetch lamp data.
 * @returns {Promise<boolean>} A promise that resolves to true if the data fetch was successful.
 */
export const getAllLamps = async (town: string, setLamps: any, setIsLoading: any, setError: any): Promise<boolean> => {
    console.debug('getAllLamps started for town:', town);

    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const urlLamp = process.env.REACT_APP_BACKEND_URL + 'lamps';

    try {
        const response = await fetch(urlLamp, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const lampsData = await response.json();

        if (response.status === 200) {
            setLamps(lampsData); // Stocker les données dans l'atome Jotai
            allLamps.push(lampsData);
            console.debug('getAllLamps successful for town:', town);
            console.log("LAMPS = ", allLamps[0][0]);
        } else {
            console.error('GET LAMP FAILED, status =', response.status);
            setError(`Error: Failed to fetch lamps with status ${response.status}`);
        }
    } catch (error) {
        console.error('ERROR GET LAMP =', error);
        setError(`Error: ${error.message}`);
    } finally {
        setIsLoading(false); // Indiquer que le chargement est terminé
    }

    console.debug('getAllLamps completed for town:', town);
    return true;
};
