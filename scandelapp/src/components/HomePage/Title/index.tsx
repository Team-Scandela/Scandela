import { TitleContainer, TitleLogo, TitleText } from "./elements";
import logoWhite from '../../../assets/logo-128x128-white.png';

interface TitleProps {
    title ?: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <TitleContainer>
            <TitleLogo src={logoWhite} alt="Scandela Logo" />
            <TitleText>{title}</TitleText>
        </TitleContainer>
    );
};

export default Title;