import { userId } from '../utils/userUtils';

export const subscription = async (formValues: any) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'subscription';
    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                userid: userId,
                ...formValues,
            }),
        });

        if (!response.ok) {
            throw new Error("L'achat a échoué");
        }

        const data = await response.json();
        return data;
        // updateUserInfo({ isPremiumActivated: true }); idée du résultat
    } catch (error) {
        console.error("Erreur lors de l'achat", error);
    }
};