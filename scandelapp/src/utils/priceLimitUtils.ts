import * as React from 'react';

export const getElectricityPrice = async () => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });

    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'electricityPrice';

    try {
        const response = await fetch(urlRequest, {
                method: 'GET',
                headers: headers,
            }
        );

        const price = await response.json();
        return price.price;
    } catch (error) {
        console.log('ERROR GET ELECTRICITY PRICE = ' + error);
    }
};

export const getPriceLimit = async () => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'pricelimits';
    try {
        const response = await fetch(urlRequest, {
                method: 'GET',
                headers: headers,
            }
        );
        const priceLimit = await response.json();
        return priceLimit;
    } catch (error) {
        console.log('ERROR GET PRICE LIMIT = ' + error);
    }
}

export const createPriceLimit = async (priceLimit: any) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'pricelimits/create';
    try {
        const response = await fetch(urlRequest, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(priceLimit),
            }
        );
    } catch (error) {
        console.log('ERROR POST CREATE PRICE LIMIT = ' + error);
    }
}

export const updatePriceLimit = async (id: any, priceLimit: any) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'pricelimits/' + id;
    try {
        const response = await fetch(urlRequest, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(id, priceLimit),
            }
        );
    } catch (error) {
        console.log('ERROR UPDATE PRICE LIMIT = ' + error);
    }
}

export const deletePriceLimit = async (id: any) => {
    const encodedCredentials = btoa(
        `${process.env.REACT_APP_REQUEST_USER}:${process.env.REACT_APP_REQUEST_PASSWORD}`
    );
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
    });
    const urlRequest = process.env.REACT_APP_BACKEND_URL + 'pricelimits/delete/' + id;
    try {
        const response = await fetch(urlRequest, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(id),
            }
        );
    } catch (error) {
        console.log('ERROR DELETE PRICE LIMIT = ' + error);
    }
}