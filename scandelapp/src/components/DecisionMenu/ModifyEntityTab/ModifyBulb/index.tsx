import React, { useState } from 'react';
import {
    ReferenceInputContainer,
    SendReferenceButtonContainer,
    IntensityInputContainer,
    ConsommationInputContainer,
    ValidateButtonContainer,
} from './elements';
import LoadingSpinner from '../../../LoadingSpinner';
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
    const [id, setId] = useState('');
    const [isRequestOk, setIsRequestOk] = useState(true);
    const [isReferenceOk, setIsReferenceOk] = useState(false);

    const [isWaiting, setIsWaiting] = useState(false);
    const { t } = useTranslation();

    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;

    const modifyBulb = async () => {
        const urlmodification =
            process.env.REACT_APP_BACKEND_URL + 'bulbs/' + id;
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
                setIsWaiting(false);
            } else {
                setIsRequestOk(false);
                setIsWaiting(false);
            }
        } catch (error) {
            console.log('ERROR MODIFICATION BULB = ' + error);
            setIsRequestOk(false);
            setIsWaiting(false);
        }
    };

    const getBulb = async () => {
        const urlBulb =
            process.env.REACT_APP_BACKEND_URL + 'bulbs?name=' + reference;
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
            console.log(bulbData[0]);
            if (response.status === 200) {
                setConsommation(bulbData[0].consommation);
                setIntensity(bulbData[0].intensity);
                setId(bulbData[0].id);
                setIsRequestOk(true);
                setIsReferenceOk(true);
                setIsWaiting(false);
            } else {
                setIsRequestOk(false);
                setIsReferenceOk(false);
                setIsWaiting(false);
            }
        } catch (error) {
            console.log('ERROR GET BULB = ' + error);
            setIsRequestOk(false);
            setIsReferenceOk(false);
            setIsWaiting(false);
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
        if (isRequestOk === true) {
            setIsWaiting(true);
            getBulb();
        }
    };

    const handleModifyEntity = () => {
        setIsWaiting(true);
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
            {!isReferenceOk && !isWaiting && (
                <SendReferenceButtonContainer
                    isDark={isDark}
                    onClick={handleGetBulb}
                >
                    {t('validate')}
                </SendReferenceButtonContainer>
            )}
            {!isReferenceOk && isWaiting && (
                <SendReferenceButtonContainer isDark={isDark}>
                    <LoadingSpinner width={40} />
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
                </>
            )}
            {isReferenceOk && !isWaiting && (
                <ValidateButtonContainer
                    isDark={isDark}
                    onClick={handleModifyEntity}
                >
                    {t('validate')}
                </ValidateButtonContainer>
            )}
            {isReferenceOk && isWaiting && (
                <ValidateButtonContainer isDark={isDark}>
                    <LoadingSpinner width={40} />
                </ValidateButtonContainer>
            )}
        </div>
    );
};

export default ModifyBulb;
