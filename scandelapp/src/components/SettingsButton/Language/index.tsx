import { FranceFlag, EnglishFlag } from './elements';
import RadioButton from '../../RadioButton';
import { useTranslation } from 'react-i18next';

/** Language setting component props
 * @param {boolean} isDark - If the mode is dark or not
 * @param {boolean} currentLanguage - If the language is fr or en
 * @param {function} setCurrentLanguage - setter
 */

interface LanguageProps {
    isDark: boolean;
    currentLanguage: boolean;
    setCurrentLanguage: (value: any) => void;
}

const Language: React.FC<LanguageProps> = ({
    isDark,
    currentLanguage,
    setCurrentLanguage,
}) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleToggleLanguage = () => {
        setCurrentLanguage(!currentLanguage);
        if (currentLanguage) changeLanguage('en');
        else changeLanguage('fr');
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
