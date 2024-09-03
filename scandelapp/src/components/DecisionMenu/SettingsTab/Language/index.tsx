import React from 'react';
import { FranceFlag, EnglishFlag } from './elements';
import RadioButton from '../../../RadioButton';
import { useTranslation } from 'react-i18next';
import { showToast } from '../../../Toastr';
import { createNotification } from '../../../../utils/notificationUtils';

interface LanguageProps {
    isDark: boolean;
    currentLanguage: boolean;
    setCurrentLanguage: (value: boolean) => void;
    notificationsPreference: any;
    addNotificationToList: (description: string) => void;
}

const Language: React.FC<LanguageProps> = ({
    isDark,
    currentLanguage,
    setCurrentLanguage,
    notificationsPreference,
    addNotificationToList,
}) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleToggleLanguage = async () => {
        setCurrentLanguage(!currentLanguage);
        if (currentLanguage) changeLanguage('fr');
        else changeLanguage('en');
        if (
            notificationsPreference.find(
                (item: any) => item[0] === 'languageUpdate'
            )[1]
        ) {
            showToast(
                'success',
                t('theLanguageHasBeenSuccessfullyUpdated'),
                'top-left',
                5000,
                false,
                true,
                false,
                true
            );

            const userId = localStorage.getItem('userId');
            if (userId) {
                await createNotification({
                    user: { id: userId },
                    title: t('languageUpdate'),
                    description: t('theLanguageHasBeenSuccessfullyUpdated'),
                    triggered: true,
                });
            }
            // addNotificationToList(t('languageUpdate'));
        }
    };

    return (
        <div>
            <FranceFlag />
            <EnglishFlag />
            <RadioButton
                isDark={isDark}
                top={'200px'}
                left={'180px'}
                trigger={currentLanguage}
                setTrigger={handleToggleLanguage}
            />
        </div>
    );
};

export default Language;
