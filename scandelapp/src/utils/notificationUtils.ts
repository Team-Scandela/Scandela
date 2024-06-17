const encodedCredentials = btoa(
    `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
);
const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Basic ${encodedCredentials}`,
});

export const getNotifications = async (idUser: string) => {
    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications?idUser=${idUser}`;
    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: headers,
        });
        const notifications = await response.json();
        return notifications;
    } catch (error) {
        console.log('ERROR GET NOTIFICATIONS = ' + error);
    }
};

export const getNotification = async (id: string) => {
    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications/${id}`;
    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: headers,
        });
        const notification = await response.json();
        return notification;
    } catch (error) {
        console.log('ERROR GET NOTIFICATION = ' + error);
    }
};

export const createNotification = async (newNotification: any) => {
    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications/create`;
    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newNotification),
        });
        const notification = await response.json();
        return notification;
    } catch (error) {
        console.log('ERROR POST CREATE NOTIFICATION = ' + error);
    }
};

export const updateNotification = async (id: string, update: any) => {
    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications/${id}`;
    try {
        const response = await fetch(urlRequest, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(update),
        });
        const notification = await response.json();
        return notification;
    } catch (error) {
        console.log('ERROR UPDATE NOTIFICATION = ' + error);
    }
};

export const deleteNotification = async (id: string) => {
    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications/delete/${id}`;
    try {
        const response = await fetch(urlRequest, {
            method: 'DELETE',
            headers: headers,
        });
    } catch (error) {
        console.log('ERROR DELETE NOTIFICATION = ' + error);
    }
};
