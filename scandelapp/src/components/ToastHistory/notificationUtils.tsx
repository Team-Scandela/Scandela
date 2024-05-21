export interface Notification {
    id: string;
    description: string;
    time: string;
    user: {
        id: string;
        username: string;
    };
}

export const getLatestNotifications = async (userId: string) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });

    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications/latest?idUser=${userId}`;

    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }

        const notifications = await response.json();
        return notifications;
    } catch (error) {
        console.error('ERROR GET LATEST NOTIFICATIONS = ', error);
        return [];
    }
};

export const saveNotification = async (notification: Notification) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });

    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications/create`;

    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(notification),
        });

        if (!response.ok) {
            throw new Error('Failed to save notification');
        }
    } catch (error) {
        console.error('ERROR SAVE NOTIFICATION = ', error);
    }
};

export const deleteNotifications = async (notificationIds: string[]) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });

    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}notifications/delete`;

    try {
        const response = await fetch(urlRequest, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({ ids: notificationIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete notifications');
        }
    } catch (error) {
        console.error('ERROR DELETE NOTIFICATIONS = ', error);
    }
};
