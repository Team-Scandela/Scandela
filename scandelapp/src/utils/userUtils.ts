export let userId = localStorage.getItem('userId') || 0;

export const setUserId = (newId: any) => {
    userId = newId;
    localStorage.setItem('userId', newId);
};

export const getUser = async () => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `users/${userId}`;
        const responseUser = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const user = await responseUser.json();
        return user;
    } catch (error) {
        console.log('ERROR GET USER = ' + error);
    }
};

export const putUser = async (updatedUserData: any) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `users/${userId}`;
        const response = await fetch(urlRequest, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify(updatedUserData),
        });
    } catch (error) {
        console.log('ERROR UPDATE USER = ' + error);
    }
};

export const getUserByMail = async (mail : string) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `users/getByMail/${mail}`;
        const responseUser = await fetch(urlRequest, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        const user = await responseUser.json();
        return user;
    } catch (error) {
        console.log('ERROR GET USER = ' + error);
    }
};

export const changePassword = async (uuid : string, newPassword : string) => {
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    try {
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + `users/changePassword/${uuid}`;
        const response = await fetch(urlRequest, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: newPassword,
        });
    } catch (error) {
        console.log('ERROR UPDATE USER = ' + error);
    }
}