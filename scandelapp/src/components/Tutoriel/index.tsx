import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TutorielBackground,
    SkipTutoButtonContainer,
    CustomContainerInfoPopup,
    Arrow,
    TitleText,
    DefaultText,
} from './elements';
import { Tabs } from '../../pages/main';

interface TutorielProps {
    id: string;
    isDark: boolean;
    setShowTutoriel: (value: boolean) => void;
    setDecisionPanelExtended: (value: boolean) => void;
    setCurrentTab: (value: Tabs) => void;
    setFilterPanelExtended: (value: boolean) => void;
}

const Tutoriel: React.FC<TutorielProps> = ({
    id,
    isDark,
    setShowTutoriel,
    setDecisionPanelExtended,
    setCurrentTab,
    setFilterPanelExtended,
}) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setDecisionPanelExtended(false);
    }, []);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
        if (currentStep === 5) setFilterPanelExtended(true);
        else if (currentStep === 12) setFilterPanelExtended(false);
        else if (currentStep === 14) {
            setDecisionPanelExtended(true);
            setCurrentTab(Tabs.Scandela);
        } else if (currentStep === 15) {
            setCurrentTab(Tabs.ActionsList);
        }
        // else if (currentStep === 16) {
        //     setCurrentTab(Tabs.ModifEntity);
        // }
        // else if (currentStep === 17) {
        //     setCurrentTab(Tabs.AddEntity);
        // }
        else if (currentStep === 16) {
            setCurrentTab(Tabs.LampList);
        } else if (currentStep === 17) {
            setCurrentTab(Tabs.ElectricityPrice);
        } else if (currentStep === 18) {
            setCurrentTab(Tabs.Options);
        } else if (currentStep === 19) setDecisionPanelExtended(false);
        else if (currentStep === 20) setShowTutoriel(false);
    };

    const handleSkipTutoriel = () => {
        setShowTutoriel(false);
    };

    return (
        <div>
            <TutorielBackground onClick={() => handleNextStep()}>
                <SkipTutoButtonContainer
                    isDark={isDark}
                    onClick={() => handleSkipTutoriel()}
                >
                    <TitleText>{t('skipTuto')}</TitleText>
                </SkipTutoButtonContainer>
                {currentStep === 0 && ( // Intro
                    <div>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'23%'}
                            left={'36.5%'}
                            height={'240px'}
                            width={'450px'}
                        >
                            <TitleText>{t('tuto00')}</TitleText>
                            <DefaultText>{t('tuto01')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 1 && ( // Absence panel
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'11.5%'}
                            left={'33.2%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'13%'}
                            left={'31.5%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto10')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 2 && ( // Search bar
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'11.5%'}
                            left={'9%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'13%'}
                            left={'6%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto20')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 3 && ( // Search bar option
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'11.5%'}
                            left={'26.5%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'13%'}
                            left={'23.5%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto30')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 4 && ( // Notifications history
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'11.8%'}
                            left={'7.1%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'10%'}
                            left={'8%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto40')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 5 && ( // Actions history
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'18.8%'}
                            left={'7.1%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'17%'}
                            left={'8%'}
                            height={'150px'}
                            width={'340px'}
                        >
                            <DefaultText>{t('tuto50')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 6 && ( // Filters
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'83%'}
                            left={'2.3%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'66%'}
                            left={'1%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto60')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 7 && ( // Filters 1
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'83%'}
                            left={'7.4%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'66%'}
                            left={'5.1%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto70')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 8 && ( // Filters 2
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'83%'}
                            left={'10.2%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'66%'}
                            left={'7.9%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto80')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 9 && ( // Filters 3
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'83%'}
                            left={'13.3%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'65%'}
                            left={'11%'}
                            height={'150px'}
                            width={'340px'}
                        >
                            <DefaultText>{t('tuto90')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 10 && ( // Filters 4
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'83%'}
                            left={'16.2%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'66%'}
                            left={'13.9%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto100')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 11 && ( // Filters 5
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'83%'}
                            left={'19.1%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'65%'}
                            left={'16.8%'}
                            height={'150px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto110')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 12 && ( // Filters 6
                    <div>
                        <Arrow isDark={isDark} top={'83%'} left={'22%'}></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'66%'}
                            left={'19.7%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto120')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 13 && ( // Indicators
                    <div>
                        <Arrow isDark={isDark} top={'74%'} left={'90%'}></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'56%'}
                            left={'74%'}
                            height={'150px'}
                            width={'380px'}
                        >
                            <DefaultText>{t('tuto130')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 14 && ( // Decision panel button
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'47.5%'}
                            left={'90.5%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'41%'}
                            left={'70%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto140')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 15 && ( // Decision panel 1
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'31.5%'}
                            left={'57.5%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'25%'}
                            left={'37%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto150')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 16 && ( // Decision panel 2
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'31.5%'}
                            left={'57.5%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'25%'}
                            left={'36.5%'}
                            height={'150px'}
                            width={'340px'}
                        >
                            <DefaultText>{t('tuto160')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {/* {currentStep === 17 && ( // Decision panel 3
                    <div>
                        <Arrow isDark={isDark} top={"31.5%"} left={"57.5%"}></Arrow>
                        <CustomContainerInfoPopup isDark={isDark} top={"25%"} left={"37%"} height={"140px"} width={"330px"}>
                            <DefaultText>{t('tuto170')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )} */}
                {currentStep === 17 && ( // Decision panel 4
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'31.5%'}
                            left={'57.5%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'25%'}
                            left={'37%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto180')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 18 && ( // Decision panel 5
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'31.5%'}
                            left={'57.5%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'25%'}
                            left={'37%'}
                            height={'140px'}
                            width={'330px'}
                        >
                            <DefaultText>{t('tuto190')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 19 && ( // Decision panel 6
                    <div>
                        <Arrow
                            isDark={isDark}
                            top={'30%'}
                            left={'57.5%'}
                        ></Arrow>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'23.5%'}
                            left={'35.3%'}
                            height={'170px'}
                            width={'360px'}
                        >
                            <DefaultText>{t('tuto200')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
                {currentStep === 20 && ( // Outro
                    <div>
                        <CustomContainerInfoPopup
                            isDark={isDark}
                            top={'27%'}
                            left={'36.5%'}
                            height={'180px'}
                            width={'450px'}
                        >
                            <DefaultText>{t('tuto210')}</DefaultText>
                        </CustomContainerInfoPopup>
                    </div>
                )}
            </TutorielBackground>
        </div>
    );
};

export default Tutoriel;
