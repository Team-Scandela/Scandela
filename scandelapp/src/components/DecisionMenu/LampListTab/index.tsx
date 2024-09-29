import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    LampListContainer,
    LampListCard,
    LampListCardTitle,
    LampListCardAdress,
    LampListCardBulb,
    LampListCardInput,
    LampListOrderButton,
    LampListFilterButton,
    PupFilterContainer,
    PUpFilterContent,
    PUpFilterTitle,
    PaginationNextButton,
    PaginationPreviousButton,
    PaginationPagesButton,
    PUpFilterCloseButton,
    PUpFilterDropdown,
    PUpFilterOption,
    PupFilterSubtitle,
    PupFilterApplyButton,
    LampPupContainer,
    LampPupContent,
    LampPupClose,
    LampPupAdress,
    LampPupBulb,
    LampPupGeoloc,
    LampPupTitle,
    LampPupIconAdress,
    LampPupIconBulb,
    LampPupHeight,
    LampPupIconLamp,
    TotalLamp,
    PupBulbButton,
    PUpBulbInputName,
    PUpBulbValidateButton,
    PUpBulbInputConso,
    PUpBulbInputIntens,
    ButtonGlobalChange,
    TrashBulbButton,
    GlobalChangeTitle,
    SpinnerContainer,
} from './elements';
import { allLamps } from '../../../utils/lampUtils';
import { getConsuptionScore } from '../../../utils/gaugesUtils';
import {useGlobalChangeBoolean} from '../../../utils/globalChangeBoolean';
import LoadingSpinner from '../../LoadingSpinner';

interface LampListTabProps {
    isDark: boolean;
}

interface Lamp {
    address: string;
    foyerType: string;
    height: number;
    id: string;
    lampType: string;
    latitude: number;
    longitude: number;
    lum: number;
    name: string;
    uuidbulb: string;
}

