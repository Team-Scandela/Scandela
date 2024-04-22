import {TitleContainer, TitleText} from './elements';

const Title = ({ title }) => {
    return (
        <TitleContainer>
            <TitleText>{title}</TitleText>
        </TitleContainer>
    );
}

export default Title;