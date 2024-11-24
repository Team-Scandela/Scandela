const username = process.env.REACT_APP_REQUEST_USER;
const password = process.env.REACT_APP_REQUEST_PASSWORD;
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export interface Lamp {
    uuid: string;

    id: string;

    latitude: number;

    longitude: number;

    lighton: string;

    lightoff: string;

    height: number;

    moreinfo: Record<string, any>;

    name: string;

    address: string;

    lampType: string;

    foyertype: string;

    uuidbulb: string;

    uuidlampshade: string;

    uuidcabinet: string;

    uuidtown: string;

    recommanded_optimisations: string;

    uuidstreet: string[];

    lightoff2: string;

    lighton2: string;

    lastmodification: string;

    bulblifetime: number;
}

export const updateLamp = async (
    id: string,
    updateData: Lamp,
    lamps: Lamp[],
    setLamps: (newLamps: Lamp[]) => void,
    setIsLoading: (loading: boolean) => void
): Promise<Lamp> => {
    setIsLoading(true);

    try {
        const url = baseUrl + 'lamps/' + id;

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

        const updatedLamps = lamps.map(
            (lamp: Lamp): Lamp => (lamp.uuid === id ? updatedLamp : lamp)
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
    setIsLoading(true);
    const url = baseUrl + 'lamps/delete/' + id;
    try {

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });
        console.log("response.status = ", response.status);
        console.log("response = ", response);
        if (response.status === 200) {

            const updatedLamps = lamps.filter((lamp) => lamp.id !== id);
            setLamps(updatedLamps);
            setOpenPup(false);
        }
    } catch (error) {
        console.log('ERROR DELETE NOTIFICATION = ' + error);
    } finally {
        setIsLoading(false);
    }
};
