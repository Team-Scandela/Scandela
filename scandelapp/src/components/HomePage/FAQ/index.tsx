import { useState } from 'react';
import {
    FAQContainer,
    FAQRectangle,
    CloseButton,
    FAQTitle,
    FAQLeftContainer,
    FAQRightContainer,
    QuestionTemplateContainer,
    TitleText,
    DescriptionTitleText,
    DescriptionText,
} from './elements';
import { useTranslation } from 'react-i18next';

interface FAQProps {
    closeToMainApp: () => void;
}

const FAQ: React.FC<FAQProps> = ({ closeToMainApp }) => {
    const { t } = useTranslation();

    const [faqData, setFaqData] = useState([
        {
            id: 1,
            title: t('faqTitle'),
            description: t('faqDescription'),
        },
        {
            id: 2,
            title: t('faqTitle2'),
            description: t('faqDescription1'),
        },
        {
            id: 3,
            title: t('faqTitle3'),
            description: t('faqDescription2'),
        },
        {
            id: 4,
            title: t('faqTitle4'),
            description: t('faqDescription3'),
        },
        {
            id: 5,
            title: t('faqTitle5'),
            description: t('faqDescription4'),
        },
        {
            id: 6,
            title: t('faqTitle6'),
            description: t('faqDescription5'),
        },
        {
            id: 7,
            title: t('faqTitle7'),
            description: t('faqDescription6'),
        },
        {
            id: 8,
            title: t('faqTitle8'),
            description: t('faqDescription7'),
        },
        {
            id: 9,
            title: t('faqTitle9'),
            description: t('faqDescription8'),
        },
        {
            id: 10,
            title: t('faqTitle10'),
            description: t('faqDescription9'),
        },
        {
            id: 11,
            title: t('faqTitle11'),
            description: t('faqDescription10'),
        },
        {
            id: 12,
            title: t('faqTitle12'),
            description: t('faqDescription11'),
        },
        {
            id: 13,
            title: t('faqTitle13'),
            description: t('faqDescription12'),
        },
        {
            id: 14,
            title: t('faqTitle14'),
            description: t('faqDescription13'),
        },
        {
            id: 15,
            title: t('faqTitle15'),
            description: t('faqDescription14'),
        },
        {
            id: 16,
            title: t('faqTitle16'),
            description: t('faqDescription15'),
        },
    ]);
    const [currentSelected, setCurrentSelected] = useState(1);

    const handleTitleClick = (id: number) => {
        setCurrentSelected(id);
    };

    return (
        <FAQContainer>
            <FAQRectangle>
                <CloseButton onClick={closeToMainApp} />
                <FAQTitle>Foire aux questions</FAQTitle>
                <FAQLeftContainer>
                    {faqData.map((item: any, i: number) => (
                        <QuestionTemplateContainer
                            key={i}
                            y={70 * i}
                            onClick={() => handleTitleClick(item.id)}
                        >
                            <TitleText>{item.title}</TitleText>
                        </QuestionTemplateContainer>
                    ))}
                </FAQLeftContainer>
                <FAQRightContainer>
                    <DescriptionTitleText>
                        {
                            faqData.find((item) => item.id === currentSelected)
                                .title
                        }
                    </DescriptionTitleText>
                    <DescriptionText>
                        {
                            faqData.find((item) => item.id === currentSelected)
                                .description
                        }
                    </DescriptionText>
                </FAQRightContainer>
            </FAQRectangle>
        </FAQContainer>
    );
};

export default FAQ;
