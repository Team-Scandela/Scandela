import { SunButton, MoonButton } from './elements';
import RadioButton from '../../../RadioButton';
import { showToast } from '../../../Toastr';
import { getUser } from '../../../../utils/userUtils';
import { putUser } from '../../../../utils/userUtils';
import { useTranslation } from 'react-i18next';

/** Ligth / Dark mode button
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
 * @param {any} notificationsPreference - Notification preference data
 * @param {function} addNotificationToList - Function to add a toastr notification to the toast history
 */

interface LightDarkProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
    notificationsPreference: any;
    addNotificationToList: (description: string) => void;
}

const updateUser = async () => {
    const user = await getUser();
    const updatedUserData = {
        town: user.town,
        email: user.email,
        username: user.username,
        password: user.password,
        rights: user.rights,
        moreInformations: user.moreInformations,
        darkmode: !user.darkmode,
        lastConnexion: user.lastConnexion,
        newsletter: user.newsletter,
        premium: user.premium,
    };
    putUser(updatedUserData);
};

const LightDark: React.FC<LightDarkProps> = ({
    isDark,
    setIsDark,
    notificationsPreference,
    addNotificationToList,
}) => {
    /** Handle the click on the button and switch to the other mode */
    const { t } = useTranslation();

    const handleToggleLightDark = () => {
        setIsDark(!isDark);
        localStorage.setItem('isDark', JSON.stringify(!isDark));
        try {
            updateUser();
        } catch (error) {}
        if (
            notificationsPreference.find(
                (item: any) => item[0] === 'lightDarkModeUpdate'
            )[1]
        ) {
            showToast(
                'success',
                t('theThemeHasBeenSuccessfullyUpdated'),
                'top-left',
                5000,
                false,
                true,
                false,
                true
            );
        }
        addNotificationToList(t('themeUpdate'));
    };

    return (
        <div>
            <SunButton size={40} />
            <RadioButton
                isDark={isDark}
                top={'200px'}
                left={'200px'}
                trigger={isDark}
                setTrigger={handleToggleLightDark}
            />
            <MoonButton size={40} />
        </div>
    );
};

export default LightDark;
