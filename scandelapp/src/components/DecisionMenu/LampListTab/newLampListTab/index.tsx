import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    SearchInput,
    LampListContainer,
    LampCardContainer,
    LampCardTitle,
    LampCardAdress,
    LampCardBulb,
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
    isDark: boolean,
    lampItem: Lamp,
    setOpenPupLamp: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLamp: React.Dispatch<React.SetStateAction<Lamp>>;
};

const LampResumeInfo: React.FC<LampResumeInfoProps> = ({isDark, lampItem, setOpenPupLamp, setSelectedLamp}) => {
    return (
        <LampCardContainer onClick={() => (
            setOpenPupLamp(true),
            setSelectedLamp(lampItem)
        )}>
            <LampCardTitle>{lampItem.name ? lampItem.name : 'unknow'}</LampCardTitle>
            <LampCardAdress>{lampItem.address ? lampItem.address : 'unknow'}</LampCardAdress>
            <LampCardBulb>{lampItem.lampType ? lampItem.lampType : 'unknow'}</LampCardBulb>
        </LampCardContainer>
    );
};

const NewLampListTab: React.FC<LampListCardProps> = ({isDark}) => {
    
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

    // FUNCTION
    const updateList = () => {
        let filterLamp = lamp;
        if (searchTerm) {
            filterLamp = filterLamp.filter(
                (lamp: Lamp) =>
                    (lamp.name && lamp.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (lamp.address && lamp.address.toLowerCase().includes(searchTerm.toLowerCase()))
             );
        }

        // const totalPages = Math.ceil(filterLamp.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        console.log("indexOfLastItem = ", indexOfLastItem);
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        console.log("indexOfFirstItem = ", indexOfFirstItem);
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
            <SearchInput placeholder="Search" value={searchTerm} onChange={handleSearchChange}></SearchInput>
            <LampListContainer>
                {currentLamps.map((lampItem: Lamp, index: number) =>
                    lampItem.name != undefined && (
                        <LampResumeInfo isDark={isDark} lampItem={lampItem} setOpenPupLamp={setOpenPupLamp} setSelectedLamp={setSelectedLamp}/>
                    ))}
            </LampListContainer>
            {openPupLamp && (
                <>
                    <LampCard isDark={isDark} lampItem={selectedLamp} setOpenPupLamp={setOpenPupLamp} setOpenPupBulb={setOpenPupBulb}/>
                </>
            )}
            {openPupBulb && (
                <BulbCard isDark={isDark} lampItem={selectedLamp} setOpenPupBulb={setOpenPupBulb} />
            )}
        </div>
    );
};

export default NewLampListTab;