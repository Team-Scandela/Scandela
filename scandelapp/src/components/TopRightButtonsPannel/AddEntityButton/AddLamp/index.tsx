import React, { useState } from 'react';
import {
    NameInputContainer,
    AddressInputContainer,
    LatitudeInputContainer,
    LongitudeInputContainer,
    HeightInputContainer,
    LamptypeInputContainer,
    FoyertypeInputContainer,
    ValidateButtonContainer,
} from './elements';

import { Yellow } from '../../../../colors';

import { useTranslation } from 'react-i18next';

interface AddLampProps {
    isDark: boolean;
}

interface Bulb {
    name: string;
    intensity: number;
}

interface Lamp {
    name: string;
    address: string;
    lat: number;
    long: number;
    height: number;
    lamptype: string;
    foyertype: string;
}

const AddLamp: React.FC<AddLampProps> = ({ isDark }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [lamptype, setLamptype] = useState('');
    const [foyertype, setFoyertype] = useState('');

    const [isRequestOk, setIsRequestOk] = useState(true);
    const { t } = useTranslation();
    const createLamp = async () => {
        try {
            const username = process.env.REACT_APP_REQUEST_USER;
            const password = process.env.REACT_APP_REQUEST_PASSWORD;
            const urlRequest =
                process.env.REACT_APP_BACKEND_URL + 'lamps/create';

            const response = await fetch(urlRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    lat: latitude,
                    long: longitude,
                    height: height,
                    lamptype: lamptype,
                    foyertype: foyertype,
                }),
            });
            const responsebody = await response.text();
            console.log(responsebody);
            console.log(response);
            if (!response.ok) {
                console.error(
                    `Failed to add ${name} to the database. Status: ${response.status}`
                );
            }
        } catch (error) {
            console.error(`Error creating lamp : ${error.message}`);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setIsRequestOk(true);
    };

    const verifyName = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleAddressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddress(event.target.value);
        setIsRequestOk(true);
    };

    const verifyAddress = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleLatitudeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLatitude(event.target.value);
        setIsRequestOk(true);
    };

    const verifyLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleLongitudeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLongitude(event.target.value);
        setIsRequestOk(true);
    };

    const verifyLongitude = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);
        setIsRequestOk(true);
    };

    const verifyHeight = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleLamptypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLamptype(event.target.value);
        setIsRequestOk(true);
    };

    const verifyLamptype = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleFoyertypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFoyertype(event.target.value);
        setIsRequestOk(true);
    };

    const verifyFoyertype = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleCreateEntity = () => {
        if (isRequestOk === true) createLamp();
    };

    return (
        <div style={{ color: isDark ? 'white' : 'black' }}>
            <NameInputContainer
                isDark={isDark}
                placeholder={t('name')}
                value={name}
                onChange={handleNameChange}
                onKeyDown={verifyName}
            />
            <AddressInputContainer
                isDark={isDark}
                placeholder={t('address')}
                value={address}
                onChange={handleAddressChange}
                onKeyDown={verifyAddress}
            />

            <LatitudeInputContainer
                isDark={isDark}
                placeholder={t('latitude')}
                value={latitude}
                onChange={handleLatitudeChange}
                onKeyDown={verifyLatitude}
            />

            <LongitudeInputContainer
                isDark={isDark}
                placeholder={t('longitude')}
                value={longitude}
                onChange={handleLongitudeChange}
                onKeyDown={verifyLongitude}
            />

            <HeightInputContainer
                isDark={isDark}
                placeholder={t('height')}
                value={height}
                onChange={handleHeightChange}
                onKeyDown={verifyHeight}
            />

            <LamptypeInputContainer
                isDark={isDark}
                placeholder={t('lamptype')}
                value={lamptype}
                onChange={handleLamptypeChange}
                onKeyDown={verifyLamptype}
            />

            <FoyertypeInputContainer
                isDark={isDark}
                placeholder={t('foyertype')}
                value={foyertype}
                onChange={handleFoyertypeChange}
                onKeyDown={verifyFoyertype}
            />

            <ValidateButtonContainer>
                <button
                    onClick={handleCreateEntity}
                    style={{ backgroundColor: isRequestOk ? Yellow : 'red' }}
                >
                    {t('validate')}
                </button>
            </ValidateButtonContainer>
        </div>
    );
};

export default AddLamp;
