import React, { useState } from 'react';
import {
    NameInputContainer,
    SendNameButtonContainer,
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

interface ModifyLampProps {
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

const ModifyLamp: React.FC<ModifyLampProps> = ({ isDark }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [lamptype, setLamptype] = useState('');
    const [foyertype, setFoyertype] = useState('');

    const [isRequestOk, setIsRequestOk] = useState(true);
    const [isNameOk, setIsNameOk] = useState(false);

    const { t } = useTranslation();

    const username = 'tester';
    const password = 'T&st';

    const modifyLamp = async () => {
        const urlmodification = 'https://serverdela.onrender.com/lamps/' + name;
        try {
            const response = await fetch(urlmodification, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    lat: parseFloat(latitude),
                    long: parseFloat(longitude),
                    height: parseInt(height, 10),
                    lamptype: lamptype,
                    foyertype: foyertype,
                }),
            });
            const responsebody = await response.text();
            if (response.status === 200) {
                console.log(
                    'MODIFICATION APPLIED, status code: ' + response.status
                );
                setIsRequestOk(true);
                setIsNameOk(true);
            } else {
                setIsRequestOk(false);
                console.log(
                    'FAIL TO APPLY MODIFICATION, status code: ' +
                        response.status
                );
            }
        } catch (error) {
            console.log(
                'FAIL TO APPLY MODIFICATION, error message: ' + error.message
            );
        }
    };

    const getLamp = async () => {
        // const username = process.env.SPRING_USER;
        // const password = process.env.SPRING_PASSWORD;

        const urlLamp = 'https://serverdela.onrender.com/lamps/' + name;
        console.log(urlLamp);

        try {
            const response = await fetch(urlLamp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            console.log('code de response = ' + response.status);
            const lampData = await response.json();

            if (response.status === 200) {
                console.log('SUCCES TO GET LAMP, status = ', response.status);
                setIsRequestOk(true);
                setIsNameOk(true);
                setAddress(lampData.address);
                setLatitude(lampData.latitude);
                setLongitude(lampData.longitude);
                setHeight(lampData.height);
                setLamptype(lampData.lamptype);
                setFoyertype(lampData.foyertype);
            } else {
                setIsRequestOk(false);
                setIsNameOk(false);
                console.log('CANNOT GET LAMP, status = ' + response.status);
            }
        } catch (error) {
            console.log('CANNOT GET LAMP, error message = ' + error);
            setIsRequestOk(false);
            setIsNameOk(false);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setIsNameOk(false);
        setIsRequestOk(true);
        setAddress('');
        setLatitude('');
        setLongitude('');
        setHeight('');
        setLamptype('');
        setFoyertype('');
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

    const handleGetLamp = () => {
        if (isRequestOk === true) getLamp();
    };

    const handleModifyEntity = () => {
        modifyLamp();
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
            {!isNameOk && (
                <SendNameButtonContainer>
                    <button
                        onClick={handleGetLamp}
                        style={{
                            backgroundColor: isRequestOk ? Yellow : 'red',
                        }}
                    >
                        {t('validate')}
                    </button>
                </SendNameButtonContainer>
            )}
            {isNameOk && (
                <>
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
                            onClick={handleModifyEntity}
                            style={{
                                backgroundColor: isRequestOk ? Yellow : 'red',
                            }}
                        >
                            {t('validate')}
                        </button>
                    </ValidateButtonContainer>
                </>
            )}
        </div>
    );
};

export default ModifyLamp;
