import { TitleContainer, TitleLogo, TitleText } from "./elements";
import logoWhite from '../../../assets/logo-128x128-white.png';

interface TitleProps {
}

const Title: React.FC<TitleProps> = ({}) => {
    return (
        <TitleContainer>
            <TitleLogo src={logoWhite} alt="Scandela Logo" />
            <TitleText>Scandela</TitleText>
        </TitleContainer>
    );
};

export default Title;