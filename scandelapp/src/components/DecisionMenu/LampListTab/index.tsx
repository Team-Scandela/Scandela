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
} from './elements';
import { allLamps } from '../../../utils/lampUtils';

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
    const tempData = allLamps[0];

    const updateList = () => {
        let filterData = tempData;
        console.log(tempData[0]);
        if (selectFilter === '0m') {
            filterData = tempData.filter((lamp: Lamp) => lamp.height === 0);
            console.log(filterData[0]);
        }
        if (selectFilter === 'badBulb') {
            filterData = tempData.filter(
                (lamp: Lamp) =>
                    lamp.lampType !== 'LED' && lamp.lampType !== 'SHP'
            );
            console.log(filterData[0]);
        }
        const totalPages = Math.ceil(filterData.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentLamps(filterData.slice(indexOfFirstItem, indexOfLastItem));
        setLampLength(filterData.length);
    };

    useEffect(() => {
        updateList();
    }, [currentPage]);

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
                                    setOpenPup(true), setSelectedLamp(lamp)
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
                        <LampPupIconLamp />
                        <LampPupHeight>{selectedLamp.height} m</LampPupHeight>
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