const LampListTab: React.FC<LampListTabProps> = ({ isDark }) => {
    const [openFilter, setOpenFilter] = useState(false);
    const { t } = useTranslation();
    const [selectFilter, setSelectFilter] = useState('nothing');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLamps, setCurrentLamps] = useState<Lamp[]>([]);
    const [openPup, setOpenPup] = useState(false);
    const [selectedLamp, setSelectedLamp] = useState<Lamp | null>(null);
    const [lampLength, setLampLength] = useState(0);

    const itemsPerPage = 100;
    const [tempData, setTempData] = useState<Lamp[]>(allLamps[0]);

    const [openPupBulb, setOpenPupBulb] = useState(false);
    const [inputReference, setInputReference] = useState('');
    const username = process.env.REACT_APP_REQUEST_USER;
    const password = process.env.REACT_APP_REQUEST_PASSWORD;
    const [conso, setConso] = useState('');
    const [intensity, setIntensity] = useState('');
    const [isFailed, setIsFailed] = useState(false);
    const [isBulb, setIsBulb] = useState(false);
    const [isChangeGlobal, setGlobalBoolean] = useGlobalChangeBoolean();
    const [openPupGlobalChange, setOpenPupGlobalChange] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const updateList = () => {
        let filterData = tempData;

        // Appliquer le filtre sélectionné
        if (selectFilter === '0m') {
            filterData = tempData.filter((lamp: Lamp) => lamp.height === 0);
        }
        if (selectFilter === 'badBulb') {
            filterData = tempData.filter(
                (lamp: Lamp) =>
                    lamp.lampType !== 'LED' && lamp.lampType !== 'SHP'
            );
        }

        if (searchTerm) {
            filterData = filterData.filter(
                (lamp: Lamp) =>
                    lamp.name === searchTerm || lamp.address === searchTerm
             );
        }

        // Pagination
        const totalPages = Math.ceil(filterData.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentLamps(filterData.slice(indexOfFirstItem, indexOfLastItem));
        setLampLength(filterData.length);
    };

    useEffect(() => {
        updateList();
    }, [currentPage, tempData, searchTerm]); // Recalculer la liste à chaque modification

    // Gérer les modifications dans la barre de recherche
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setSearchTerm(e.target.value);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputReference(e.target.value);
        setIsFailed(false);
        setIsLoading(false);
    };

    const addBulbToLamp = async (idBulb: string) => {
        const urlmodification =
            process.env.REACT_APP_BACKEND_URL + 'lamps/' + selectedLamp.id;
        try {
            const response = await fetch(urlmodification, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify({
                    address: selectedLamp.address,
                    foyerType: selectedLamp.foyerType,
                    height: selectedLamp.height,
                    id: selectedLamp.id,
                    lampType: selectedLamp.lampType,
                    latitude: selectedLamp.latitude,
                    longitude: selectedLamp.longitude,
                    lum: selectedLamp.lum,
                    name: selectedLamp.name,
                    uuidbulb: idBulb,

                }),
            });
            const responsebody = await response.text();
            setTempData(prevData => prevData.map(lamp => 
                lamp.id === selectedLamp.id 
                ? { ...lamp, uuidbulb: idBulb } 
                : lamp
              ));
            if (response.status === 200) {
                console.log(
                    'MODIFICATION APPLIED, status code: ' + responsebody
                );
            setGlobalBoolean(true);
            console.log("isChangeGlobal");
            console.log(isChangeGlobal);
            console.log("isChangeGlobal");
            } else {
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
    }

    const getLamp = async () => {
        const urlLamp =
            process.env.REACT_APP_BACKEND_URL + 'lamps/' + selectedLamp.id;
        try {
            const response = await fetch(urlLamp, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            const lampData = await response.json();
            if (response.status === 200) {
                console.log('SUCCES TO GET LAMP, status = ', response.status);
            } else {
                console.log('CANNOT GET LAMP, status = ' + response.status);
            }
        } catch (error) {
            console.log('CANNOT GET LAMP, error message = ' + error);
        }
    };

    const getBulb = async () => {
        const urlBulb =
            process.env.REACT_APP_BACKEND_URL + 'bulbs?name=' + inputReference;
        try {
            const response = await fetch(urlBulb, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            const bulbData = await response.json();
            if (response.status === 200) {
                addBulbToLamp(bulbData[0].id);
                setConso(bulbData[0].consommation);
                setIntensity(bulbData[0].intensity);
                console.log("CONSO GET BULB= ", conso, " Intensity=", intensity, " bulb =", bulbData[0]);
                setIsBulb(true);
            } else {
                console.log("PAS COOL");
                setIsFailed(true);
                setIsBulb(false);
                setConso('');
                setIntensity('')
            }
        } catch (error) {
            console.log('ERROR GET BULB = ' + error);
            setIsFailed(true);
            setIsBulb(false);
        }
    };

    const chandleSuppLamp = async () => {
        console.log("SUPPRESSION");
        const urlRequest = `${process.env.REACT_APP_BACKEND_URL}lamps/delete/${selectedLamp.id}`;
    try {
        const response = await fetch(urlRequest, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });
        if (response.status === 200) {
            console.log('Lamp successfully deleted from the database');

            // Mise à jour de l'état pour enlever le lampadaire supprimé de tempData
            setTempData(prevData => prevData.filter(lamp => lamp.id !== selectedLamp.id));
            setCurrentLamps(prevData => prevData.filter(lamp => lamp.id !== selectedLamp.id));

            // Fermer la pop-up après suppression
            setOpenPup(false);
        } else {
            console.log('Error deleting lamp, status = ' + response.status);
        }
    } catch (error) {
        console.log('ERROR DELETE NOTIFICATION = ' + error);
    }
    }
    const getBulbInfo = async () => {
        const urlBulb =
            process.env.REACT_APP_BACKEND_URL + 'bulbs?name=' + inputReference;
        try {
            const response = await fetch(urlBulb, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            });

            const bulbData = await response.json();
            if (response.status === 200) {
                setConso(bulbData[0].consommation);
                setIntensity(bulbData[0].intensity);
                console.log("CONSO GET BULB INFO= ", conso, " Intensity=", intensity, " bulb =", bulbData[0]);
                setIsBulb(true);
            } else {
                setConso('');
                setIntensity('')
                setIsBulb(false);
            }
        } catch (error) {
            console.log('ERROR GET BULB = ' + error);
            setIsBulb(false);
        }
    };
    
    return (
        <div>
            { isLoading &&
                <SpinnerContainer>
                    <LoadingSpinner />
                </SpinnerContainer>
    }
            <LampListCardInput placeholder="Search" value={searchTerm} onChange={handleSearchChange}>
            </LampListCardInput>
            <LampListFilterButton onClick={() => setOpenFilter(true)} />
            {openFilter && (
                <PupFilterContainer>
                    <PUpFilterContent>
                        <PUpFilterTitle>{t('filterAdvcanced')}</PUpFilterTitle>
                        <PUpFilterCloseButton
                            onClick={() => setOpenFilter(false)}
                        />
                        <PUpFilterDropdown
                            placeholder="Type"
                            value={selectFilter}
                            onChange={(e: any) =>
                                setSelectFilter(e.target.value)
                            }
                        >
                            <PUpFilterOption value="nothing">
                                {t('noFilter')}
                            </PUpFilterOption>
                            <PUpFilterOption value="0m">
                                {t('onTheGround')}
                            </PUpFilterOption>
                            <PUpFilterOption value="badBulb">
                                {t('badBulb')}
                            </PUpFilterOption>
                        </PUpFilterDropdown>
                        <PupFilterSubtitle>
                            {t('selectFilter')}
                        </PupFilterSubtitle>
                        <PupFilterApplyButton
                            onClick={() => (setOpenFilter(false), updateList())}
                        >
                            {t('apply')}
                        </PupFilterApplyButton>
                    </PUpFilterContent>
                </PupFilterContainer>
            )}
            <LampListContainer>
                {currentLamps.map(
                    (lamp: any, index: number) =>
                        lamp.name != undefined && (
                            <LampListCard
                                key={index}
                                isDark={isDark}
                                onClick={() => (
                                    setOpenPup(true), setSelectedLamp(lamp), getBulbInfo()
                                )}
                            >
                                <LampListCardTitle>
                                    {lamp.name}
                                </LampListCardTitle>
                                <LampListCardAdress>
                                    {lamp.address}
                                </LampListCardAdress>
                                <LampListCardBulb>
                                    {lamp.lampType}
                                </LampListCardBulb>
                            </LampListCard>
                        )
                )}
            </LampListContainer>
            <PaginationNextButton
                onClick={() => setCurrentPage(currentPage + 1)}
            />
            <PaginationPagesButton>{currentPage}</PaginationPagesButton>
            {currentPage > 1 && (
                <PaginationPreviousButton
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
            )}
            {openPup && (
                <LampPupContainer>
                    <LampPupContent>
                        <LampPupClose onClick={() => setOpenPup(false)} />
                        <LampPupTitle>{selectedLamp.name}</LampPupTitle>
                        <LampPupIconAdress />
                        <LampPupAdress>{selectedLamp.address}</LampPupAdress>
                        <LampPupGeoloc>
                            {selectedLamp.latitude}, {selectedLamp.longitude}
                        </LampPupGeoloc>
                        <LampPupIconBulb />
                        <LampPupBulb>{selectedLamp.lampType}</LampPupBulb>
                        <PupBulbButton onClick={() => setOpenPupBulb(true)} isBulb={isBulb} />
                        <LampPupIconLamp />
                        <LampPupHeight>{selectedLamp.height} m</LampPupHeight>
                        <TrashBulbButton onClick={chandleSuppLamp}/>
                    </LampPupContent>
                </LampPupContainer>
            )}
            {openPupBulb && (
                <LampPupContainer>
                    <LampPupContent>
                        <LampPupClose onClick={() => setOpenPupBulb(false)} />
                        <LampPupTitle>{"Ampoule"}</LampPupTitle>
                        <PUpBulbInputName
                            placeholder={selectedLamp.uuidbulb ? selectedLamp.uuidbulb : "reference"}
                            isFailed={isFailed}
                            value={inputReference}
                            onChange={handleReferenceChange}
                        />
                        <PUpBulbInputConso placeholder="consomation" value={conso}/>
                        <PUpBulbInputIntens placeholder="Intensity" value={intensity}/>
                    <PUpBulbValidateButton onClick={getBulb}/>
                    </LampPupContent>
                </LampPupContainer>
            )}
            {openPupGlobalChange && (
                <LampPupContainer>
                    <LampPupContent>
                        <LampPupClose onClick={() => setOpenPupGlobalChange(false)} />
                        <GlobalChangeTitle>{"Des changements majeurs ont été effectué, veuillez relancer l'application"}</GlobalChangeTitle>
                    </LampPupContent>
                </LampPupContainer>
            )}
            {isChangeGlobal && (
                <ButtonGlobalChange onClick={setOpenPupGlobalChange} />
            )}
            <TotalLamp>
                {lampLength} {t('lamps')}
            </TotalLamp>
        </div>
    );
};

export default LampListTab;
