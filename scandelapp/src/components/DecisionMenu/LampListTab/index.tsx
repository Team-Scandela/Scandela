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
} from './elements';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { allLamps } from '../../../utils/lampUtils';

interface LampListTabProps {
    isDark: boolean;
}

interface Lamp {
    adresse: string;
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

    const tempData = allLamps[0];
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 100;

    const totalPages = Math.ceil(tempData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLamps = tempData.slice(indexOfFirstItem, indexOfLastItem);
    console.log('indexOfLastItem', indexOfLastItem);
    console.log('indexOfFirstItem', indexOfFirstItem);
    console.log('current Data=', currentLamps);
    console.log("CURRENT DATA=", currentLamps);
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
                        <PUpFilterDropdown placeholder="Type" >
                            <PUpFilterOption value="all">{t('all')}</PUpFilterOption>
                            <PUpFilterOption value="led">{t('led')}</PUpFilterOption>
                            <PUpFilterOption value="sodium">{t('sodium')}</PUpFilterOption>
                        </PUpFilterDropdown>
                        <PupFilterSubtitle>{t('selectFilter')}</PupFilterSubtitle>
                        <PupFilterApplyButton onClick={() => setOpenFilter(false)}>
                            {t('apply')}
                        </PupFilterApplyButton>
                    </PUpFilterContent>
                </PupFilterContainer>
            )}
            <LampListContainer>
                {currentLamps.map((lamp: any, index: number) => (
                    <LampListCard key={index} isDark={isDark}>
                        <LampListCardTitle>{lamp.name}</LampListCardTitle>
                        <LampListCardAdress>{lamp.address}</LampListCardAdress>
                        <LampListCardBulb>{lamp.lampType}</LampListCardBulb>
                    </LampListCard>
                ))}
            </LampListContainer>
            {
                <PaginationNextButton
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            }
            <PaginationPagesButton>{currentPage}</PaginationPagesButton>
            {currentPage > 1 && (
                <PaginationPreviousButton
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
            )}
        </div>
    );
};

export default LampListTab;
