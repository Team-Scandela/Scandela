import React from 'react';
import { SunButton, MoonButton } from './elements';
import RadioButton from '../../../RadioButton';
import { showToast } from '../../../Toastr';
import { getUser, putUser } from '../../../../utils/userUtils';
import { useTranslation } from 'react-i18next';
import { createNotification } from '../../../../utils/notificationUtils';

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
    const { t } = useTranslation();

    const handleToggleLightDark = async () => {
        setIsDark(!isDark);
        localStorage.setItem('isDark', JSON.stringify(!isDark));
        try {
            await updateUser();
        } catch (error) {
            console.error('Error updating user:', error);
        }

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

            const userId = localStorage.getItem('userId');
            if (userId) {
                await createNotification({
                    user: { id: userId },
                    title: t('themeUpdate'),
                    description: t('theThemeHasBeenSuccessfullyUpdated'),
                    triggered: true,
                });
            }
            // addNotificationToList(t('themeUpdate'));
        }
    };

    return (
        <div>
            <SunButton size={40} />
            <RadioButton
                isDark={isDark}
                top={'200px'}
                left={'180px'}
                trigger={isDark}
                setTrigger={handleToggleLightDark}
            />
            <MoonButton size={40} />
        </div>
    );
};

export default LightDark;
