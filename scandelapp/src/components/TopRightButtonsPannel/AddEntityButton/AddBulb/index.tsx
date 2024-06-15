import React, { useState } from 'react';
import { Yellow } from '../../../../colors';

import {
    ReferenceInputContainer,
    IntensityInputContainer,
    ConsommationInputContainer,
    ValidateButtonContainer,
} from './elements';

import LoadingSpinner from '../../../LoadingSpinner';

import { useTranslation } from 'react-i18next';

interface AddBulbProps {
    isDark: boolean;
}

interface Bulb {
    reference: string;
    intensity: number;
    consommation: number;
}

const AddBulb: React.FC<AddBulbProps> = ({ isDark }) => {
    const [reference, setReference] = useState('');
    const [intensity, setIntensity] = useState('');
    const [consommation, setConsommation] = useState('');
    const [isRequestOk, setIsRequestOk] = useState(true);

    const [isWaiting, setIsWaiting] = useState(false);
    const { t } = useTranslation();

    const createBulb = async () => {
        const username = process.env.REACT_APP_REQUEST_USER;
        const password = process.env.REACT_APP_REQUEST_PASSWORD;
        const urlRequest = process.env.REACT_APP_BACKEND_URL + 'bulbs/create';

        try {
            const response = await fetch(urlRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    intensity: parseInt(intensity, 10),
                    consommation: parseInt(consommation, 10),
                    reference: reference,
                }),
            });
            console.log('code de response = ' + response.status);
            if (response.status === 200) {
                setIsRequestOk(true);
                setReference('');
                setConsommation('');
                setIntensity('');
                setIsWaiting(false);
            } else {
                setIsRequestOk(false);
                setIsWaiting(false);
            }
        } catch (error) {
            console.log('ERROR CREATE BULB = ' + error);
            setIsRequestOk(false);
            setIsWaiting(false);
        }
    };
    const handleReferenceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setReference(event.target.value);
        setIsRequestOk(true);
    };

    const verifyReference = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleIntensityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIntensity(event.target.value);
        setIsRequestOk(true);
    };

    const verifyIntensity = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const handleConsommationChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConsommation(event.target.value);
        setIsRequestOk(true);
    };

    const verifyConsommation = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {};

    const handleCreateEntity = () => {
        if (isRequestOk === true) {
            setIsWaiting(true);
            createBulb();
        }
    };

    return (
        <div style={{ color: isDark ? 'white' : 'black' }}>
            <ReferenceInputContainer
                isDark={isDark}
                placeholder={t('reference')}
                value={reference}
                onChange={handleReferenceChange}
                onKeyDown={verifyReference}
            />
            <IntensityInputContainer
                isDark={isDark}
                placeholder={t('intensity')}
                value={intensity}
                onChange={handleIntensityChange}
                onKeyDown={verifyIntensity}
            />

            <ConsommationInputContainer
                isDark={isDark}
                placeholder={t('consommation')}
                value={consommation}
                onChange={handleConsommationChange}
                onKeyDown={verifyConsommation}
            />
            {!isWaiting && (
                <ValidateButtonContainer
                    isDark={isDark}
                    onClick={handleCreateEntity}
                >
                    {t('Valider')}
                </ValidateButtonContainer>
            )}
            {isWaiting && (
                <ValidateButtonContainer isDark={isDark}>
                    <LoadingSpinner width={40} />
                </ValidateButtonContainer>
            )}
        </div>
    );
};

export default AddBulb;
