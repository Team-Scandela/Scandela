import { useAtom } from 'jotai';
import { lampsAtom, isLoadingAtom } from '../atoms/lampsAtom'; // Remplacez par le bon chemin

const username = process.env.REACT_APP_REQUEST_USER;
const password = process.env.REACT_APP_REQUEST_PASSWORD;
const baseUrl = process.env.REACT_APP_BACKEND_URL;

/**
 * Interface représentant une lampe avec ses propriétés.
 */
export interface Lamp {
    /** Identifiant unique de la lampe */
    uuid: string;

    /** Latitude de la lampe */
    latitude: number;

    /** Longitude de la lampe */
    longitude: number;

    /** Heure d'allumage de la lampe */
    lighton: string;

    /** Heure d'extinction de la lampe */
    lightoff: string;

    /** Hauteur de la lampe */
    height: number;

    /** Informations supplémentaires sur la lampe */
    moreinfo: Record<string, any>;

    /** Nom de la lampe */
    name: string;

    /** Adresse de la lampe */
    address: string;

    /** Type de lampe */
    lampType: string;

    /** Type de foyer de la lampe */
    foyertype: string;

    /** UUID de l'ampoule */
    uuidbulb: string;

    /** UUID de l'abat-jour */
    uuidlampshade: string;

    /** UUID du cabinet */
    uuidcabinet: string;

    /** UUID de la ville */
    uuidtown: string;

    /** Optimisations recommandées pour la lampe */
    recommanded_optimisations: string;

    /** UUID de la rue */
    uuidstreet: string[];

    /** Heure d'extinction de la lampe (deuxième) */
    lightoff2: string;

    /** Heure d'allumage de la lampe (deuxième) */
    lighton2: string;

    /** Dernière modification de la lampe */
    lastmodification: string;

    /** Durée de vie de l'ampoule */
    bulblifetime: number;
}

/**
 * Fetch all lamps
 * @returns {Promise<Lamp[]>}
 */
export const fetchAllLamps = async (): Promise<Lamp[]> => {
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    setIsLoading(true);

    try {
        const response = await fetch(`${baseUrl}/lamps`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching lamps');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

/**
 * Fetch lamp by ID
 * @param {string} id - Lamp ID
 * @returns {Promise<Lamp>}
 */
export const fetchLampById = async (id: string): Promise<Lamp> => {
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    setIsLoading(true);

    try {
        const response = await fetch(`${baseUrl}/lamps/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching lamp with ID: ${id}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

/**
 * Fetch lamp by name
 * @param {string} name - Lamp name
 * @returns {Promise<Lamp>}
 */
export const fetchLampByName = async (name: string): Promise<Lamp> => {
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    setIsLoading(true);

    try {
        const response = await fetch(`${baseUrl}/lamps/name/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching lamp with name: ${name}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

/**
 * Create new lamp
 * @param {Lamp} newLamp - New lamp data
 * @returns {Promise<Lamp>}
 */
export const createLamp = async (newLamp: Lamp): Promise<Lamp> => {
    const [lamps, setLamps] = useAtom(lampsAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    setIsLoading(true);

    try {
        const response = await fetch(`${baseUrl}/lamps/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            },
            body: JSON.stringify(newLamp),
        });

        if (!response.ok) {
            throw new Error('Error creating lamp');
        }

        const createdLamp = await response.json();
        setLamps((prevLamps) => [...prevLamps, createdLamp]);
        return createdLamp;

    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

/**
 * Update lamp by ID
 * @param {string} id - Lamp ID
 * @param {Lamp} updateData - Updated lamp data
 * @returns {Promise<Lamp>}
 */
export const updateLamp = async (id: string, updateData: Lamp): Promise<Lamp> => {
    const [lamps, setLamps] = useAtom(lampsAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    setIsLoading(true);

    try {
        const response = await fetch(`${baseUrl}/lamps/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error(`Error updating lamp with ID: ${id}`);
        }

        const updatedLamp = await response.json();
        setLamps((prevLamps) =>
            prevLamps.map((lamp) => (lamp.uuid === id ? updatedLamp : lamp))
        );
        return updatedLamp;

    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

/**
 * Delete lamp by ID
 * @param {string} id - Lamp ID
 * @returns {Promise<void>}
 */
export const deleteLamp = async (id: string): Promise<void> => {
    const [lamps, setLamps] = useAtom(lampsAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    setIsLoading(true);

    try {
        const response = await fetch(`${baseUrl}/lamps/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting lamp with ID: ${id}`);
        }

        setLamps((prevLamps) => prevLamps.filter((lamp) => lamp.uuid !== id));

    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        setIsLoading(false);
    }
};
