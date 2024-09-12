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
} from './elements';
import { allLamps } from '../../../utils/lampUtils';
import { getConsuptionScore } from '../../../utils/gaugesUtils';
import {handleSearchUtils} from '../../../utils/searchUtils';

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
    const [conso, setConso] = useState(0);
    const [intensity, setIntensity] = useState(0);
    const [isFailed, setIsFailed] = useState(false);
    const [isBulb, setIsBulb] = useState(false);

    const updateList = () => {
        let filterData = tempData;
        console.log("TEMPSDATA = ", tempData);
        if (selectFilter === '0m') {
            filterData = tempData.filter((lamp: Lamp) => lamp.height === 0);
        }
        if (selectFilter === 'badBulb') {
            filterData = tempData.filter(
                (lamp: Lamp) =>
                    lamp.lampType !== 'LED' && lamp.lampType !== 'SHP'
            );
            //console.log(filterData[0]);
        }
        const totalPages = Math.ceil(filterData.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentLamps(filterData.slice(indexOfFirstItem, indexOfLastItem));
        setLampLength(filterData.length);
    };

    useEffect(() => {
        updateList();
    }, [currentPage, tempData]);

    const handleReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputReference(e.target.value);
        setIsFailed(false);
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
                setIsBulb(true);
            } else {
                console.log("PAS COOL");
                setIsFailed(true);
                setIsBulb(false);
                setConso(0);
                setIntensity(0)
            }
        } catch (error) {
            console.log('ERROR GET BULB = ' + error);
            setIsFailed(true);
            setIsBulb(false);
        }
    };

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
                setIsBulb(true);
            } else {
                setConso(0);
                setIntensity(0)
                setIsBulb(false);
            }
        } catch (error) {
            console.log('ERROR GET BULB = ' + error);
            setIsBulb(false);
        }
    };
    
    return (
        <div>
            <LampListCardInput placeholder="Search" />
            <LampListOrderButton />
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
            <TotalLamp>
                {lampLength} {t('lamps')}
            </TotalLamp>
        </div>
    );
};

export default LampListTab;
