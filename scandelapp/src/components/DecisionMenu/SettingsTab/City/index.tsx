import { useRef } from 'react';
import {
    ImportButton,
    DescriptionText,
    TooltipTitle,
    RestartTutoButtonContainer,
    TutorielTitle,
} from './elements';
import { useTranslation } from 'react-i18next';
import RadioButton from '../../../RadioButton';

/** City tab setting component props
 * @param {boolean} isDark - If the mode is dark or not
 */

interface CityProps {
    isDark: boolean;
    tooltipPreference: boolean;
    setTooltipPreference: (value: boolean) => void;
    setShowTutoriel: (value: boolean) => void;
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

const City: React.FC<CityProps> = ({
    isDark,
    tooltipPreference,
    setTooltipPreference,
    setShowTutoriel,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation();

    const addToDB = async (data: Lamp[]) => {
        for (const lamp of data) {
            try {
                const username = process.env.REACT_APP_REQUEST_USER;
                const password = process.env.REACT_APP_REQUEST_PASSWORD;
                const urlRequest =
                    process.env.REACT_APP_BACKEND_URL + 'lamps/create';

                const response = await fetch(urlRequest, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(
                            `${username}:${password}`
                        )}`,
                    },
                    body: JSON.stringify({
                        name: lamp.name,
                        address: lamp.address,
                        lat: lamp.lat,
                        long: lamp.long,
                        height: lamp.height,
                        lamptype: lamp.lamptype,
                        foyertype: lamp.foyertype,
                    }),
                });
                const responsebody = await response.text();
                console.log(responsebody);
                console.log(response);
                if (!response.ok) {
                    console.error(
                        `Failed to add ${lamp.name} to the database. Status: ${response.status}`
                    );
                }
            } catch (error) {
                console.error(
                    `Error adding ${lamp.name} to the database: ${error.message}`
                );
            }
        }
    };

    const parseData = (data: any) => {
        const lampList: Lamp[] = [];
        if (Array.isArray(data)) {
            data.forEach((element: any) => {
                const lamp: Lamp = {
                    name: element.fields.numero,
                    address: element.fields.nom_voie,
                    lat: element.geometry.coordinates[1],
                    long: element.geometry.coordinates[0],
                    height: element.fields.hauteur_support,
                    lamptype: element.fields.type_lampe,
                    foyertype: element.fields.type_foyer,
                };
                lampList.push(lamp);
            });
        } else {
            console.error(
                'The file is not an array, please check the file format'
            );
        }
        return lampList;
    };

    const downloadData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0], 'UTF-8');
            reader.onload = (evt) => {
                if (evt.target) {
                    const fileContent = evt.target.result;
                    const parsedData = parseData(
                        JSON.parse(fileContent as string)
                    );
                    addToDB(parsedData);
                }
            };
        }
    };

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const toggleTooltipPreference = () => {
        setTooltipPreference(!tooltipPreference);
    };

    return (
        <div>
            <ImportButton
                isDark={isDark}
                onClick={() => openFilePicker()}
            ></ImportButton>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={downloadData}
            />
            <DescriptionText isDark={isDark}>
                {t('loadDataDescription')}
            </DescriptionText>
            <TooltipTitle isDark={isDark}>{t('activateTooltip')}</TooltipTitle>
            <RadioButton
                isDark={isDark}
                top={'430px'}
                left={'340px'}
                trigger={tooltipPreference}
                setTrigger={toggleTooltipPreference}
            />
            <RestartTutoButtonContainer
                isDark={isDark}
                onClick={() => setShowTutoriel(true)}
            >
                <TutorielTitle>{t('restartTuto')}</TutorielTitle>
            </RestartTutoButtonContainer>
        </div>
    );
};

export default City;
