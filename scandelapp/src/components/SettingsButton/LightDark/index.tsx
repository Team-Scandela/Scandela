import { SunButton, MoonButton } from './elements';
import RadioButton from '../../RadioButton';
import { IoShieldCheckmark } from 'react-icons/io5';

/** Ligth / Dark mode button
 * @param {boolean} isDark - If the mode is dark or not
 * @param {function} setIsDark - Function to set the mode
 */

interface LightDarkProps {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

const updateUser = async (isDark: boolean) => {
    const username = 'tester';
    const password = 'T&st';

    try {
        const responseUser = await fetch(
            'http://app.scandela.fr:2001/users/183e5775-6d38-4d0b-95b4-6f4c7bbb0597',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
            }
        );

        const user = await responseUser.json();
        try {
            const updatedUserData = {
                town: user.town,
                email: user.email,
                username: user.username,
                password: user.password,
                rights: user.rights,
                moreInformations: user.moreInformations,
                darkmode: true,
                lastConnexion: '2022-01-23T13:45:00',
            };
            const response = await fetch(
                'http://localhost:8080/users/183e5775-6d38-4d0b-95b4-6f4c7bbb0597',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(
                            `${username}:${password}`
                        )}`,
                    },
                    body: JSON.stringify(updatedUserData),
                }
            );
            const userUpdate = await response.json();
        } catch (error) {
            console.log('ERROR UPDATE USER = ' + error);
        }
    } catch (error) {
        console.log('ERROR GET USER = ' + error);
    }
};

const LightDark: React.FC<LightDarkProps> = ({ isDark, setIsDark }) => {
    /** Handle the click on the button and switch to the other mode */
    const handleToggleLightDark = () => {
        setIsDark(!isDark);
        updateUser(isDark);
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
