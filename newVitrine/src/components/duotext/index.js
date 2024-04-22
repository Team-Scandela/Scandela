import { DuoTextContainer, DuoTextText, DuoTextTitle } from "./elements";

const Duotext = ({ title, text }) => {
    return (
        <DuoTextContainer>
            <DuoTextTitle>{title}</DuoTextTitle>
            <DuoTextText>{text}</DuoTextText>
        </DuoTextContainer>
    );
}

export default Duotext;