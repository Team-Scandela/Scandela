const username = process.env.REACT_APP_REQUEST_USER;
const password = process.env.REACT_APP_REQUEST_PASSWORD;
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export interface Bulb {
    uuid: string,
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
        console.log('ULR DE REQUETE= ', `${baseUrl}bulbs/${id}`);
        console.log("PASSW et USER= ", process.env.REACT_APP_REQUEST_PASSWORD, process.env.REACT_APP_REQUEST_USER);
        const response = await fetch(`${baseUrl}/bulbs/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            }
        });

        console.log("RESPONSE = ", response);
        if (!response.ok) {
            throw new Error(`Error fetching bulb with ID: ${id}`);
        }
        console.log()
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

// /**
//  * Fetch lamp by name
//  * @param {string} name - Lamp name
//  * @returns {Promise<Lamp>}
//  */
// export const fetchLampByName = async (name: string): Promise<Bulb> => {

//     try {
//         const response = await fetch(`${baseUrl}/lamps/name/${name}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Basic ' + btoa(`${username}:${password}`)
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Error fetching lamp with name: ${name}`);
//         }

//         const data = await response.json();
//         return data;

//     } catch (error) {
//         console.error(error.message);
//         throw error;
//     }
// };

// /**
//  * Update lamp by ID
//  * @param {string} id - Lamp ID
//  * @param {Lamp} updateData - Updated lamp data
//  * @returns {Promise<Lamp>}
//  */
// export const updateLamp = async (id: string, updateData: Bulb): Promise<Bulb> => {

//     try {
//         const response = await fetch(`${baseUrl}/lamps/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Basic ' + btoa(`${username}:${password}`)
//             },
//             body: JSON.stringify(updateData),
//         });

//         if (!response.ok) {
//             throw new Error(`Error updating lamp with ID: ${id}`);
//         }

//         const updatedLamp = await response.json();
//         return updatedLamp;

//     } catch (error) {
//         console.error(error.message);
//         throw error;
//     }
// };
