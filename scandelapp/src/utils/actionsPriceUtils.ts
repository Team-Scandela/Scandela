// Importing required dependencies
const encodedCredentials = btoa(
    `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
);
const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Basic ${encodedCredentials}`,
});

// Function to get the price of a specific type of lamp
export const getLampPrice = async (lampType: string) => {
    const urlRequest = `${process.env.REACT_APP_BACKEND_URL}lamps/lamp/${lampType}`;
    try {
        const response = await fetch(urlRequest, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const price = await response.text(); // Assuming the response is a plain text
        return price;
    } catch (error) {
        console.error('ERROR GET LAMP PRICE = ', error);
    }
};
