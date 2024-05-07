import React, { useState } from 'react';
import { Yellow } from '../../../../colors';

import {
    ReferenceInputContainer,
    SendReferenceButtonContainer,
    IntensityInputContainer,
    ConsommationInputContainer,
    ValidateButtonContainer,
} from './elements';

import { useTranslation } from 'react-i18next';

interface ModifyBulbProps {
    isDark: boolean;
}

interface Bulb {
    reference: string;
    intensity: number;
    consommation: number;
}

const ModifyBulb: React.FC<ModifyBulbProps> = ({ isDark }) => {
    const [reference, setReference] = useState('');
    const [intensity, setIntensity] = useState('');
    const [consommation, setConsommation] = useState('');

    const [isRequestOk, setIsRequestOk] = useState(true);
    const [isReferenceOk, setIsReferenceOk] = useState(false);

    const { t } = useTranslation();

    const username = 'tester';
    const password = 'T&st';
    //const username = process.env.SPRING_USER;
    //const password = process.env.SPRING_PASSWORD;

    const modifyBulb = async () => {
        
        const urlmodification =
            'https://api.scandela.fr/bulbs/' + reference;

        console.log('URL DE MODIFICATION = ' + urlmodification);
        try {
            const response = await fetch(urlmodification, {
                method: 'PUT',
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
                console.log('MODIFICATION applied');
                setIsRequestOk(true);
                setReference('');
                setConsommation('');
                setIntensity('');
            } else setIsRequestOk(false);
        } catch (error) {
            console.log('ERROR MODIFICATION BULB = ' + error);
            setIsRequestOk(false);
        }
    };

    const getBulb = async () => {
        // const username = process.env.SPRING_USER;
        // const password = process.env.SPRING_PASSWORD;

        const urlBulb = 'https://api.scandela.fr/bulbs/' + reference;

        console.log(urlBulb);

        try {
            const response = await fetch(urlBulb, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            console.log('code de response = ' + response.status);
            const bulbData = await response.json();

            if (response.status === 200) {
                setIsRequestOk(true);
                setIsReferenceOk(true);
                setConsommation(bulbData.consommation);
                setIntensity(bulbData.intensity);
            } else {
                setIsRequestOk(false);
                setIsReferenceOk(false);
            }
        } catch (error) {
            console.log('ERROR CREATE BULB = ' + error);
            setIsRequestOk(false);
            setIsReferenceOk(false);
        }
    };

    const handleReferenceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setReference(event.target.value);
        setIsReferenceOk(false);
        setIsRequestOk(true);
        setConsommation('');
        setIntensity('');
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

    const handleGetBulb = () => {
        if (isRequestOk === true) getBulb();
    };

    const handleModifyEntity = () => {
        modifyBulb();
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
            {!isReferenceOk && (
                <SendReferenceButtonContainer>
                    <button
                        onClick={handleGetBulb}
                        style={{
                            backgroundColor: isRequestOk ? Yellow : 'red',
                        }}
                    >
                        {t('validate')}
                    </button>
                </SendReferenceButtonContainer>
            )}
            {isReferenceOk && (
                <>
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

export default ModifyBulb;
