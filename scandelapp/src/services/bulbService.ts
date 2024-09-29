const username = process.env.REACT_APP_REQUEST_USER;
const password = process.env.REACT_APP_REQUEST_PASSWORD;
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export interface Bulb {
    uuid: string,
    id: string,
    reference: string,
    intensity: number,
    consommation: number,
    type: string,
};

/**
 * Fetch Bulb by ID
 * @param {string} id - Bulb ID
 * @returns {Promise<Lamp>}
 */
export const fetchBulbById = async (id: string): Promise<Bulb> => {
    try {
        const url = baseUrl + "bulbs/"+ id;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching bulb with ID: ${id}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

/**
 * Fetch Bulb by name
 * @param {string} name - Bulb name
 * @returns {Promise<Bulb>}
 */
export const fetchBulbByName = async (name: string): Promise<Bulb> => {

    try {
        const encodedName = encodeURIComponent(name);
        const url = baseUrl + "bulbs?name=" + encodedName;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching bulb with ID: ${name}`);
        }
        const data = await response.json();
        return data[0];

    } catch (error) {
        console.error(error.message);
        throw error;
    }
};