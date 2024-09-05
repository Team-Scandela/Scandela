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
    PUpFilterClose,
    PUpFilterTitle,
} from './elements';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LampListTabProps {
    isDark: boolean;
}

let data = [
    {
        title : "Lamp 1",
        adress : "Rue de la paix",
        bulb : "LED",
    },
    {
        title : "Lamp 2",
        adress : "Rue de la dljfgdf",
        bulb : "LED",
    },
    {
        title : "Lamp 3",
        adress : "Rue de la retfghbn",
        bulb : "LPHP",
    },
    {
        title : "Lamp 4",
        adress : "Rue de la rsdjhskdjhsd",
        bulb : "OUI",
    },
    {
        title : "Lamp 4",
        adress : "Rue de la rsdjhskdjhsd",
        bulb : "OUI",
    },
    {
        title : "Lamp 4",
        adress : "Rue de la rsdjhskdjhsd",
        bulb : "OUI",
    },
    {
        title : "Lamp 4",
        adress : "Rue de la rsdjhskdjhsd",
        bulb : "OUI",
    }
]

const LampListTab: React.FC<LampListTabProps> = ({ isDark }) => {

    const [openFilter, setOpenFilter] = useState(false);
    const { t } = useTranslation();

    return (
        <div>
            <LampListCardInput placeholder="Search" />
            <LampListOrderButton />
            <LampListFilterButton onClick={() => setOpenFilter(true)} />
            <LampListContainer >
                {data.map((lamp, index) => (
                    <LampListCard key={index} isDark={isDark}>
                        <LampListCardTitle>{lamp.title}</LampListCardTitle>
                        <LampListCardAdress>{lamp.adress}</LampListCardAdress>
                        <LampListCardBulb>{lamp.bulb}</LampListCardBulb>
                    </LampListCard>
                ))}
            </LampListContainer>
            {openFilter &&
            <PupFilterContainer>
                <PUpFilterContent>
                    <PUpFilterClose onClick={() => setOpenFilter(false)} />
                    <PUpFilterTitle>{t('filterAdvcanced')}</PUpFilterTitle>
                </PUpFilterContent>
            </PupFilterContainer>}
        </div>
    );
}

export default LampListTab;