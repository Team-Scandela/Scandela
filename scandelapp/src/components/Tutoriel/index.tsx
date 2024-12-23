import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TutorielBackground,
    SkipTutoButtonContainer,
    PopupContainer,
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
        if (currentStep === 4) setFilterPanelExtended(true);
        else if (currentStep === 12) setFilterPanelExtended(false);
        else if (currentStep === 14) {
            setDecisionPanelExtended(true);
            setCurrentTab(Tabs.Scandela);
        } else if (currentStep === 15) {
            setCurrentTab(Tabs.ActionsList);
        }
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
                        <PopupContainer top={'30%'} left={'35%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'240px'}
                                width={'400px'}
                            >
                                <TitleText>{t('tuto00')}</TitleText>
                                <DefaultText>{t('tuto01')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 1 && ( // Absence panel
                    <div>
                        <PopupContainer top={'70px'} left={'275px'}>
                            <Arrow
                                isDark={isDark}
                                top={'17px'}
                                left={'50%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'200px'}
                                width={'380px'}
                            >
                                <DefaultText>{t('tuto10')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 2 && ( // Search bar
                    <div>
                        <PopupContainer top={'70px'} left={'50px'}>
                            <Arrow
                                isDark={isDark}
                                top={'17px'}
                                left={'35%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'330px'}
                            >
                                <DefaultText>{t('tuto20')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 3 && ( // Notifications history
                    <div>
                        <PopupContainer top={'35px'} left={'0px'}>
                            <Arrow
                                isDark={isDark}
                                top={'50px'}
                                left={'25%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'330px'}
                            >
                                <DefaultText>{t('tuto40')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 4 && ( // Actions history
                    <div>
                        <PopupContainer top={'80px'} left={'0%'}>
                            <Arrow
                                isDark={isDark}
                                top={'53px'}
                                left={'23%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto50')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 5 && ( // Filters
                    <div>
                        <PopupContainer bottom={'0%'} left={'-110px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto60')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 6 && ( // Filters 1
                    <div>
                        <PopupContainer bottom={'0%'} left={'-55px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto70')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 7 && ( // Filters 2
                    <div>
                        <PopupContainer bottom={'0%'} left={'-10px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto80')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 8 && ( // Filters 3
                    <div>
                        <PopupContainer bottom={'0%'} left={'35px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto90')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 9 && ( // Filters 4
                    <div>
                        <PopupContainer bottom={'0%'} left={'80px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto100')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 10 && ( // Filters 5
                    <div>
                        <PopupContainer bottom={'0%'} left={'125px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto110')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 11 && ( // Filters 6
                    <div>
                        <PopupContainer bottom={'0%'} left={'170px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto120')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 12 && ( // Filters 7
                    <div>
                        <PopupContainer bottom={'0%'} left={'215px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'32%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto121')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 13 && ( // Indicators
                    <div>
                        <PopupContainer bottom={'8%'} right={'0px'}>
                            <Arrow
                                isDark={isDark}
                                top={'152px'}
                                left={'70%'}
                            ></Arrow>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto130')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 14 && ( // Decision panel button
                    <div>
                        <PopupContainer bottom={'30%'} right={'15%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto140')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 15 && ( // Decision panel 1
                    <div>
                        <PopupContainer bottom={'30%'} right={'45%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto150')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 16 && ( // Decision panel 2
                    <div>
                        <PopupContainer bottom={'30%'} right={'45%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto160')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 17 && ( // Decision panel 4
                    <div>
                        <PopupContainer bottom={'30%'} right={'45%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto180')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 18 && ( // Decision panel 5
                    <div>
                        <PopupContainer bottom={'30%'} right={'45%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto190')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 19 && ( // Decision panel 6
                    <div>
                        <PopupContainer bottom={'30%'} right={'45%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto200')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
                {currentStep === 20 && ( // Outro
                    <div>
                        <PopupContainer bottom={'30%'} right={'35%'}>
                            <CustomContainerInfoPopup
                                isDark={isDark}
                                height={'140px'}
                                width={'350px'}
                            >
                                <DefaultText>{t('tuto210')}</DefaultText>
                            </CustomContainerInfoPopup>
                        </PopupContainer>
                    </div>
                )}
            </TutorielBackground>
        </div>
    );
};

export default Tutoriel;
