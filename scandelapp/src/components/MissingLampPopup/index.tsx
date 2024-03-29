import React, { useState } from 'react';
import { InputWrapper } from '../SearchBar/elements';

import {
    PopupWindow,
    IconContainer,
    TextInput,
    PopupTextInfoTitle,
} from './elements';

import * as images from './ficheImports';

interface InfoIconPopupProps {
    isDark: boolean;
}

const InfoIconPopup: React.FC<InfoIconPopupProps> = ({ isDark }) => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isEnteringID, setEnteringID] = useState(true);
    const [bulbID, setBulbID] = React.useState<string>('');
    const [bulbValue, setBulbValue] = React.useState<string>('');

    const createBulb = async () => {
        // const username = process.env.SPRING_USER;
        // const password = process.env.SPRING_PASSWORD;
        const username = 'tester';
        const password = 'T&st';
        const url = process.env.REACT_APP_BACKEND_URL + '/bulbs/create';

        try {
            const response = await fetch('https://serverdela.onrender.com/bulbs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    intensity: 0,
                    consommation: parseInt(bulbValue, 10),
                    reference: bulbID,
                }),
            });
        } catch (error) {
            console.log('ERROR CREATE BULB = ' + error);
        }
    };

    const handleInfoIconClick = () => {
        setPopupVisible(!isPopupVisible);
        setEnteringID(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEnteringID) {
            setBulbID(e.target.value);
        } else {
            setBulbValue(e.target.value);
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (isEnteringID) {
                setEnteringID(false);
            } else {
                setPopupVisible(false);
                createBulb();
            }
        }
    };

    return (
        <>
            <IconContainer>
                <img
                    src={images.switch_off}
                    alt="Flash"
                    draggable="false"
                    style={{
                        position: 'absolute',
                        top: '350px',
                        left: '350px',
                        width: '20px',
                        userSelect: 'none',
                    }}
                    onClick={handleInfoIconClick}
                />
            </IconContainer>
            {isPopupVisible && (
                <PopupWindow>
                    <PopupTextInfoTitle>
                        {isEnteringID ? 'Bulb ID' : 'Bulb value en Kwh'}
                    </PopupTextInfoTitle>
                    <TextInput isdark={isDark}>
                        <InputWrapper
                            placeholder={
                                isEnteringID ? 'Bulb ID' : 'Bulb value en Kwh'
                            }
                            value={isEnteringID ? bulbID : bulbValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                        />
                    </TextInput>
                </PopupWindow>
            )}
        </>
    );
};

export default InfoIconPopup;
