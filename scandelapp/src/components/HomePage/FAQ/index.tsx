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
            description: '',
        },
        {
            id: 3,
            title: t('faqTitle3'),
            description: '',
        },
        {
            id: 4,
            title: t('faqTitle4'),
            description: '',
        },
        {
            id: 5,
            title: t('faqTitle5'),
            description: '',
        },
        {
            id: 6,
            title: t('faqTitle6'),
            description: '',
        },
        {
            id: 7,
            title: t('faqTitle7'),
            description: '',
        },
        {
            id: 8,
            title: t('faqTitle8'),
            description: '',
        },
        {
            id: 9,
            title: t('faqTitle9'),
            description: '',
        },
        {
            id: 10,
            title: t('faqTitle10'),
            description: '',
        },
        {
            id: 11,
            title: t('faqTitle11'),
            description: '',
        },
        {
            id: 12,
            title: t('faqTitle12'),
            description: '',
        },
        {
            id: 13,
            title: t('faqTitle13'),
            description: '',
        },
        {
            id: 14,
            title: t('faqTitle14'),
            description: '',
        },
        {
            id: 15,
            title: t('faqTitle15'),
            description: '',
        },
        {
            id: 16,
            title: t('faqTitle16'),
            description: '',
        },
        {
            id: 17,
            title: t('faqTitle17'),
            description: '',
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
