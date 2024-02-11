import * as React from 'react';

export const handleSearchUtils = async (
    value: string,
    lat: number,
    setLat: React.Dispatch<React.SetStateAction<number>>,
    lng: number,
    setLng: React.Dispatch<React.SetStateAction<number>>,
    zoom: number,
    setZoom: React.Dispatch<React.SetStateAction<number>>
): Promise<void> => {
    if (value !== '') {
        try {
            // request to get coordinate from the search
            const key = 'AIzaSyB7QCFgF77yvUyhkjRef8B3HWb0UqGexlo';
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    value
                )}&key=${key}`
            );
            const data = await response.json();

            //  check if coordinate found for the current value
            if (data.status === 'OK') {
                const result = data.results[0];
                const { lat, lng } = result.geometry.location;
                // set new let lng
                setLat(lat);
                setLng(lng);

                // set new zoom compare to the right level of zoom
                console.log('type = ' + result.types[0]);
                if (
                    result.types[0] === 'street_adress' ||
                    result.types[0] === 'premise'
                ) {
                    // zoom for precise address
                    setZoom(18);
                } else if (result.types[0] === 'route') {
                    //  zoom for a country
                    setZoom(17);
                } else if (result.types[0] === 'country') {
                    //  zoom for a country
                    setZoom(5);
                } else if (result.types[0] === 'locality') {
                    //  zoom for a city
                    setZoom(12);
                } else if (result.types[0] === 'neighborhood') {
                    //  zoom for a nightborhood
                    setZoom(14);
                } else {
                    setZoom(16);
                }
            } else {
                // Handle error case
                console.error('Geocoding API error:', data.status);
            }
        } catch (error) {
            // Handle fetch error
            console.error('Geocoding API request failed:', error);
        }
    } else {
        // default coordinate of the city
        value = 'Nantes'; // principal city enter on the Scandel'user account
        const key = process.env.REACT_APP_APIKEY;
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                value
            )}&key=${key}`
        );
        const data = await response.json();

        if (data.status === 'OK') {
            //  set base coordinate to the principal city of the user
            const result = data.results[0];
            const { lat, lng } = result.geometry.location;
            setLat(lat);
            setLng(lng);
            setZoom(12);
        }
    }
};
