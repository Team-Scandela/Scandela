import React, { useState } from 'react';
import { Yellow } from '../../../colors';

import {
    ReferenceInputContainer,
    IntensityInputContainer,
    ConsommationInputContainer,
    ValidateButtonContainer,
} from './elements';

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

    const { t } = useTranslation();

    const createBulb = async () => {
        // const username = process.env.SPRING_USER;
        // const password = process.env.SPRING_PASSWORD;
        const username = 'tester';
        const password = 'T&st';
        try {
            const response = await fetch(
                'https://serverdela.onrender.com/bulbs/create',
                {
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
                }
            );
            console.log('code de response = ' + response.status);
            if (response.status === 200) {
                setIsRequestOk(true);
                setReference('');
                setConsommation('');
                setIntensity('');
            } else setIsRequestOk(false);
        } catch (error) {
            console.log('ERROR CREATE BULB = ' + error);
            setIsRequestOk(false);
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
        if (isRequestOk === true) createBulb();
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

export default AddBulb;
