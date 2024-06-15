export const allLamps: any[] = [];

export const getAllLamps = async (
    town : string
) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const urlLamp =
        process.env.REACT_APP_BACKEND_URL + 'lamps';
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
            allLamps.push(lampsData);
        } else {
            console.log('GET LAMP FAILED, status = ' + response.status);
        }
    } catch (error) {
        console.log('ERROR GET LAMP = ' + error);
    }

    return true;
};
