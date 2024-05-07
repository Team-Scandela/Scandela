import { useState, useEffect } from 'react';
import {  } from './elements';

/** EletricityPrice setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface EletricityPriceProps {
    isDark: boolean;
}

const EletricityPrice: React.FC<EletricityPriceProps> = ({ isDark }) => {
    const [currentElectricityPrice, setCurrentElectricityPrice] = useState(0);

    useEffect(() => {
        const getElectricityPrice = async () => {
            const username = 'tester';
            const password = 'T&st';
            try {
                const responseUser = await fetch(
                    `https://api.scandela.fr/electricityPrice`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                        },
                    }
                );

                const price = await responseUser.json();
                console.log(price);
                setCurrentElectricityPrice(price);
            } catch (error) {
                console.log('ERROR GET ELECTRICITY PRICE = ' + error);
            }
        };

        getElectricityPrice();
    }, []);

    return (
        <div>
            {currentElectricityPrice === 0 ? "Loading ..." : currentElectricityPrice}
        </div>
    );
};

export default EletricityPrice;
