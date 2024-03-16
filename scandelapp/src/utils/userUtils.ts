export let userId = localStorage.getItem('userId') || 0;

export const setUserId = (newId: any) => {
    userId = newId;
    localStorage.setItem('userId', newId);
}

export const getUser = async () => {
    const username = 'tester';
    const password = 'T&st';
    console.log(userId);
    try {
        const responseUser = await fetch(
            `https://serverdela.onrender.com/users/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            }
        );

        const user = await responseUser.json();
        return user;
    } catch (error) {
        console.log('ERROR GET USER = ' + error);
    }
}

export const putUser = async (updatedUserData: any) => {
    const username = 'tester';
    const password = 'T&st';
    try {
        const response = await fetch(
            `https://serverdela.onrender.com/users/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(
                        `${username}:${password}`
                    )}`,
                },
                body: JSON.stringify(updatedUserData),
            }
        );
    } catch (error) {
        console.log('ERROR UPDATE USER = ' + error);
    }
}