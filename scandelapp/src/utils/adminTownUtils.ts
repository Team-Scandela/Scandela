const username = process.env.REACT_APP_REQUEST_USER;
const passwordDb = process.env.REACT_APP_REQUEST_PASSWORD;
const getAllAdministrator = async () => {
    const urlLamp = process.env.REACT_APP_BACKEND_URL + 'adminville';
    try {
        const response = await fetch(urlLamp, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
            },
        });

        console.log('code de response = ' + response.status);
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            return data;
        } else {
            console.log(
                'CANNOT GET administrator, status = ' + response.status
            );
        }
    } catch (error) {
        console.log('CANNOT GET administrator, error message = ' + error);
    }
};

const addAdministrator = async (userId: string, adminIdToAdd: string) => {
    const urlmodification =
        process.env.REACT_APP_BACKEND_URL +
        'adminville/affectUser/' +
        userId +
        adminIdToAdd;
    try {
        const response = await fetch(urlmodification, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
            },
            body: JSON.stringify({
                name: name,
            }),
        });
        const responsebody = await response.text();
        console.log(responsebody);
        if (response.status === 200) {
            console.log(
                'MODIFICATION APPLIED, status code: ' + response.status
            );
        } else {
            console.log(
                'FAIL TO APPLY MODIFICATION, status code: ' + response.status
            );
        }
    } catch (error) {
        console.log(
            'FAIL TO APPLY MODIFICATION, error message: ' + error.message
        );
    }
};

const removeAdministrator = async (userId: string, adminIdToDelete: string) => {
    const urlmodification =
        process.env.REACT_APP_BACKEND_URL +
        'adminville/' +
        userId +
        adminIdToDelete;
    try {
        const response = await fetch(urlmodification, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${passwordDb}`)}`,
            },
        });
        const responsebody = await response.text();
        console.log(responsebody);
        if (response.status === 200) {
            console.log(
                'MODIFICATION APPLIED, status code: ' + response.status
            );
        } else {
            console.log(
                'FAIL TO APPLY MODIFICATION, status code: ' + response.status
            );
        }
    } catch (error) {
        console.log(
            'FAIL TO APPLY MODIFICATION, error message: ' + error.message
        );
    }
};
