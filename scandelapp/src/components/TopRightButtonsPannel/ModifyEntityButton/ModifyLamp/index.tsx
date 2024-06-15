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

import LoadingSpinner from '../../../LoadingSpinner';

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
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [lamptype, setLamptype] = useState('');
    const [foyertype, setFoyertype] = useState('');

    const [isRequestOk, setIsRequestOk] = useState(true);
    const [isNameOk, setIsNameOk] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    const { t } = useTranslation();

    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const toNbrLat = parseFloat(latitude);
    const toNbrLong = parseFloat(longitude);
    const toNbrHeight = parseFloat(height);
    const modifyLamp = async () => {
        const urlmodification =
            process.env.REACT_APP_BACKEND_URL + 'lamps/' + id;
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
                    latitude: toNbrLat,
                    longitude: toNbrLong,
                    height: toNbrHeight,
                    lampType: lamptype,
                    foyerType: foyertype,
                }),
            });
            const responsebody = await response.text();
            console.log(responsebody);
            if (response.status === 200) {
                console.log(
                    'MODIFICATION APPLIED, status code: ' + response.status
                );
                setIsRequestOk(true);
                setIsNameOk(true);
                setIsWaiting(false);
            } else {
                setIsRequestOk(false);
                console.log(
                    'FAIL TO APPLY MODIFICATION, status code: ' +
                        response.status
                );
                setIsWaiting(false);
            }
        } catch (error) {
            console.log(
                'FAIL TO APPLY MODIFICATION, error message: ' + error.message
            );
            setIsWaiting(false);
        }
    };

    const getLamp = async () => {
        const urlLamp =
            process.env.REACT_APP_BACKEND_URL + 'lamps/name/' + name;
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
            console.log(lampData);
            if (response.status === 200) {
                console.log('SUCCES TO GET LAMP, status = ', response.status);
                setId(lampData.id);
                setAddress(lampData.address);
                setLatitude(lampData.latitude);
                setLongitude(lampData.longitude);
                setHeight(lampData.height);
                setLamptype(lampData.lampType);
                setFoyertype(lampData.foyerType);
                setIsRequestOk(true);
                setIsNameOk(true);
                setIsWaiting(false);
            } else {
                setIsRequestOk(false);
                setIsNameOk(false);
                console.log('CANNOT GET LAMP, status = ' + response.status);
                setIsWaiting(false);
            }
        } catch (error) {
            console.log('CANNOT GET LAMP, error message = ' + error);
            setIsRequestOk(false);
            setIsNameOk(false);
            setIsWaiting(false);
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
        if (isRequestOk === true) {
            setIsWaiting(true);
            getLamp();
        }
    };

    const handleModifyEntity = () => {
        setIsWaiting(true);
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
            {!isNameOk && !isWaiting && (
                <SendNameButtonContainer
                    onClick={handleGetLamp}
                    isDark={isDark}
                >
                    {t('validate')}
                </SendNameButtonContainer>
            )}
            {!isNameOk && isWaiting && (
                <SendNameButtonContainer isDark={isDark}>
                    <LoadingSpinner width={40} />
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
                </>
            )}
            {isNameOk && !isWaiting && (
                <ValidateButtonContainer
                    isDark={isDark}
                    onClick={handleModifyEntity}
                >
                    {t('Valider')}
                </ValidateButtonContainer>
            )}
            {isNameOk && isWaiting && (
                <ValidateButtonContainer isDark={isDark}>
                    <LoadingSpinner width={40} />
                </ValidateButtonContainer>
            )}
        </div>
    );
};

export default ModifyLamp;
