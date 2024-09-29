const username = process.env.REACT_APP_REQUEST_USER;
const password = process.env.REACT_APP_REQUEST_PASSWORD;
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export interface Lamp {
    /** Identifiant unique de la lampe */
    uuid: string;

    id: string;
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
};

export const updateLamp = async (
    id: string,
    updateData: Lamp,
    lamps: Lamp[],
    setLamps: (newLamps: Lamp[]) => void,
    setIsLoading: (loading: boolean) => void
): Promise<Lamp> => {
    setIsLoading(true);

    try {
        const url = baseUrl + "lamps/" + id;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`),
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error(`Error updating lamp with ID: ${id}`);
        }

        const updatedLamp: Lamp = await response.json();

        const updatedLamps = lamps.map((lamp: Lamp): Lamp =>
            lamp.uuid === id ? updatedLamp : lamp
        );
        
        setLamps(updatedLamps);

        return updatedLamp;

    } catch (error) {
        console.error(error.message);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

export const suppLamp = async (
    id: string,
    lamps: Lamp[],
    setLamps: (newLamps: Lamp[]) => void,
    setIsLoading: (loading: boolean) => void,
    setOpenPup: (open: boolean) => void
) => {
    setIsLoading(true); // Indique que le chargement est en cours
    const url = baseUrl +"lamps/delete/" + id;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        if (response.status === 200) {
            const updatedLamps = lamps.filter(lamp => lamp.id !== id);
            setLamps(updatedLamps);
            setOpenPup(false);
        } 
    } catch (error) {
        console.log('ERROR DELETE NOTIFICATION = ' + error);
    } finally {
        setIsLoading(false); // Fin du chargement
    }
};
