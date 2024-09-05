import {
    LampListContainer,
    LampListCard,
    LampListCardTitle,
    LampListCardAdress,
    LampListCardBulb,
    LampListCardInput,
    LampListOrderButton,
    LampListFilterButton,
} from './elements';

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

    return (
        <div>
            <LampListCardInput placeholder="Search" />
            <LampListOrderButton />
            <LampListFilterButton />
            <LampListContainer >
                {data.map((lamp, index) => (
                    <LampListCard key={index} isDark={isDark}>
                        <LampListCardTitle>{lamp.title}</LampListCardTitle>
                        <LampListCardAdress>{lamp.adress}</LampListCardAdress>
                        <LampListCardBulb>{lamp.bulb}</LampListCardBulb>
                    </LampListCard>
                ))}
            </LampListContainer>
        </div>
    );
}

export default LampListTab;