export const sendTicket = async (title: string, description: string, choosenItem: string) => {
    try {
        const username = process.env.REACT_APP_REQUEST_USER;
        const password = process.env.REACT_APP_REQUEST_PASSWORD;
        const urlRequest =
            process.env.REACT_APP_BACKEND_URL + 'tickets/create';

        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify({
                author: '',
                title: title,
                content: description,
                date: new Date().toISOString(),
                status: 0,
                category: choosenItem,
            }),
        });
    } catch (error) {
        console.log(error);
    }
};