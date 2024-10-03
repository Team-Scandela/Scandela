import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    LampListFilterButton,
    SearchInput,
    LampListContainer,
    LampCardContainer,
    LampCardTitle,
    LampCardAdress,
    LampCardBulb,
    PUpFilterCloseButton,
    PUpFilterDropdown,
    PUpFilterOption,
    PupFilterSubtitle,
    PupFilterApplyButton,
    PupFilterContainer,
    PUpFilterContent,
    PUpFilterTitle,
    PaginationNextButton,
    PaginationPreviousButton,
    PaginationPagesButton,
    TotalLamp,
} from './elements';

import { useAtom } from 'jotai';
import { lampsAtom } from '../../../../atoms/lampsAtom';

import { Lamp } from '../../../../services/lampsService';
import LampCard from '../LampCard/';
import BulbCard from '../BulbCard/';

interface LampListCardProps {
    isDark: boolean;
}

interface LampResumeInfoProps {
    isDark: boolean;
    lampItem: Lamp;
    setOpenPupLamp: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLamp: React.Dispatch<React.SetStateAction<Lamp>>;
}

interface FilterPupProps {
    isDark: boolean;
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectFilter: React.Dispatch<React.SetStateAction<string>>;
    selectFilter: string;
    updateList: () => void;
}

const FilterPup: React.FC<FilterPupProps> = ({
    isDark,
    setOpenFilter,
    setSelectFilter,
    selectFilter,
    updateList,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <PupFilterContainer>
                <PUpFilterContent>
                    <PUpFilterTitle>{t('filterAdvcanced')}</PUpFilterTitle>
                    <PUpFilterCloseButton
                        onClick={() => setOpenFilter(false)}
                    />
                    <PUpFilterDropdown
                        placeholder="Type"
                        value={selectFilter}
                        onChange={(e: any) => setSelectFilter(e.target.value)}
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
                    <PupFilterSubtitle>{t('selectFilter')}</PupFilterSubtitle>
                    <PupFilterApplyButton
                        onClick={() => (setOpenFilter(false), updateList())}
                    >
                        {t('apply')}
                    </PupFilterApplyButton>
                </PUpFilterContent>
            </PupFilterContainer>
        </>
    );
};

const LampResumeInfo: React.FC<LampResumeInfoProps> = ({
    isDark,
    lampItem,
    setOpenPupLamp,
    setSelectedLamp,
}) => {
    return (
        <LampCardContainer
            onClick={() => (setOpenPupLamp(true), setSelectedLamp(lampItem))}
        >
            <LampCardTitle>
                {lampItem.name ? lampItem.name : 'unknow'}
            </LampCardTitle>
            <LampCardAdress>
                {lampItem.address ? lampItem.address : 'unknow'}
            </LampCardAdress>
            <LampCardBulb>
                {lampItem.lampType ? lampItem.lampType : 'unknow'}
            </LampCardBulb>
        </LampCardContainer>
    );
};

const NewLampListTab: React.FC<LampListCardProps> = ({ isDark }) => {
    // VARIABLE

    const { t } = useTranslation();

    const [lamp] = useAtom(lampsAtom);
    const [selectedLamp, setSelectedLamp] = useState<Lamp>(undefined);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLamps, setCurrentLamps] = useState<Lamp[]>([]);
    const [lampLength, setLampLength] = useState(0);
    const itemsPerPage = 100;

    const [openPupLamp, setOpenPupLamp] = useState(false);
    const [openPupBulb, setOpenPupBulb] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const [selectFilter, setSelectFilter] = useState('nothing');
    // FUNCTION
    const updateList = () => {
        let filterLamp = lamp;

        if (selectFilter === '0m') {
            filterLamp = lamp.filter((lamp: Lamp) => lamp.height === 0);
        }
        if (selectFilter === 'badBulb') {
            filterLamp = lamp.filter(
                (lamp: Lamp) =>
                    lamp.lampType !== 'LED' && lamp.lampType !== 'SHP'
            );
        }

        if (searchTerm) {
            filterLamp = filterLamp.filter(
                (lamp: Lamp) =>
                    (lamp.name &&
                        lamp.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (lamp.address &&
                        lamp.address
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
        }

        // const totalPages = Math.ceil(filterLamp.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentLamps(filterLamp.slice(indexOfFirstItem, indexOfLastItem));
        setLampLength(filterLamp.length);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        updateList();
    }, [currentPage, lamp, searchTerm]);

    // RENDER

    return (
        <div>
            <SearchInput
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
            ></SearchInput>
            <LampListFilterButton onClick={() => setOpenFilter(true)} />
            <LampListContainer>
                {currentLamps.map(
                    (lampItem: Lamp, index: number) =>
                        lampItem.name != undefined && (
                            <LampResumeInfo
                                key={index}
                                isDark={isDark}
                                lampItem={lampItem}
                                setOpenPupLamp={setOpenPupLamp}
                                setSelectedLamp={setSelectedLamp}
                            />
                        )
                )}
            </LampListContainer>
            {openPupLamp && (
                <>
                    <LampCard
                        isDark={isDark}
                        lampItem={selectedLamp}
                        setOpenPupLamp={setOpenPupLamp}
                        setOpenPupBulb={setOpenPupBulb}
                    />
                </>
            )}
            {openPupBulb && (
                <BulbCard
                    isDark={isDark}
                    lampItem={selectedLamp}
                    setOpenPupBulb={setOpenPupBulb}
                />
            )}
            {openFilter && (
                <>
                    <FilterPup
                        isDark={isDark}
                        setOpenFilter={setOpenFilter}
                        setSelectFilter={setSelectFilter}
                        selectFilter={selectFilter}
                        updateList={updateList}
                    />
                </>
            )}
            <PaginationNextButton
                onClick={() => setCurrentPage(currentPage + 1)}
            />
            <PaginationPagesButton>{currentPage}</PaginationPagesButton>
            {currentPage > 1 && (
                <PaginationPreviousButton
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
            )}
            <TotalLamp>
                {lampLength} {t('lamps')}
            </TotalLamp>
        </div>
    );
};

export default NewLampListTab;
