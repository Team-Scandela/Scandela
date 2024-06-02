import { FranceFlag, EnglishFlag } from './elements';
import RadioButton from '../../../RadioButton';
import { useTranslation } from 'react-i18next';
import { showToast } from '../../../Toastr';
import { createNotification } from '../../../../utils/notificationUtils';

/** Language setting component props
 * @param {boolean} isDark - If the mode is dark or not
 * @param {boolean} currentLanguage - If the language is fr or en
 * @param {function} setCurrentLanguage - setter
 * @param {any} notificationsPreference - Notification preference data
 * @param {function} addNotificationToList - Function to add a toastr notification to the toast history
 */

interface LanguageProps {
    isDark: boolean;
    currentLanguage: boolean;
    setCurrentLanguage: (value: any) => void;
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
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleToggleLanguage = async () => {
        setCurrentLanguage(!currentLanguage);
        if (currentLanguage) changeLanguage('en');
        else changeLanguage('fr');
        if (
            !notificationsPreference.find(
                (item: any) => item[0] === 'languageUpdate'
            )[1]
        )
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
        console.log(userId);
        if (userId) {
            await createNotification({
                user: { id: userId },
                title: t('languageUpdate'),
                description: t('theLanguageHasBeenSuccessfullyUpdated'),
                triggered: true,
            });
        }
        //addNotificationToList(t('languageUpdate'));
    };

    return (
        <div>
            <FranceFlag />
            <EnglishFlag />
            <RadioButton
                isDark={isDark}
                top={'200px'}
                left={'200px'}
                trigger={currentLanguage}
                setTrigger={handleToggleLanguage}
            />
        </div>
    );
};

export default Language;
