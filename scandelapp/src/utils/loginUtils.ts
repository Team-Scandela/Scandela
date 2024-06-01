export const signUp = async (
    email: string,
    username: string,
    password: string
) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'users/create';

    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                town: {
                    id: '2dac2740-1d45-42d7-af5e-13b98cdf3af4',
                },
                email: email,
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error("L'inscription a échoué");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de l'inscription", error);
    }
};

export const signIn = async (email: string, password: string) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });

    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'users/signin';

    try {
        const response = await fetch(urlRequest, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('La connexion a échoué');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la connexion', error);
    }
};
